import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { STATUSES, STATUS_LABEL, useProgress } from '../lib/progress'

export function ProgressBar({ pct, className = '', tone = 'accent' }) {
  const bg = { accent: 'bg-accent', good: 'bg-good' }[tone]
  return (
    <div className={`h-2.5 overflow-hidden rounded-full bg-surface-2 ${className}`} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className={`h-full rounded-full ${bg} transition-[width] duration-500`} style={{ width: `${pct}%` }} />
    </div>
  )
}

const ST_STYLE = {
  nie: 'bg-surface-2 text-ink border-line',
  cwicze: 'bg-warn-soft text-warn border-warn',
  umiem: 'bg-good-soft text-good border-good',
}

/** Przełącznik „jeszcze nie / ćwiczę / umiem”. */
export function StatusPicker({ id, compact = false }) {
  const { state, setLessonStatus } = useProgress()
  const cur = state.lessons[id] || 'nie'
  return (
    <div className={`inline-flex rounded-xl border border-line bg-surface p-0.5 ${compact ? 'text-xs' : 'text-sm'}`} role="radiogroup" aria-label="Twój poziom">
      {STATUSES.map((s) => (
        <button
          key={s}
          type="button"
          role="radio"
          aria-checked={cur === s}
          onClick={() => setLessonStatus(id, s)}
          className={`rounded-[10px] border font-semibold transition-colors ${compact ? 'min-h-9 px-2' : 'min-h-11 px-3'} ${cur === s ? ST_STYLE[s] : 'border-transparent text-muted hover:text-ink'}`}
        >
          {STATUS_LABEL[s]}
        </button>
      ))}
    </div>
  )
}

/** Kompaktowa wersja: jedno dotknięcie przełącza na kolejny stan. */
export function StatusCycle({ id }) {
  const { state, setLessonStatus } = useProgress()
  const cur = state.lessons[id] || 'nie'
  const next = STATUSES[(STATUSES.indexOf(cur) + 1) % STATUSES.length]
  return (
    <button
      type="button"
      onClick={() => setLessonStatus(id, next)}
      className={`min-h-9 shrink-0 rounded-full border px-3 text-xs font-bold ${ST_STYLE[cur]}`}
      aria-label={`Status: ${STATUS_LABEL[cur]}. Dotknij, aby zmienić na: ${STATUS_LABEL[next]}`}
    >
      {STATUS_LABEL[cur]}
    </button>
  )
}

export function StatusDot({ status }) {
  const c = status === 'umiem' ? 'bg-good' : status === 'cwicze' ? 'bg-warn' : 'bg-line'
  return <span className={`inline-block size-2.5 shrink-0 rounded-full ${c}`} aria-hidden="true" />
}

export function Card({ to, children, className = '' }) {
  const cls = `block rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow)] ${className}`
  return to ? (
    <Link to={to} className={`${cls} transition-colors hover:border-accent`}>
      {children}
    </Link>
  ) : (
    <div className={cls}>{children}</div>
  )
}

export function PageTitle({ eyebrow, title, children }) {
  return (
    <header className="mb-6">
      {eyebrow && <div className="mb-1 text-xs font-bold uppercase tracking-wider text-accent">{eyebrow}</div>}
      <h1 className="text-[1.9rem] font-extrabold leading-[1.1] tracking-tight sm:text-4xl">{title}</h1>
      {children && <div className="mt-2 text-[1.05rem] text-muted">{children}</div>}
    </header>
  )
}

export function Button({ as: As = 'button', variant = 'primary', className = '', ...props }) {
  const v = {
    primary: 'bg-accent text-accent-ink hover:opacity-90',
    ghost: 'border border-line bg-surface hover:bg-surface-2',
    good: 'bg-good text-on-status',
    warn: 'bg-warn text-on-status',
    bad: 'bg-bad text-on-status',
  }[variant]
  return (
    <As
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 font-semibold transition disabled:opacity-40 ${v} ${className}`}
      {...(As === 'button' ? { type: 'button' } : {})}
      {...props}
    />
  )
}

export function fmtTime(ms) {
  const s = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  const pad = (n) => String(n).padStart(2, '0')
  return h ? `${h}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`
}

export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Przycisk z potwierdzeniem w dwóch krokach (zamiast okna confirm). */
export function ConfirmButton({ onConfirm, children, confirmText = 'Na pewno? Kliknij jeszcze raz', variant = 'ghost', className = '', ...rest }) {
  const [armed, setArmed] = useState(false)
  useEffect(() => {
    if (!armed) return
    const t = setTimeout(() => setArmed(false), 4000)
    return () => clearTimeout(t)
  }, [armed])
  return (
    <Button
      {...rest}
      variant={armed ? 'bad' : variant}
      className={className}
      onClick={() => {
        if (armed) {
          setArmed(false)
          onConfirm()
        } else setArmed(true)
      }}
    >
      {armed ? confirmText : children}
    </Button>
  )
}
