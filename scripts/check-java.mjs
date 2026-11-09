// Kompiluje i uruchamia każdy blok ```java z plików MDX.
//
// Atrybut check w linii otwierającej blok mówi, jak go sprawdzić:
//   (brak)          pełny program z metodą main: kompilacja + uruchomienie
//   check="body"    instrukcje: wklejane do main
//   check="class"   metody/pola: wklejane do klasy Main (z pustym main)
//   check="types"   klasy pomocnicze: kompilowane razem z pustą klasą Main
//   check="error"   kod, który MA się nie skompilować (przykład błędu)
//   check="throws"  kod, który ma rzucić wyjątek przy uruchomieniu (wklejany do main)
//   check="none"    pomijany (np. fragment Androida)
// Dodatkowo: stdin="5\n3"  dane z klawiatury, expect="tekst"  fragment oczekiwanego wyjścia.
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { tmpdir } from 'node:os'

const ROOT = new URL('../src/content', import.meta.url).pathname
const only = process.argv[2]

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f)
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.mdx') ? [p] : []
  })
}

function meta(str) {
  const o = {}
  for (const m of str.matchAll(/(\w+)="([^"]*)"/g)) o[m[1]] = m[2]
  return o
}

const IMPORTS = 'import java.util.*;\n'
let ok = 0
let fail = 0
let skipped = 0

for (const file of walk(ROOT)) {
  if (only && !file.includes(only)) continue
  const src = readFileSync(file, 'utf8')
  const re = /^([ \t]*)```java([^\n]*)\n([\s\S]*?)^\1```/gm
  let m
  let n = 0
  while ((m = re.exec(src))) {
    n++
    const indent = m[1]
    const info = meta(m[2])
    const code = m[3]
      .split('\n')
      .map((l) => (l.startsWith(indent) ? l.slice(indent.length) : l))
      .join('\n')
    const line = src.slice(0, m.index).split('\n').length
    const label = `${file.replace(ROOT + '/', '')}:${line}`
    const mode = info.check || 'full'
    if (mode === 'none') {
      skipped++
      continue
    }

    let program
    let cls = 'Main'
    if (mode === 'full') {
      program = code.includes('import ') ? code : IMPORTS + code
      const pub = code.match(/public\s+class\s+(\w+)/)
      if (pub) cls = pub[1]
    } else if (mode === 'body' || mode === 'throws' || mode === 'error') {
      program = `${IMPORTS}public class Main {\n    public static void main(String[] args) throws Exception {\n${code}\n    }\n}\n`
      if (mode === 'error' && /\bclass\b|static\s+\w+\s+\w+\(/.test(code)) program = `${IMPORTS}${code}\npublic class Main { public static void main(String[] a) {} }\n`
    } else if (mode === 'class') {
      program = `${IMPORTS}public class Main {\n${code}\n    public static void main(String[] args) {}\n}\n`
    } else if (mode === 'types') {
      program = `${IMPORTS}${code}\npublic class Main { public static void main(String[] args) {} }\n`
    }

    const dir = join(tmpdir(), `inf04-java-${process.pid}-${ok + fail}`)
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, `${cls}.java`), program)
    const javac = spawnSync('javac', ['-encoding', 'UTF-8', '-Xlint:none', '-d', dir, join(dir, `${cls}.java`)], { encoding: 'utf8' })
    const compiled = javac.status === 0

    let problem = null
    if (mode === 'error') {
      if (compiled) problem = 'miał się NIE skompilować, a się skompilował'
    } else if (!compiled) {
      problem = 'błąd kompilacji:\n' + javac.stderr.split('\n').filter((l) => !l.startsWith('Picked up')).join('\n')
    } else {
      const stdin = (info.stdin || '').replace(/\\n/g, '\n')
      const run = spawnSync('java', ['-Dfile.encoding=UTF-8', '-Dstdout.encoding=UTF-8', '-cp', dir, cls], { input: stdin + '\n', encoding: 'utf8', timeout: 8000 })
      const err = (run.stderr || '').split('\n').filter((l) => l && !l.startsWith('Picked up')).join('\n')
      if (mode === 'throws') {
        if (!err.includes('Exception') && !err.includes('Error')) problem = 'miał rzucić wyjątek, a nie rzucił'
      } else if (run.status !== 0) {
        problem = 'błąd w czasie działania:\n' + err
      } else if (info.expect && !run.stdout.includes(info.expect.replace(/\\n/g, '\n'))) {
        problem = `brak oczekiwanego wyjścia "${info.expect}". Było:\n${run.stdout}`
      }
      if (process.env.SHOW) console.log(`--- ${label}\n${run.stdout}`)
    }
    rmSync(dir, { recursive: true, force: true })

    if (problem) {
      fail++
      console.log(`✗ ${label} [${mode}] ${problem}\n`)
    } else ok++
  }
}

console.log(`\nJava: ${ok} OK, ${fail} błędów, ${skipped} pominiętych`)
process.exit(fail ? 1 : 0)
