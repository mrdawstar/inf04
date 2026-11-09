import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { COMMON_CHECKLIST, EXAMS } from '../data/exams'
import { useProgress } from '../lib/progress'
import { Button, ConfirmButton, PageTitle, ProgressBar, fmtTime } from '../components/ui'
import RichText from '../components/RichText'
import Icon from '../components/Icon'

export function ExamList() {
  const { state } = useProgress()
  const lastTheory = state.theory[state.theory.length - 1]
  return (
    <div className="space-y-8">
      <PageTitle eyebrow="Sprawdzian" title="Egzamin próbny">
        Dwie części, tak jak w prawdziwym egzaminie: test teoretyczny i arkusz praktyczny z timerem.
      </PageTitle>

      <Link to="/test" className="flex items-center gap-3 rounded-2xl bg-accent p-4 text-accent-ink">
        <Icon name="list" size={26} />
        <span className="flex-1">
          <span className="block text-lg font-bold">Test teoretyczny</span>
          <span className="text-sm opacity-85">
            40 pytań, 60 minut, zdajesz od 50%
            {lastTheory ? ` · ostatnio ${lastTheory.score}/${lastTheory.total}` : ''}
          </span>
        </span>
        <Icon name="next" />
      </Link>

      <section>
        <h2 className="mb-3 text-xl font-extrabold">Arkusze praktyczne</h2>
        <div className="grid gap-3">
          {EXAMS.map((e) => {
            const st = state.exams[e.id]
            const all = [COMMON_CHECKLIST, ...e.checklist].flatMap((g, gi) => g.items.map((_, i) => `${gi}-${i}`))
            const done = all.filter((k) => st?.checks?.[k]).length
            return (
              <Link key={e.id} to={`/egzamin/${e.id}`} className="rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow)] hover:border-accent">
                <span className="block font-bold">{e.title}</span>
                <span className="mt-0.5 block text-sm text-muted">
                  {e.minutes} min · GUI: {e.gui} · {e.when}
                </span>
                <span className="mt-2 flex items-center gap-2 text-sm text-muted">
                  <ProgressBar pct={Math.round((done / all.length) * 100)} className="w-32" /> {done}/{all.length} punktów checklisty
                </span>
              </Link>
            )
          })}
        </div>
        <p className="mt-3 text-sm text-muted">Kolejne arkusze (desktop w C# WPF, web w React, wersja bez testów) dojdą razem z działami.</p>
      </section>
    </div>
  )
}

function Body({ body }) {
  return (
    <div className="space-y-3">
      {body.map((b, i) =>
        b.p ? (
          <RichText key={i} text={b.p} />
        ) : (
          <ul key={i} className="list-disc space-y-1.5 pl-5">
            {b.ul.map((li, j) => (
              <li key={j}>
                <RichText text={li} />
              </li>
            ))}
          </ul>
        ),
      )}
    </div>
  )
}

export function ExamPractical() {
  const { id } = useParams()
  const exam = EXAMS.find((e) => e.id === id)
  const { state, setExam } = useProgress()
  const st = state.exams[id] || {}
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    if (!st.running) return
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [st.running])

  if (!exam) return <p>Nie ma takiego arkusza.</p>

  const total = exam.minutes * 60 * 1000
  const elapsed = (st.elapsed || 0) + (st.running ? now - st.startedAt : 0)
  const left = total - elapsed
  const elapsedMin = elapsed / 60000

  const start = () => setExam(id, { running: true, startedAt: Date.now() })
  const pause = () => setExam(id, { running: false, elapsed: elapsed })
  const reset = () => setExam(id, { running: false, elapsed: 0, startedAt: null, checks: {} })
  const toggle = (k) => setExam(id, { checks: { ...(st.checks || {}), [k]: !st.checks?.[k] } })

  const groups = [COMMON_CHECKLIST, ...exam.checklist]
  const allKeys = groups.flatMap((g, gi) => g.items.map((_, i) => `${gi}-${i}`))
  const done = allKeys.filter((k) => st.checks?.[k]).length
  const pct = Math.round((done / allKeys.length) * 100)

  return (
    <div>
      <PageTitle eyebrow={`Arkusz praktyczny · ${exam.minutes} min`} title={exam.title}>
        {exam.when}
      </PageTitle>

      {/* Timer przyklejony u góry */}
      <div className="sticky top-[calc(env(safe-area-inset-top,0px)+3.6rem)] z-10 -mx-4 mb-6 border-b border-line bg-bg/90 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className={`font-mono text-3xl font-bold tabular-nums ${left < 15 * 60000 ? 'text-bad' : ''}`}>{fmtTime(Math.max(0, left))}</span>
          <div className="flex-1" />
          {st.running ? (
            <Button variant="ghost" onClick={pause}>
              <Icon name="pause" /> Pauza
            </Button>
          ) : (
            <Button onClick={start}>
              <Icon name="play" /> {elapsed > 0 ? 'Wznów' : 'Start'}
            </Button>
          )}
          <ConfirmButton onConfirm={reset} confirmText="Zerować?" className="px-3" aria-label="Zeruj czas i checklistę">
            <Icon name="reset" />
          </ConfirmButton>
        </div>
        <div className="relative mt-3">
          <ProgressBar pct={Math.min(100, (elapsedMin / exam.minutes) * 100)} />
          {exam.milestones.map((m) => (
            <span key={m.at} className="absolute top-0 h-2.5 w-0.5 bg-ink/40" style={{ left: `${(m.at / exam.minutes) * 100}%` }} title={m.label} />
          ))}
        </div>
        <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted">
          {exam.milestones.map((m) => (
            <span key={m.at} className={elapsedMin > m.at ? 'font-bold text-bad' : ''}>
              {m.at}′ {m.label}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {exam.parts.map((p) => (
          <section key={p.title} className="rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow)] sm:p-5">
            <h2 className="mb-3 text-lg font-extrabold">{p.title}</h2>
            <Body body={p.body} />
          </section>
        ))}
      </div>

      <section className="mt-8">
        <div className="mb-2 flex items-end justify-between">
          <h2 className="text-xl font-extrabold">Checklista oddania</h2>
          <span className="font-mono text-sm text-muted">
            {done}/{allKeys.length}
          </span>
        </div>
        <ProgressBar pct={pct} tone={pct === 100 ? 'good' : 'accent'} className="mb-4" />
        <div className="space-y-4">
          {groups.map((g, gi) => (
            <div key={g.title} className="rounded-2xl border border-line bg-surface p-4">
              <h3 className="mb-2 font-bold">{g.title}</h3>
              <ul className="space-y-1">
                {g.items.map((it, i) => {
                  const k = `${gi}-${i}`
                  return (
                    <li key={k}>
                      <label className="flex min-h-11 cursor-pointer items-start gap-3 py-1">
                        <input type="checkbox" checked={Boolean(st.checks?.[k])} onChange={() => toggle(k)} className="mt-1 size-5 shrink-0 accent-[var(--good)]" />
                        <span className={st.checks?.[k] ? 'text-muted line-through' : ''}>{it}</span>
                      </label>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
