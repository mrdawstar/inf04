import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

const KEY = 'inf04-progress-v1'
export const STATUSES = ['nie', 'cwicze', 'umiem']
export const STATUS_LABEL = { nie: 'jeszcze nie', cwicze: 'ćwiczę', umiem: 'umiem' }

const empty = () => ({
  version: 1,
  lessons: {}, // id lekcji -> 'nie' | 'cwicze' | 'umiem'
  tasks: {}, // id zadania -> true
  hints: {}, // id zadania -> ile podpowiedzi odkryto
  quizzes: {}, // id lekcji -> { best, total, last }
  cards: {}, // id fiszki -> { box, due }
  exams: {}, // id egzaminu -> { startedAt, elapsed, running, checks }
  theory: [], // historia testów teoretycznych
  lastLesson: null,
  updatedAt: null,
})

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return empty()
    return { ...empty(), ...JSON.parse(raw) }
  } catch {
    return empty()
  }
}

const Ctx = createContext(null)

export function ProgressProvider({ children }) {
  const [state, setState] = useState(load)
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* tryb prywatny albo pełna pamięć: działamy dalej bez zapisu */
    }
  }, [state])

  const update = useCallback((fn) => {
    setState((s) => ({ ...fn(s), updatedAt: Date.now() }))
  }, [])

  const api = useMemo(
    () => ({
      state,
      setLessonStatus: (id, status) => update((s) => ({ ...s, lessons: { ...s.lessons, [id]: status } })),
      toggleTask: (id) => update((s) => ({ ...s, tasks: { ...s.tasks, [id]: !s.tasks[id] } })),
      setHints: (id, n) => update((s) => ({ ...s, hints: { ...s.hints, [id]: n } })),
      saveQuiz: (id, score, total) =>
        update((s) => {
          const prev = s.quizzes[id]
          return {
            ...s,
            quizzes: { ...s.quizzes, [id]: { best: Math.max(prev?.best ?? 0, score), total, last: score } },
          }
        }),
      rateCard: (id, rating) => update((s) => ({ ...s, cards: { ...s.cards, [id]: schedule(s.cards[id], rating) } })),
      setExam: (id, patch) =>
        update((s) => ({ ...s, exams: { ...s.exams, [id]: { ...(s.exams[id] || {}), ...patch } } })),
      addTheoryResult: (r) => update((s) => ({ ...s, theory: [...s.theory, r].slice(-30) })),
      setLastLesson: (id) => setState((s) => (s.lastLesson === id ? s : { ...s, lastLesson: id })),
      importState: (obj) => {
        if (!obj || typeof obj !== 'object' || obj.version !== 1) throw new Error('To nie jest plik postępu INF.04.')
        setState({ ...empty(), ...obj, updatedAt: Date.now() })
      },
      reset: () => setState(empty()),
    }),
    [state, update],
  )

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export function useProgress() {
  return useContext(Ctx)
}

/* ---------- Powtórki (system pudełek Leitnera) ----------
   Pudełko 0 = nowa albo zapomniana fiszka. Każde „pamiętam” przesuwa ją
   do kolejnego pudełka, więc wraca coraz rzadziej. „Nie pamiętam” cofa
   ją na początek i fiszka wraca jeszcze w tej samej sesji. */
const DAY = 24 * 60 * 60 * 1000
export const INTERVALS = [0, 1, 3, 7, 14, 30] // dni

export function schedule(card, rating) {
  const box = card?.box ?? 0
  let next
  if (rating === 'again') next = 0
  else if (rating === 'hard') next = Math.max(1, box)
  else next = Math.min(box + 1, INTERVALS.length - 1)
  const due = rating === 'again' ? Date.now() + 60 * 1000 : Date.now() + INTERVALS[next] * DAY
  return { box: next, due, seen: (card?.seen ?? 0) + 1 }
}

export function isDue(card) {
  return !card || card.due <= Date.now()
}

/* ---------- Postęp działów ---------- */
export function lessonScore(status) {
  return status === 'umiem' ? 1 : status === 'cwicze' ? 0.5 : 0
}

export function sectionProgress(section, lessons) {
  const ids = section.lessons.map((l) => l.id)
  if (!ids.length) return { pct: 0, known: 0, practising: 0, total: 0 }
  let sum = 0
  let known = 0
  let practising = 0
  for (const id of ids) {
    const st = lessons[id]
    sum += lessonScore(st)
    if (st === 'umiem') known++
    if (st === 'cwicze') practising++
  }
  return { pct: Math.round((sum / ids.length) * 100), known, practising, total: ids.length }
}

/* ---------- Eksport / import ---------- */
export function downloadJSON(state) {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
  const a = document.createElement('a')
  const d = new Date().toISOString().slice(0, 10)
  a.href = URL.createObjectURL(blob)
  a.download = `inf04-postep-${d}.json`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(a.href), 1000)
}
