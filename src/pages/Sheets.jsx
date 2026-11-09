import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'
import { SHEETS } from '../lib/content'
import { mdxComponents } from '../components/mdx'
import { PageTitle } from '../components/ui'
import Icon from '../components/Icon'
import { Toc, useMdx, useToc } from './Lesson'

export function SheetList() {
  return (
    <div>
      <PageTitle eyebrow="Na szybko" title="Ściągi">
        Wszystko, co trzeba mieć w głowie przed egzaminem, na jednym ekranie. Kod da się skopiować.
      </PageTitle>
      <div className="grid gap-3">
        {SHEETS.map((s) => (
          <Link key={s.id} to={`/sciagi/${s.id}`} className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow)] hover:border-accent">
            <Icon name="sheet" size={24} className="text-accent" />
            <span className="flex-1">
              <span className="block font-bold">{s.title}</span>
              <span className="text-sm text-muted">{s.summary}</span>
            </span>
            <Icon name="next" className="text-muted" />
          </Link>
        ))}
      </div>
    </div>
  )
}

export function SheetView() {
  const { id } = useParams()
  const sheet = SHEETS.find((s) => s.id === id)
  const Content = useMdx(sheet?.load)
  const ref = useRef(null)
  const toc = useToc(ref, [Content])
  if (!sheet) return <p>Nie ma takiej ściągi.</p>
  return (
    <div>
      <PageTitle eyebrow="Ściąga" title={sheet.title}>
        {sheet.summary}
      </PageTitle>
      <Toc toc={toc} />
      <div ref={ref} className="prose-lesson">
        {Content && (
          <MDXProvider components={mdxComponents}>
            <Content />
          </MDXProvider>
        )}
      </div>
    </div>
  )
}
