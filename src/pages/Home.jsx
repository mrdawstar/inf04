import { Link } from 'react-router-dom'
import { SECTIONS, ALL_LESSONS } from '../data/roadmap'
import { LESSONS, ALL_FLASHCARDS, isReady } from '../lib/content'
import { isDue, lessonScore, sectionProgress, useProgress } from '../lib/progress'
import { ProgressBar, StatusCycle } from '../components/ui'
import Icon from '../components/Icon'

export function RoadmapSection({ section, open }) {
  const { state } = useProgress()
  const p = sectionProgress(section, state.lessons)
  const ready = section.lessons.filter((l) => isReady(l.id)).length
  return (
    <details open={open} className="group rounded-2xl border border-line bg-surface shadow-[var(--shadow)]">
      <summary className="flex cursor-pointer list-none items-start gap-3 p-4 [&::-webkit-details-marker]:hidden">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-soft font-mono font-bold text-accent">{section.num}</span>
        <span className="min-w-0 flex-1">
          <span className="block font-bold leading-snug">{section.title}</span>
          <span className="mt-1 flex items-center gap-2 text-sm text-muted">
            <ProgressBar pct={p.pct} className="w-24 sm:w-40" tone={p.pct === 100 ? 'good' : 'accent'} />
            <span className="font-mono">{p.pct}%</span>
            <span className="hidden sm:inline">· {ready ? `${ready}/${p.total} lekcji gotowych` : 'lekcje w przygotowaniu'}</span>
          </span>
        </span>
        <Icon name="next" className="mt-2 shrink-0 text-muted transition-transform group-open:rotate-90" />
      </summary>
      <div className="border-t border-line px-4 pb-4 pt-3">
        <p className="mb-2 text-[0.95rem] text-muted">{section.blurb}</p>
        <p className="mb-2 text-xs text-muted">Dotknij etykiety po prawej, żeby zmienić: jeszcze nie → ćwiczę → umiem.</p>
        <ul className="divide-y divide-line">
          {section.lessons.map((l) => {
            const ok = isReady(l.id)
            return (
              <li key={l.id} className="flex items-center gap-3 py-2">
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <span className="w-8 shrink-0 font-mono text-xs text-muted">{l.id}</span>
                  {ok ? (
                    <Link to={`/lekcja/${l.id}`} className="font-semibold underline-offset-4 hover:underline">
                      {l.title}
                    </Link>
                  ) : (
                    <span className="text-muted">
                      {l.title} <span className="ml-1 rounded-full bg-surface-2 px-2 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide">wkrótce</span>
                    </span>
                  )}
                </div>
                <StatusCycle id={l.id} />
              </li>
            )
          })}
        </ul>
      </div>
    </details>
  )
}

export default function Home() {
  const { state } = useProgress()
  const total = ALL_LESSONS.length
  const sum = ALL_LESSONS.reduce((s, l) => s + lessonScore(state.lessons[l.id]), 0)
  const pct = Math.round((sum / total) * 100)
  const known = ALL_LESSONS.filter((l) => state.lessons[l.id] === 'umiem').length
  const due = ALL_FLASHCARDS.filter((c) => isDue(state.cards[c.id]) && state.lessons[c.lesson] !== 'umiem').length

  const readyList = ALL_LESSONS.filter((l) => LESSONS[l.id])
  const cont =
    (state.lastLesson && state.lessons[state.lastLesson] !== 'umiem' && LESSONS[state.lastLesson]) ||
    readyList.find((l) => state.lessons[l.id] !== 'umiem') ||
    readyList[0]

  const openSection = SECTIONS.find((s) => sectionProgress(s, state.lessons).pct < 100)?.id

  return (
    <div className="space-y-8">
      <section>
        <div className="mb-1 text-xs font-bold uppercase tracking-wider text-accent">Technik programista · INF.04</div>
        <h1 className="text-[2rem] font-extrabold leading-[1.08] tracking-tight sm:text-[2.6rem]">Zdaj INF.04 i rozumiej, co piszesz.</h1>
        <div className="mt-5 rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow)]">
          <div className="flex items-baseline justify-between">
            <span className="font-semibold">Cały kurs</span>
            <span className="font-mono text-2xl font-bold">{pct}%</span>
          </div>
          <ProgressBar pct={pct} className="mt-2 h-3" />
          <p className="mt-2 text-sm text-muted">
            {known} z {total} tematów na „umiem”. Temat na „ćwiczę” liczy się za pół.
          </p>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        {cont && (
          <Link to={`/lekcja/${cont.id}`} className="flex items-center gap-3 rounded-2xl bg-accent p-4 text-accent-ink sm:col-span-2">
            <Icon name="play" size={26} />
            <span className="flex-1">
              <span className="block text-sm opacity-80">{state.lastLesson ? 'Kontynuuj' : 'Zacznij tutaj'}</span>
              <span className="block text-lg font-bold leading-snug">
                {cont.id} {cont.title}
              </span>
            </span>
            <Icon name="next" />
          </Link>
        )}
        <Link to="/5-minut" className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow)] hover:border-accent">
          <Icon name="bolt" size={24} className="text-warn" />
          <span>
            <span className="block font-bold">Mam 5 minut</span>
            <span className="text-sm text-muted">Losowe pytania i fiszki z tego, czego jeszcze nie umiesz</span>
          </span>
        </Link>
        <Link to="/fiszki" className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow)] hover:border-accent">
          <Icon name="cards" size={24} className="text-accent" />
          <span>
            <span className="block font-bold">Fiszki do powtórki: {due}</span>
            <span className="text-sm text-muted">Zapomniane wracają częściej</span>
          </span>
        </Link>
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-xl font-extrabold">Roadmapa</h2>
          <span className="text-sm text-muted">kolejność = kolejność nauki</span>
        </div>
        <div className="space-y-3">
          {SECTIONS.map((s) => (
            <RoadmapSection key={s.id} section={s} open={s.id === openSection} />
          ))}
        </div>
      </section>
    </div>
  )
}
