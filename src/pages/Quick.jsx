import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ALL_FLASHCARDS, ALL_QUIZ, LESSONS } from '../lib/content'
import { useProgress } from '../lib/progress'
import { Button, PageTitle, fmtTime, shuffle } from '../components/ui'
import Question from '../components/Question'
import RichText from '../components/RichText'
import Icon from '../components/Icon'

const LIMIT = 5 * 60 * 1000

function pickItems(state) {
  const weak = (lesson) => state.lessons[lesson] !== 'umiem'
  let qs = ALL_QUIZ.filter((q) => weak(q.lesson))
  let cs = ALL_FLASHCARDS.filter((c) => weak(c.lesson))
  if (!qs.length) qs = ALL_QUIZ
  if (!cs.length) cs = ALL_FLASHCARDS
  const items = [
    ...shuffle(qs).slice(0, 5).map((q) => ({ kind: 'q', ...q })),
    ...shuffle(cs).slice(0, 5).map((c) => ({ kind: 'c', ...c })),
  ]
  return shuffle(items)
}

export default function Quick() {
  const { state, rateCard } = useProgress()
  const [round, setRound] = useState(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const items = useMemo(() => pickItems(state), [round])
  const [started, setStarted] = useState(null)
  const [now, setNow] = useState(Date.now())
  const [idx, setIdx] = useState(0)
  const [chosen, setChosen] = useState(null)
  const [flipped, setFlipped] = useState(false)
  const [score, setScore] = useState({ right: 0, asked: 0 })

  useEffect(() => {
    if (!started) return
    const t = setInterval(() => setNow(Date.now()), 500)
    return () => clearInterval(t)
  }, [started])

  const left = started ? LIMIT - (now - started) : LIMIT
  const finished = started && (idx >= items.length || left <= 0)

  const next = () => {
    setChosen(null)
    setFlipped(false)
    setIdx((i) => i + 1)
  }
  const restart = () => {
    setRound((r) => r + 1)
    setIdx(0)
    setChosen(null)
    setFlipped(false)
    setScore({ right: 0, asked: 0 })
    setStarted(Date.now())
  }

  if (!items.length) {
    return (
      <div>
        <PageTitle eyebrow="Szybka sesja" title="Mam 5 minut" />
        <p className="text-muted">Brak materiału. Najpierw otwórz jakąś lekcję.</p>
      </div>
    )
  }

  if (!started) {
    return (
      <div>
        <PageTitle eyebrow="Szybka sesja" title="Mam 5 minut">
          Mieszanka pytań z mini-quizów i fiszek z tematów, których jeszcze nie oznaczyłeś jako „umiem”. Idealne do autobusu.
        </PageTitle>
        <Button className="w-full text-lg" onClick={() => setStarted(Date.now())}>
          <Icon name="play" /> Start: {items.length} pytań, 5 minut
        </Button>
      </div>
    )
  }

  if (finished) {
    return (
      <div>
        <PageTitle eyebrow="Szybka sesja" title={left <= 0 ? 'Czas minął' : 'Gotowe'} />
        <div className="rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow)]">
          <p className="text-lg font-bold">
            Pytania: {score.right}/{score.asked} dobrze
          </p>
          <p className="mt-1 text-muted">Fiszki trafiły do systemu powtórek. Te, których nie pamiętałeś, wrócą szybciej.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={restart}>Jeszcze 5 minut</Button>
            <Button as={Link} to="/" variant="ghost">
              Do roadmapy
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const it = items[idx]
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-muted">
          {idx + 1} / {items.length} · {LESSONS[it.lesson]?.id} {LESSONS[it.lesson]?.title}
        </span>
        <span className={`rounded-full px-3 py-1 font-mono font-bold ${left < 60000 ? 'bg-bad-soft text-bad' : 'bg-surface-2'}`}>{fmtTime(left)}</span>
      </div>

      {it.kind === 'q' ? (
        <>
          <Question
            item={it}
            chosen={chosen}
            onChoose={(c) => {
              setChosen(c)
              setScore((s) => ({ right: s.right + (c === it.answer ? 1 : 0), asked: s.asked + 1 }))
            }}
          />
          {chosen !== null && (
            <Button className="reveal mt-3 w-full" onClick={next}>
              Dalej <Icon name="next" />
            </Button>
          )}
        </>
      ) : (
        <>
          <button type="button" onClick={() => setFlipped(true)} className="block min-h-48 w-full rounded-2xl border border-line bg-surface p-5 text-left shadow-[var(--shadow)]">
            <div className="text-xs font-bold uppercase tracking-wider text-accent">Fiszka</div>
            <RichText text={it.q} className="mt-1 text-lg font-semibold" />
            {flipped ? (
              <div className="reveal mt-4 border-t border-line pt-4">
                <RichText text={it.a} />
              </div>
            ) : (
              <div className="mt-6 text-center text-sm font-semibold text-muted">Dotknij, żeby odkryć</div>
            )}
          </button>
          {flipped && (
            <div className="reveal mt-3 grid grid-cols-3 gap-2">
              {[
                ['again', 'Nie pamiętam', 'bad'],
                ['hard', 'Trudne', 'warn'],
                ['good', 'Pamiętam', 'good'],
              ].map(([r, label, v]) => (
                <Button
                  key={r}
                  variant={v}
                  className="text-[0.95rem]"
                  onClick={() => {
                    rateCard(it.id, r)
                    next()
                  }}
                >
                  {label}
                </Button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
