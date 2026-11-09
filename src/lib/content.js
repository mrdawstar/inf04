// Rejestr treści. Dane lekcji (meta, quiz, fiszki) ładują się od razu,
// a sama treść MDX dopiero po wejściu w lekcję, żeby strona startowała szybko.
import { ALL_LESSONS, lessonById } from '../data/roadmap'

const dataModules = import.meta.glob('../content/lessons/**/*.data.js', { eager: true })
const mdxLoaders = import.meta.glob('../content/lessons/**/*.mdx')
const sheetMeta = import.meta.glob('../content/sciagi/*.data.js', { eager: true })
const sheetLoaders = import.meta.glob('../content/sciagi/*.mdx')

function stem(path) {
  return path.replace(/\.data\.js$|\.mdx$/, '')
}

/** id lekcji -> { meta, quiz, flashcards, load } */
export const LESSONS = {}
for (const [path, mod] of Object.entries(dataModules)) {
  const loader = mdxLoaders[stem(path) + '.mdx']
  if (!mod.meta?.id || !loader) continue
  LESSONS[mod.meta.id] = {
    ...lessonById[mod.meta.id],
    meta: mod.meta,
    quiz: mod.quiz || [],
    flashcards: (mod.flashcards || []).map((c, i) => ({ ...c, id: `${mod.meta.id}#${i}`, lesson: mod.meta.id })),
    load: loader,
  }
}

export function isReady(id) {
  return Boolean(LESSONS[id])
}

/** Następna i poprzednia lekcja w kolejności roadmapy (tylko gotowe). */
export function neighbours(id) {
  const ready = ALL_LESSONS.filter((l) => LESSONS[l.id])
  const i = ready.findIndex((l) => l.id === id)
  return { prev: ready[i - 1] || null, next: ready[i + 1] || null }
}

export const ALL_FLASHCARDS = Object.values(LESSONS).flatMap((l) => l.flashcards)

export const ALL_QUIZ = Object.values(LESSONS).flatMap((l) =>
  l.quiz.map((q, i) => ({ ...q, id: `${l.meta.id}#q${i}`, lesson: l.meta.id })),
)

export const SHEETS = Object.entries(sheetMeta)
  .map(([path, mod]) => ({ ...mod.meta, load: sheetLoaders[stem(path) + '.mdx'] }))
  .filter((s) => s.id && s.load)
  .sort((a, b) => a.order - b.order)

/** Surowy tekst wszystkich plików MDX: ładowany tylko przez wyszukiwarkę. */
const rawLoaders = import.meta.glob(['../content/lessons/**/*.mdx', '../content/sciagi/*.mdx'], {
  query: '?raw',
  import: 'default',
})

export async function loadSearchIndex() {
  const entries = await Promise.all(
    Object.entries(rawLoaders).map(async ([path, load]) => {
      const raw = await load()
      const base = stem(path)
      const isSheet = path.includes('/sciagi/')
      const data = isSheet ? sheetMeta[base + '.data.js'] : dataModules[base + '.data.js']
      const meta = data?.meta
      if (!meta) return null
      const title = isSheet ? meta.title : lessonById[meta.id]?.title
      return {
        kind: isSheet ? 'sciaga' : 'lekcja',
        id: meta.id,
        title,
        summary: meta.summary || '',
        keywords: (meta.keywords || []).join(' '),
        text: toPlain(raw),
        href: isSheet ? `/sciagi/${meta.id}` : `/lekcja/${meta.id}`,
      }
    }),
  )
  return entries.filter(Boolean)
}

function toPlain(src) {
  return src
    .replace(/<\/?[A-Z][^>]*>/g, ' ')
    .replace(/[#*`>|_]/g, ' ')
    .replace(/\s+/g, ' ')
}
