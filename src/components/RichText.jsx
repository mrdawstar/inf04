// Prosty renderer tekstu fiszek: ```blok kodu``` i `kod w linii`.
export default function RichText({ text, className = '' }) {
  const parts = String(text).split(/```\w*\n?([\s\S]*?)```/g)
  return (
    <div className={className}>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <pre key={i} className="my-2 overflow-x-auto rounded-lg border border-line bg-[var(--code-bg)] px-3 py-2 text-left font-mono text-[0.8rem] leading-relaxed">
            {p.replace(/\n$/, '')}
          </pre>
        ) : (
          <span key={i} className="whitespace-pre-line">
            {p.split(/`([^`]+)`/g).map((s, j) =>
              j % 2 === 1 ? (
                <code key={j} className="rounded border border-line bg-surface-2 px-1 font-mono text-[0.88em]">
                  {s}
                </code>
              ) : (
                s
              ),
            )}
          </span>
        ),
      )}
    </div>
  )
}
