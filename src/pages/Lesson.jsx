import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'
import { LESSONS, neighbours } from '../lib/content'
import { lessonById, sectionById } from '../data/roadmap'
import { useProgress } from '../lib/progress'
import { mdxComponents, LessonQuiz } from '../components/mdx'
import { StatusPicker } from '../components/ui'
import Icon from '../components/Icon'

export function slug(s) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ł/g, 'l')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function useMdx(loader) {
  const [Comp, setComp] = useState(null)
  useEffect(() => {
    let alive = true
    setComp(null)
    loader?.().then((m) => alive && setComp(() => m.default))
    return () => {
      alive = false
    }
  }, [loader])
  return Comp
}

export function useToc(ref, deps) {
  const [toc, setToc] = useState([])
  useEffect(() => {
    if (!ref.current) return
    const hs = [...ref.current.querySelectorAll('h2')]
    hs.forEach((h) => {
      if (!h.id) h.id = slug(h.textContent)
    })
    setToc(hs.map((h) => ({ id: h.id, text: h.textContent })))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return toc
}

export function Toc({ toc }) {
  if (toc.length < 3) return null
  return (
    <nav className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1" aria-label="Spis treści">
      {toc.map((t) => (
        <a key={t.id} href={`#${t.id}`} onClick={(e) => { e.preventDefault(); document.getElementById(t.id)?.scrollIntoView({ behavior: 'smooth' }) }} className="shrink-0 rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-semibold whitespace-nowrap hover:border-accent">
          {t.text}
        </a>
      ))}
    </nav>
  )
}

export default function Lesson() {
  const { id } = useParams()
  const lesson = LESSONS[id]
  const Content = useMdx(lesson?.load)
  const ref = useRef(null)
  const toc = useToc(ref, [Content, lesson])
  const { setLastLesson } = useProgress()

  useEffect(() => {
    if (lesson) setLastLesson(id)
  }, [id, lesson, setLastLesson])

  if (!lesson) {
    const planned = lessonById[id]
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold">{planned ? `${planned.id} ${planned.title}` : 'Nie ma takiej lekcji'}</h1>
        {planned && <p className="text-muted">Ta lekcja jest w roadmapie, ale jeszcze jej nie napisałem. Pojawi się w kolejnym etapie.</p>}
        <Link to="/" className="font-semibold text-accent underline underline-offset-4">Wróć do roadmapy</Link>
      </div>
    )
  }

  const section = sectionById[lesson.section]
  const { prev, next } = neighbours(id)

  return (
    <article>
      <header className="mb-5">
        <Link to={`/dzial/${section.id}`} className="text-xs font-bold uppercase tracking-wider text-accent">
          Dział {section.num} · {section.short}
        </Link>
        <h1 className="mt-1 text-[1.95rem] font-extrabold leading-[1.1] tracking-tight sm:text-4xl">
          <span className="mr-2 font-mono text-[0.6em] text-muted">{id}</span>
          {lesson.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <StatusPicker id={id} />
          {lesson.meta.minutes && (
            <span className="inline-flex items-center gap-1 text-sm text-muted">
              <Icon name="clock" size={16} /> ok. {lesson.meta.minutes} min
            </span>
          )}
        </div>
      </header>

      <Toc toc={[...toc, ...(lesson.quiz.length ? [{ id: 'mini-quiz', text: 'Mini-quiz' }] : [])]} />

      <div ref={ref} className="prose-lesson">
        {Content ? (
          <MDXProvider components={mdxComponents}>
            <Content />
          </MDXProvider>
        ) : (
          <div className="space-y-3" aria-busy="true">
            <div className="h-24 animate-pulse rounded-2xl bg-surface-2" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-surface-2" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-surface-2" />
          </div>
        )}
      </div>

      {lesson.quiz.length > 0 && (
        <section className="mt-10 border-t border-line pt-5">
          <h2 id="mini-quiz" className="mb-1 text-[1.45rem] font-extrabold">Mini-quiz</h2>
          <p className="mb-4 text-muted">Sprawdź, czy rozumiesz. Odpowiedź i wyjaśnienie zobaczysz od razu.</p>
          <LessonQuiz key={id} lessonId={id} questions={lesson.quiz} />
        </section>
      )}

      <section className="mt-10 rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow)]">
        <p className="mb-3 font-bold">Jak ci poszło z tym tematem?</p>
        <StatusPicker id={id} />
        <p className="mt-3 text-sm text-muted">„Umiem” zaznacz dopiero wtedy, gdy zrobisz zadania bez zaglądania do rozwiązań.</p>
      </section>

      <nav className="mt-6 grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Link to={`/lekcja/${prev.id}`} className="rounded-2xl border border-line bg-surface p-4 hover:border-accent">
            <span className="text-sm text-muted">← Poprzednia</span>
            <span className="block font-semibold">{prev.id} {prev.title}</span>
          </Link>
        ) : <span />}
        {next && (
          <Link to={`/lekcja/${next.id}`} className="rounded-2xl border border-line bg-surface p-4 text-right hover:border-accent">
            <span className="text-sm text-muted">Następna →</span>
            <span className="block font-semibold">{next.id} {next.title}</span>
          </Link>
        )}
      </nav>
    </article>
  )
}
