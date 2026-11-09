import { Children, isValidElement, useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import Question from './Question'
import { useProgress } from '../lib/progress'

/* ---------- Kopiowanie do schowka ---------- */
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    let ok = false
    try {
      ok = document.execCommand('copy')
    } catch {
      ok = false
    }
    ta.remove()
    return ok
  }
}

/* ---------- Blok kodu z przyciskiem „kopiuj” ---------- */
const LANG_NAME = { java: 'Java', xml: 'XML', kotlin: 'Kotlin', csharp: 'C#', jsx: 'JSX', javascript: 'JavaScript', html: 'HTML', css: 'CSS', bash: 'Terminal', json: 'JSON', text: 'Tekst' }

export function CodeBlock(props) {
  const ref = useRef(null)
  const [copied, setCopied] = useState(false)
  const title = props['data-title']
  const lang = props['data-lang']
  const onCopy = async () => {
    const ok = await copyText(ref.current?.innerText ?? '')
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    }
  }
  return (
    <figure className="codeblock overflow-hidden rounded-xl border border-line">
      <div className="flex items-center justify-between gap-2 border-b border-line bg-surface-2 py-1 pl-3 pr-1 font-mono text-xs text-muted">
        <span className="truncate">{title || LANG_NAME[lang] || lang}</span>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2.5 font-sans text-[0.8rem] font-semibold text-ink hover:bg-surface"
          aria-label="Kopiuj kod"
        >
          <Icon name={copied ? 'check' : 'copy'} size={16} />
          {copied ? 'Skopiowano' : 'Kopiuj'}
        </button>
      </div>
      <pre ref={ref} className={props.className} style={props.style} tabIndex={0}>
        {props.children}
      </pre>
    </figure>
  )
}

/* ---------- Ramki ---------- */
function Box({ tone, icon, label, children }) {
  const tones = {
    accent: 'border-accent bg-accent-soft',
    warn: 'border-warn bg-warn-soft',
    good: 'border-good bg-good-soft',
    bad: 'border-bad bg-bad-soft',
    plain: 'border-line bg-surface',
  }
  const ink = { accent: 'text-accent', warn: 'text-warn', good: 'text-good', bad: 'text-bad', plain: 'text-muted' }
  return (
    <aside className={`rounded-2xl border-l-4 px-4 py-3 ${tones[tone]}`}>
      {label && (
        <div className={`mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ${ink[tone]}`}>
          <Icon name={icon} size={16} />
          {label}
        </div>
      )}
      <div className="space-y-2 [&_p]:max-w-none">{children}</div>
    </aside>
  )
}

export const Why = ({ children }) => (
  <section className="rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow)] sm:p-5">
    <h2 id="po-co" className="!m-0 !border-0 !p-0 text-lg font-extrabold">
      Po co to jest
    </h2>
    <div className="mt-2 space-y-2 text-[1.05rem]">{children}</div>
  </section>
)
export const Analogy = ({ children, title = 'Jak w życiu' }) => (
  <Box tone="accent" icon="bulb" label={title}>
    {children}
  </Box>
)
export const Note = ({ children, title = 'Uwaga' }) => (
  <Box tone="warn" icon="alert" label={title}>
    {children}
  </Box>
)
export const ExamTip = ({ children }) => (
  <Box tone="good" icon="target" label="Na egzaminie">
    {children}
  </Box>
)
export const Trick = ({ children, title = 'Trik' }) => (
  <Box tone="accent" icon="key" label={title}>
    {children}
  </Box>
)

export function Mistake({ title, children }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      <div className="flex items-start gap-2 font-bold text-bad">
        <Icon name="alert" className="mt-0.5 shrink-0" />
        <span>{title}</span>
      </div>
      <div className="mt-2 space-y-3">{children}</div>
    </div>
  )
}

export const Table = (props) => (
  <div className="table-wrap rounded-xl border border-line bg-surface">
    <table {...props} />
  </div>
)

/* ---------- Zadanie z podpowiedziami i rozwiązaniem ---------- */
export const Hint = ({ children }) => <>{children}</>
export const Solution = ({ children }) => <>{children}</>

const LEVEL = {
  łatwe: 'border-good text-good',
  średnie: 'border-warn text-warn',
  egzamin: 'border-bad text-bad',
}

export function Task({ id, title, level = 'łatwe', minutes, children }) {
  const { state, toggleTask, setHints } = useProgress()
  const items = Children.toArray(children)
  const hints = items.filter((c) => isValidElement(c) && c.type === Hint)
  const solution = items.find((c) => isValidElement(c) && c.type === Solution)
  const body = items.filter((c) => !(isValidElement(c) && (c.type === Hint || c.type === Solution)))
  const shown = state.hints[id] ?? 0
  const [showSol, setShowSol] = useState(false)
  const done = Boolean(state.tasks[id])

  return (
    <article id={`zadanie-${id}`} className={`rounded-2xl border bg-surface p-4 shadow-[var(--shadow)] sm:p-5 ${done ? 'border-good' : 'border-line'}`}>
      <header className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="!m-0 text-[1.1rem] font-bold leading-snug">{title}</h3>
        <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${LEVEL[level] || LEVEL.łatwe}`}>
          {level}
          {minutes ? ` · ${minutes} min` : ''}
        </span>
      </header>
      <div className="mt-2 space-y-3">{body}</div>

      {hints.length > 0 && (
        <div className="mt-4 space-y-2">
          {hints.slice(0, shown).map((h, i) => (
            <div key={i} className="reveal rounded-xl border border-dashed border-warn bg-warn-soft px-3 py-2 text-[0.95rem]">
              <b className="text-warn">Podpowiedź {i + 1}. </b>
              <span className="[&>p]:inline">{h}</span>
            </div>
          ))}
          {shown < hints.length && (
            <button
              type="button"
              onClick={() => setHints(id, shown + 1)}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-warn px-4 font-semibold text-warn hover:bg-warn-soft"
            >
              <Icon name="bulb" size={18} />
              {shown === 0 ? 'Pokaż podpowiedź 1' : `Podpowiedź ${shown + 1} z ${hints.length}`}
            </button>
          )}
        </div>
      )}

      {solution && (
        <div className="mt-3">
          {!showSol ? (
            <button
              type="button"
              onClick={() => setShowSol(true)}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line px-4 font-semibold hover:bg-surface-2"
            >
              <Icon name="eye" size={18} />
              Pokaż rozwiązanie
            </button>
          ) : (
            <div className="reveal mt-1 space-y-3 rounded-xl border border-line bg-surface-2 p-3 sm:p-4">
              <div className="text-xs font-bold uppercase tracking-wider text-muted">Rozwiązanie</div>
              {solution}
              <button type="button" onClick={() => setShowSol(false)} className="text-sm font-semibold text-muted underline underline-offset-4">
                Schowaj i napisz z pamięci
              </button>
            </div>
          )}
        </div>
      )}

      <label className="mt-4 flex min-h-11 cursor-pointer items-center gap-3 border-t border-line pt-3 font-semibold">
        <input type="checkbox" checked={done} onChange={() => toggleTask(id)} className="size-5 accent-[var(--good)]" />
        Zrobione samodzielnie
      </label>
    </article>
  )
}

/* ---------- Wizualizacja: wykonanie programu krok po kroku ----------
   code: tekst programu, steps: [{ line, vars: {nazwa: wartość}, out, note, hl: {tablica: indeks} }]
   Wartość zmiennej może być liczbą, tekstem albo tablicą (pokazana jako pudełka z indeksami). */
export function Trace({ code, steps, title = 'Program krok po kroku' }) {
  const lines = code.replace(/^\n+|\s+$/g, '').split('\n')
  const [i, setI] = useState(0)
  const [auto, setAuto] = useState(false)
  const step = steps[i]
  const out = steps
    .slice(0, i + 1)
    .map((s) => s.out ?? '')
    .join('')

  useEffect(() => {
    if (!auto) return
    if (i >= steps.length - 1) {
      setAuto(false)
      return
    }
    const t = setTimeout(() => setI((x) => x + 1), 1100)
    return () => clearTimeout(t)
  }, [auto, i, steps.length])

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow)]">
      <div className="flex items-center justify-between border-b border-line bg-surface-2 px-3 py-2 text-sm">
        <b>{title}</b>
        <span className="font-mono text-xs text-muted">
          krok {i + 1}/{steps.length}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <pre className="overflow-x-auto bg-[var(--code-bg)] py-2 font-mono text-[0.78rem] leading-[1.7]">
          {lines.map((l, n) => {
            const active = step.line === n + 1
            return (
              <div key={n} className={`flex pr-3 ${active ? 'bg-accent-soft' : ''}`}>
                <span className={`w-8 shrink-0 select-none pr-2 text-right ${active ? 'font-bold text-accent' : 'text-muted/60'}`}>
                  {active ? '▶' : n + 1}
                </span>
                <span className="whitespace-pre">{l || ' '}</span>
              </div>
            )
          })}
        </pre>
        <div className="space-y-3 border-t border-line p-3 md:border-l md:border-t-0">
          <div>
            <div className="mb-1 text-xs font-bold uppercase tracking-wider text-muted">Zmienne w pamięci</div>
            {Object.keys(step.vars || {}).length === 0 ? (
              <div className="text-sm text-muted">jeszcze brak</div>
            ) : (
              <div className="space-y-1.5">
                {Object.entries(step.vars).map(([k, v]) => (
                  <div key={k} className="flex flex-wrap items-center gap-2 font-mono text-sm">
                    <span className="min-w-12 font-semibold">{k}</span>
                    <span className="text-muted">=</span>
                    {Array.isArray(v) && v.length === 0 ? (
                      <span className="rounded-md border border-dashed border-line px-2 py-0.5 text-muted">pusta</span>
                    ) : Array.isArray(v) ? (
                      <span className="flex flex-wrap gap-1">
                        {v.map((x, j) => (
                          <span
                            key={j}
                            className={`grid min-w-8 place-items-center rounded-md border px-1.5 py-0.5 ${step.hl?.[k] === j ? 'border-accent bg-accent-soft font-bold' : 'border-line bg-surface-2'}`}
                          >
                            <span>{String(x)}</span>
                            <span className="text-[0.6rem] leading-none text-muted">{j}</span>
                          </span>
                        ))}
                      </span>
                    ) : (
                      <span className="rounded-md border border-line bg-surface-2 px-2 py-0.5">{String(v)}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <div className="mb-1 text-xs font-bold uppercase tracking-wider text-muted">Konsola</div>
            <pre className="min-h-10 whitespace-pre-wrap rounded-lg bg-[#16171b] px-2.5 py-2 font-mono text-[0.78rem] text-[#e6e6ea]">{out || ' '}</pre>
          </div>
          {step.note && <p className="reveal rounded-lg bg-accent-soft px-3 py-2 text-[0.92rem]">{step.note}</p>}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-line p-2">
        <button type="button" onClick={() => { setAuto(false); setI(0) }} className="grid size-11 place-items-center rounded-xl border border-line hover:bg-surface-2" aria-label="Od początku">
          <Icon name="reset" />
        </button>
        <button type="button" disabled={i === 0} onClick={() => { setAuto(false); setI(i - 1) }} className="inline-flex min-h-11 items-center gap-1 rounded-xl border border-line px-3 font-semibold disabled:opacity-40 hover:bg-surface-2">
          <Icon name="back" /> Wstecz
        </button>
        <button type="button" disabled={i === steps.length - 1} onClick={() => { setAuto(false); setI(i + 1) }} className="inline-flex min-h-11 flex-1 items-center justify-center gap-1 rounded-xl bg-accent px-4 font-semibold text-accent-ink disabled:opacity-40">
          Dalej <Icon name="next" />
        </button>
        <button type="button" onClick={() => { if (i >= steps.length - 1) setI(0); setAuto(!auto) }} className="grid size-11 place-items-center rounded-xl border border-line hover:bg-surface-2" aria-label={auto ? 'Pauza' : 'Odtwarzaj'}>
          <Icon name={auto ? 'pause' : 'play'} />
        </button>
      </div>
    </div>
  )
}

/* ---------- Mini-quiz na końcu lekcji ---------- */
export function LessonQuiz({ lessonId, questions }) {
  const { state, saveQuiz } = useProgress()
  const [answers, setAnswers] = useState({})
  const done = Object.keys(answers).length === questions.length
  const score = questions.reduce((s, q, i) => s + (answers[i] === q.answer ? 1 : 0), 0)
  const saved = useRef(false)

  useEffect(() => {
    if (done && !saved.current) {
      saved.current = true
      saveQuiz(lessonId, score, questions.length)
    }
  }, [done, score, lessonId, questions.length, saveQuiz])

  const best = state.quizzes[lessonId]
  return (
    <div className="space-y-3">
      {best && (
        <p className="text-sm text-muted">
          Twój najlepszy wynik: {best.best}/{best.total}
        </p>
      )}
      {questions.map((q, i) => (
        <Question key={i} number={i + 1} item={q} chosen={answers[i]} onChoose={(c) => setAnswers((a) => ({ ...a, [i]: c }))} />
      ))}
      {done && (
        <div className={`reveal rounded-2xl p-4 font-semibold ${score === questions.length ? 'bg-good-soft' : 'bg-warn-soft'}`}>
          Wynik: {score}/{questions.length}.{' '}
          {score === questions.length
            ? 'Komplet. Jeśli zadania też poszły, oznacz lekcję jako „umiem”.'
            : 'Wróć do fragmentu, który sprawił problem, i spróbuj jeszcze raz.'}
          <button
            type="button"
            onClick={() => {
              saved.current = false
              setAnswers({})
            }}
            className="ml-2 underline underline-offset-4"
          >
            Jeszcze raz
          </button>
        </div>
      )}
    </div>
  )
}

export const mdxComponents = {
  pre: CodeBlock,
  table: Table,
  Why,
  Analogy,
  Note,
  ExamTip,
  Trick,
  Mistake,
  Task,
  Hint,
  Solution,
  Trace,
}
