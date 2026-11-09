import { useEffect, useMemo, useState } from 'react'
import { ALL_QUIZ } from '../lib/content'
import { THEORY } from '../data/theory'
import { useProgress } from '../lib/progress'
import { Button, ConfirmButton, PageTitle, fmtTime, shuffle } from '../components/ui'
import Question from '../components/Question'
import Icon from '../components/Icon'

const COUNT = 40
const LIMIT = 60 * 60 * 1000

export default function TheoryTest() {
  const { state, addTheoryResult } = useProgress()
  const pool = useMemo(() => [...THEORY.map((q, i) => ({ ...q, id: `t${i}` })), ...ALL_QUIZ], [])
  const [run, setRun] = useState(null) // { items, answers, startedAt, finished }
  const [idx, setIdx] = useState(0)
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    if (!run || run.finished) return
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [run])

  const left = run ? LIMIT - (now - run.startedAt) : LIMIT

  const finish = () => {
    setRun((r) => {
      const score = r.items.reduce((s, q, i) => s + (r.answers[i] === q.answer ? 1 : 0), 0)
      addTheoryResult({ date: Date.now(), score, total: r.items.length })
      return { ...r, finished: true, score }
    })
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    if (run && !run.finished && left <= 0) finish()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left])

  if (!run) {
    const history = state.theory.slice(-5).reverse()
    return (
      <div>
        <PageTitle eyebrow="Część pisemna" title="Test teoretyczny">
          Format jak na egzaminie: {COUNT} pytań jednokrotnego wyboru, 60 minut, zdajesz od 50% (20 punktów). Wynik i wyjaśnienia zobaczysz na końcu.
        </PageTitle>
        <Button
          className="w-full text-lg"
          onClick={() => {
            setIdx(0)
            setNow(Date.now())
            setRun({ items: shuffle(pool).slice(0, COUNT), answers: {}, startedAt: Date.now(), finished: false })
          }}
        >
          <Icon name="play" /> Rozpocznij test
        </Button>
        <p className="mt-3 text-sm text-muted">
          Bank pytań: {pool.length}. Rośnie z każdym działem. {pool.length < COUNT && `Na razie test ma ${pool.length} pytań.`}
        </p>
        {history.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-2 font-bold">Ostatnie wyniki</h2>
            <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
              {history.map((h) => {
                const p = Math.round((h.score / h.total) * 100)
                return (
                  <li key={h.date} className="flex justify-between px-4 py-2.5">
                    <span>{new Date(h.date).toLocaleDateString('pl-PL')}</span>
                    <span className={`font-mono font-bold ${p >= 50 ? 'text-good' : 'text-bad'}`}>
                      {h.score}/{h.total} ({p}%)
                    </span>
                  </li>
                )
              })}
            </ul>
          </section>
        )}
      </div>
    )
  }

  if (run.finished) {
    const pct = Math.round((run.score / run.items.length) * 100)
    const wrong = run.items.map((q, i) => ({ q, i })).filter(({ q, i }) => run.answers[i] !== q.answer)
    return (
      <div>
        <PageTitle eyebrow="Wynik" title={pct >= 50 ? 'Zdane' : 'Jeszcze nie'} />
        <div className={`rounded-2xl p-5 ${pct >= 50 ? 'bg-good-soft' : 'bg-bad-soft'}`}>
          <div className="font-mono text-4xl font-bold">
            {run.score}/{run.items.length}
          </div>
          <div className="mt-1 font-semibold">{pct}% · próg 50%</div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button onClick={() => setRun(null)}>Nowy test</Button>
        </div>
        {wrong.length > 0 && (
          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-extrabold">Do poprawy ({wrong.length})</h2>
            {wrong.map(({ q, i }) => (
              <Question key={i} number={i + 1} item={q} chosen={run.answers[i] ?? -1} onChoose={() => {}} reveal />
            ))}
          </section>
        )}
      </div>
    )
  }

  const q = run.items[idx]
  const answeredCount = Object.keys(run.answers).length
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-muted">
          Odpowiedzi: {answeredCount}/{run.items.length}
        </span>
        <span className={`rounded-full px-3 py-1 font-mono font-bold ${left < 5 * 60000 ? 'bg-bad-soft text-bad' : 'bg-surface-2'}`}>{fmtTime(left)}</span>
      </div>

      <Question
        number={idx + 1}
        item={q}
        reveal={false}
        chosen={run.answers[idx]}
        onChoose={(c) => setRun((r) => ({ ...r, answers: { ...r.answers, [idx]: c } }))}
      />

      <div className="mt-3 grid grid-cols-2 gap-2">
        <Button variant="ghost" disabled={idx === 0} onClick={() => setIdx(idx - 1)}>
          <Icon name="back" /> Poprzednie
        </Button>
        {idx < run.items.length - 1 ? (
          <Button onClick={() => setIdx(idx + 1)}>
            Następne <Icon name="next" />
          </Button>
        ) : (
          <ConfirmButton variant="good" onConfirm={finish} confirmText="Na pewno zakończyć?">
            Zakończ
          </ConfirmButton>
        )}
      </div>

      <div className="mt-6 grid grid-cols-8 gap-1.5 sm:grid-cols-10">
        {run.items.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIdx(i)}
            className={`grid h-10 place-items-center rounded-lg border font-mono text-sm ${i === idx ? 'border-accent ring-2 ring-accent' : 'border-line'} ${run.answers[i] !== undefined ? 'bg-accent-soft font-bold' : 'bg-surface'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <ConfirmButton className="mt-4 w-full" onConfirm={finish} confirmText={`Masz ${answeredCount}/${run.items.length} odpowiedzi. Kliknij, by zakończyć`}>
        Zakończ test teraz
      </ConfirmButton>
    </div>
  )
}
