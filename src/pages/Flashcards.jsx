import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ALL_FLASHCARDS, LESSONS } from '../lib/content'
import { INTERVALS, isDue, useProgress } from '../lib/progress'
import { Button, PageTitle, shuffle } from '../components/ui'
import RichText from '../components/RichText'

export function FlashcardRunner({ cards, onFinish, compact = false }) {
  const { rateCard } = useProgress()
  const [queue, setQueue] = useState(cards)
  const [flipped, setFlipped] = useState(false)
  const [stats, setStats] = useState({ good: 0, hard: 0, again: 0 })

  if (!queue.length) {
    return (
      <div className="reveal rounded-2xl border border-line bg-surface p-5 text-center shadow-[var(--shadow)]">
        <p className="text-xl font-extrabold">Koniec serii</p>
        <p className="mt-1 text-muted">
          Pamiętane: {stats.good} · trudne: {stats.hard} · do powtórki: {stats.again}
        </p>
        {onFinish && (
          <Button className="mt-4" onClick={onFinish}>
            Dalej
          </Button>
        )}
      </div>
    )
  }

  const card = queue[0]
  const rate = (r) => {
    rateCard(card.id, r)
    setStats((s) => ({ ...s, [r]: s[r] + 1 }))
    setFlipped(false)
    // „Nie pamiętam”: fiszka wraca za 3 inne karty w tej samej serii
    setQueue((q) => (r === 'again' ? [...q.slice(1, 4), card, ...q.slice(4)] : q.slice(1)))
  }

  return (
    <div>
      <div className="mb-2 flex justify-between text-sm text-muted">
        <span>
          {LESSONS[card.lesson]?.id} {LESSONS[card.lesson]?.title}
        </span>
        <span className="font-mono">zostało {queue.length}</span>
      </div>
      <button
        type="button"
        onClick={() => setFlipped(true)}
        className={`block w-full rounded-2xl border border-line bg-surface p-5 text-left shadow-[var(--shadow)] ${compact ? 'min-h-48' : 'min-h-64'}`}
      >
        <div className="text-xs font-bold uppercase tracking-wider text-accent">Pytanie</div>
        <RichText text={card.q} className="mt-1 text-lg font-semibold leading-snug" />
        {flipped ? (
          <div className="reveal mt-4 border-t border-line pt-4">
            <div className="text-xs font-bold uppercase tracking-wider text-good">Odpowiedź</div>
            <RichText text={card.a} className="mt-1 text-[1.02rem]" />
          </div>
        ) : (
          <div className="mt-6 text-center text-sm font-semibold text-muted">Pomyśl, a potem dotknij, żeby odkryć odpowiedź</div>
        )}
      </button>
      {flipped && (
        <div className="reveal mt-3 grid grid-cols-3 gap-2">
          <Button variant="bad" onClick={() => rate('again')} className="text-[0.95rem]">
            Nie pamiętam
          </Button>
          <Button variant="warn" onClick={() => rate('hard')} className="text-[0.95rem]">
            Trudne
          </Button>
          <Button variant="good" onClick={() => rate('good')} className="text-[0.95rem]">
            Pamiętam
          </Button>
        </div>
      )}
    </div>
  )
}

export default function Flashcards() {
  const { state } = useProgress()
  const [scope, setScope] = useState('due')
  const [run, setRun] = useState(0)

  const lessonsWithCards = Object.values(LESSONS).filter((l) => l.flashcards.length)
  const cards = useMemo(() => {
    let list
    if (scope === 'due') list = ALL_FLASHCARDS.filter((c) => isDue(state.cards[c.id]))
    else if (scope === 'all') list = ALL_FLASHCARDS
    else list = LESSONS[scope]?.flashcards || []
    // najpierw nowe i z niskich pudełek
    return shuffle(list)
      .sort((a, b) => (state.cards[a.id]?.box ?? -1) - (state.cards[b.id]?.box ?? -1))
      .slice(0, 20)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scope, run])

  const boxes = INTERVALS.map((_, b) => ALL_FLASHCARDS.filter((c) => (state.cards[c.id]?.box ?? -1) === b).length)
  const unseen = ALL_FLASHCARDS.filter((c) => !state.cards[c.id]).length

  return (
    <div>
      <PageTitle eyebrow="Powtórki" title="Fiszki">
        Odpowiedz w głowie, odkryj i oceń się szczerze. Seria to maksymalnie 20 fiszek.
      </PageTitle>

      <label className="mb-4 block">
        <span className="mb-1 block text-sm font-semibold text-muted">Co powtarzamy</span>
        <select
          value={scope}
          onChange={(e) => {
            setScope(e.target.value)
            setRun((r) => r + 1)
          }}
          className="min-h-12 w-full rounded-xl border border-line bg-surface px-3 font-semibold"
        >
          <option value="due">Do powtórki teraz</option>
          <option value="all">Wszystkie fiszki ({ALL_FLASHCARDS.length})</option>
          {lessonsWithCards.map((l) => (
            <option key={l.meta.id} value={l.meta.id}>
              {l.meta.id} {l.title} ({l.flashcards.length})
            </option>
          ))}
        </select>
      </label>

      {cards.length ? (
        <FlashcardRunner key={`${scope}-${run}`} cards={cards} onFinish={() => setRun((r) => r + 1)} />
      ) : (
        <div className="rounded-2xl border border-line bg-surface p-5">
          <p className="font-bold">Na teraz wszystko powtórzone.</p>
          <p className="mt-1 text-muted">
            Wróć jutro albo przejdź do <Link to="/5-minut" className="text-accent underline">trybu 5 minut</Link>.
          </p>
        </div>
      )}

      <section className="mt-8">
        <h2 className="mb-1 font-bold">Twoje pudełka</h2>
        <p className="mb-2 text-sm text-muted">„Nie pamiętam” wraca jeszcze w tej serii. „Pamiętam” przesuwa fiszkę do następnego pudełka, więc wraca po 1, 3, 7, 14, a potem 30 dniach.</p>
        <div className="grid grid-cols-4 gap-2 text-center sm:grid-cols-7">
          <div className="rounded-xl border border-line bg-surface p-2">
            <div className="font-mono text-lg font-bold">{unseen}</div>
            <div className="text-xs text-muted">nowe</div>
          </div>
          {boxes.map((n, b) => (
            <div key={b} className="rounded-xl border border-line bg-surface p-2">
              <div className="font-mono text-lg font-bold">{n}</div>
              <div className="text-xs text-muted">{b === 0 ? 'zapomniane' : `co ${INTERVALS[b]} d.`}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
