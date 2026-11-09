import { useRef, useState } from 'react'
import { SECTIONS } from '../data/roadmap'
import { downloadJSON, sectionProgress, useProgress } from '../lib/progress'
import { Button, PageTitle, ProgressBar } from '../components/ui'
import Icon from '../components/Icon'

export default function Progress() {
  const p = useProgress()
  const { state } = p
  const file = useRef(null)
  const [msg, setMsg] = useState(null)

  const onImport = async (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    try {
      const obj = JSON.parse(await f.text())
      if (!confirm('Zastąpić obecny postęp danymi z pliku?')) return
      p.importState(obj)
      setMsg({ ok: true, text: 'Postęp wczytany.' })
    } catch (err) {
      setMsg({ ok: false, text: err.message || 'Nie udało się odczytać pliku.' })
    } finally {
      e.target.value = ''
    }
  }

  const tasksDone = Object.values(state.tasks).filter(Boolean).length
  const cardsSeen = Object.keys(state.cards).length

  return (
    <div className="space-y-8">
      <PageTitle eyebrow="Twoje dane" title="Postęp i kopia zapasowa">
        Postęp zapisuje się w tej przeglądarce. Zrób kopię do pliku raz w tygodniu albo przed zmianą telefonu, a potem wczytaj ją na innym urządzeniu.
      </PageTitle>

      <section className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-2xl border border-line bg-surface p-3">
          <div className="font-mono text-2xl font-bold">{tasksDone}</div>
          <div className="text-xs text-muted">zadań zrobionych</div>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-3">
          <div className="font-mono text-2xl font-bold">{cardsSeen}</div>
          <div className="text-xs text-muted">fiszek w powtórkach</div>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-3">
          <div className="font-mono text-2xl font-bold">{state.theory.length}</div>
          <div className="text-xs text-muted">testów teorii</div>
        </div>
      </section>

      <section className="space-y-3">
        {SECTIONS.map((s) => {
          const sp = sectionProgress(s, state.lessons)
          return (
            <div key={s.id}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-semibold">
                  {s.num}. {s.title}
                </span>
                <span className="font-mono text-muted">{sp.pct}%</span>
              </div>
              <ProgressBar pct={sp.pct} tone={sp.pct === 100 ? 'good' : 'accent'} />
            </div>
          )
        })}
      </section>

      <section className="grid gap-2 sm:grid-cols-2">
        <Button onClick={() => downloadJSON(state)}>
          <Icon name="download" /> Pobierz kopię (JSON)
        </Button>
        <Button variant="ghost" onClick={() => file.current?.click()}>
          <Icon name="upload" /> Wczytaj z pliku
        </Button>
        <input ref={file} type="file" accept="application/json,.json" className="hidden" onChange={onImport} />
      </section>
      {msg && <p className={`rounded-xl px-3 py-2 ${msg.ok ? 'bg-good-soft' : 'bg-bad-soft'}`}>{msg.text}</p>}
      {state.updatedAt && <p className="text-sm text-muted">Ostatnia zmiana: {new Date(state.updatedAt).toLocaleString('pl-PL')}</p>}

      <section className="border-t border-line pt-6">
        <Button
          variant="ghost"
          className="text-bad"
          onClick={() => {
            if (confirm('Na pewno usunąć cały postęp? Najpierw pobierz kopię.')) p.reset()
          }}
        >
          Wyczyść cały postęp
        </Button>
      </section>
    </div>
  )
}
