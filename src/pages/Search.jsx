import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { loadSearchIndex } from '../lib/content'
import { ALL_LESSONS } from '../data/roadmap'
import Icon from '../components/Icon'

const norm = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ł/g, 'l')

export default function Search() {
  const [params, setParams] = useSearchParams()
  const [q, setQ] = useState(params.get('q') || '')
  const [index, setIndex] = useState(null)

  useEffect(() => {
    loadSearchIndex().then((idx) => setIndex(idx.map((d) => ({ ...d, n: { title: norm(d.title || ''), kw: norm(d.keywords + ' ' + d.summary), text: norm(d.text) } }))))
  }, [])

  const results = useMemo(() => {
    const terms = norm(q).split(/\s+/).filter((t) => t.length > 1)
    if (!terms.length) return []
    const found = []
    // lekcje z treścią
    for (const d of index || []) {
      let score = 0
      for (const t of terms) {
        if (d.n.title.includes(t)) score += 10
        if (d.n.kw.includes(t)) score += 5
        const c = d.n.text.split(t).length - 1
        if (!c) {
          if (!d.n.title.includes(t) && !d.n.kw.includes(t)) {
            score = 0
            break
          }
        }
        score += Math.min(c, 10)
      }
      if (score > 0) {
        const pos = d.n.text.indexOf(terms[0])
        const snippet = pos >= 0 ? '…' + d.text.slice(Math.max(0, pos - 60), pos + 100).trim() + '…' : d.summary
        found.push({ ...d, score, snippet })
      }
    }
    // tematy z roadmapy, które jeszcze nie mają lekcji
    const have = new Set(found.map((f) => f.id))
    for (const l of ALL_LESSONS) {
      if (have.has(l.id) || (index || []).some((d) => d.id === l.id)) continue
      if (terms.every((t) => norm(l.title).includes(t))) found.push({ kind: 'plan', id: l.id, title: l.title, href: `/lekcja/${l.id}`, score: 1, snippet: 'Temat w roadmapie, lekcja wkrótce.' })
    }
    return found.sort((a, b) => b.score - a.score).slice(0, 30)
  }, [q, index])

  return (
    <div>
      <label className="relative block">
        <Icon name="search" size={22} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <input
          autoFocus
          value={q}
          onChange={(e) => {
            setQ(e.target.value)
            setParams(e.target.value ? { q: e.target.value } : {}, { replace: true })
          }}
          placeholder="Szukaj: pętla for, konstruktor, equals…"
          className="min-h-14 w-full rounded-2xl border border-line bg-surface pl-12 pr-4 text-lg shadow-[var(--shadow)] outline-none focus:border-accent"
          type="search"
          enterKeyHint="search"
        />
      </label>
      <div className="mt-5 space-y-2">
        {!index && <p className="text-muted">Ładuję indeks…</p>}
        {index && q && !results.length && <p className="text-muted">Nic nie znalazłem. Spróbuj innego słowa.</p>}
        {results.map((r) => (
          <Link key={r.kind + r.id} to={r.href} className="block rounded-2xl border border-line bg-surface p-4 hover:border-accent">
            <span className="text-xs font-bold uppercase tracking-wider text-accent">
              {r.kind === 'sciaga' ? 'Ściąga' : `Lekcja ${r.id}`}
            </span>
            <span className="block font-bold">{r.title}</span>
            <span className="mt-1 block text-sm text-muted">{r.snippet}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
