import Icon from './Icon'

const LETTERS = ['A', 'B', 'C', 'D', 'E']

/**
 * Jedno pytanie zamknięte.
 * reveal = true: po wyborze od razu pokazuje poprawną odpowiedź i wyjaśnienie.
 * reveal = false (test): tylko zaznacza wybór.
 */
export default function Question({ item, chosen, onChoose, reveal = true, number, showExplain = true }) {
  const answered = chosen !== undefined && chosen !== null
  return (
    <div className="rounded-2xl border border-line bg-surface p-4 sm:p-5 shadow-[var(--shadow)]">
      {number != null && <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">Pytanie {number}</div>}
      <p className="font-semibold leading-snug">{item.q}</p>
      {item.code && (
        <pre className="mt-3 overflow-x-auto rounded-lg border border-line bg-[var(--code-bg)] px-3 py-2 font-mono text-[0.8rem] leading-relaxed">
          {item.code}
        </pre>
      )}
      <div className="mt-3 grid gap-2">
        {item.options.map((opt, i) => {
          const isChosen = chosen === i
          const isRight = i === item.answer
          let cls = 'border-line bg-surface hover:bg-surface-2'
          if (reveal && answered) {
            if (isRight) cls = 'border-good bg-good-soft'
            else if (isChosen) cls = 'border-bad bg-bad-soft'
            else cls = 'border-line bg-surface opacity-70'
          } else if (isChosen) cls = 'border-accent bg-accent-soft'
          return (
            <button
              key={i}
              type="button"
              disabled={reveal && answered}
              onClick={() => onChoose(i)}
              className={`flex min-h-12 items-start gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors ${cls}`}
            >
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border border-line bg-surface-2 font-mono text-xs font-semibold">
                {LETTERS[i]}
              </span>
              <span className="flex-1">{opt}</span>
              {reveal && answered && isRight && <Icon name="check" className="mt-0.5 shrink-0 text-good" />}
              {reveal && answered && isChosen && !isRight && <Icon name="x" className="mt-0.5 shrink-0 text-bad" />}
            </button>
          )
        })}
      </div>
      {reveal && answered && showExplain && item.explain && (
        <p className={`reveal mt-3 rounded-xl px-3 py-2 text-[0.95rem] ${chosen === item.answer ? 'bg-good-soft' : 'bg-bad-soft'}`}>
          <b>{chosen === item.answer ? 'Dobrze. ' : 'Nie tym razem. '}</b>
          {item.explain}
        </p>
      )}
    </div>
  )
}
