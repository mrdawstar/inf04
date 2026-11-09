import { useRef, useState } from 'react'
import { SECTIONS } from '../data/roadmap'
import { downloadJSON, sectionProgress, useProgress } from '../lib/progress'
import { Button, ConfirmButton, PageTitle, ProgressBar } from '../components/ui'
import { copyText } from '../components/mdx'
import Icon from '../components/Icon'

export default function Progress() {
  const p = useProgress()
  const { state } = p
  const file = useRef(null)
  const [msg, setMsg] = useState(null)
  const [pasted, setPasted] = useState('')

  const load = (text) => {
    try {
      p.importState(JSON.parse(text))
      setMsg({ ok: true, text: 'Postęp wczytany.' })
      setPasted('')
    } catch (err) {
      setMsg({ ok: false, text: err instanceof SyntaxError ? 'To nie jest poprawny plik JSON.' : err.message })
    }
  }

  const onImport = async (e) => {
    const f = e.target.files?.[0]
    if (f) load(await f.text())
    e.target.value = ''
  }

  const tasksDone = Object.values(state.tasks).filter(Boolean).length
  const cardsSeen = Object.keys(state.cards).length

  return (
    <div className="space-y-8">
      <PageTitle eyebrow="Twoje dane" title="Postęp i kopia zapasowa">
        Postęp zapisuje się w tej przeglądarce. Zrób kopię raz w tygodniu albo przed zmianą telefonu, a potem wczytaj ją na innym urządzeniu.
      </PageTitle>

      <section className="grid grid-cols-3 gap-2 text-center">
        {[
          [tasksDone, 'zadań zrobionych'],
          [cardsSeen, 'fiszek w powtórkach'],
          [state.theory.length, 'testów teorii'],
        ].map(([n, label]) => (
          <div key={label} className="rounded-2xl border border-line bg-surface p-3">
            <div className="font-mono text-2xl font-bold tabular-nums">{n}</div>
            <div className="text-xs text-muted">{label}</div>
          </div>
        ))}
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

      <section className="space-y-3">
        <h2 className="text-xl font-extrabold">Kopia w pliku</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          <Button onClick={() => downloadJSON(state)}>
            <Icon name="download" /> Pobierz kopię (JSON)
          </Button>
          <Button variant="ghost" onClick={() => file.current?.click()}>
            <Icon name="upload" /> Wczytaj z pliku
          </Button>
          <input ref={file} type="file" accept="application/json,.json" className="hidden" onChange={onImport} />
        </div>
        <p className="text-sm text-muted">Wczytanie zastępuje obecny postęp na tym urządzeniu.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-extrabold">Kopia jako tekst</h2>
        <p className="text-sm text-muted">Gdy pobieranie plików nie działa (np. w niektórych przeglądarkach na telefonie): skopiuj kopię i wklej ją sobie w notatki albo wiadomość.</p>
        <Button
          variant="ghost"
          className="w-full"
          onClick={async () => setMsg((await copyText(JSON.stringify(state))) ? { ok: true, text: 'Skopiowano. Wklej to w bezpieczne miejsce.' } : { ok: false, text: 'Nie udało się skopiować.' })}
        >
          <Icon name="copy" /> Skopiuj kopię do schowka
        </Button>
        <label htmlFor="wklej-kopie" className="block text-sm font-semibold">
          Wklej kopię, żeby ją wczytać
        </label>
        <textarea
          id="wklej-kopie"
          value={pasted}
          onChange={(e) => setPasted(e.target.value)}
          rows={3}
          placeholder='{"version":1, ...}'
          className="w-full rounded-xl border border-line bg-surface p-3 font-mono text-sm"
        />
        <Button variant="ghost" disabled={!pasted.trim()} onClick={() => load(pasted)} className="w-full">
          Wczytaj wklejony tekst
        </Button>
      </section>

      {msg && <p className={`rounded-xl px-3 py-2 ${msg.ok ? 'bg-good-soft' : 'bg-bad-soft'}`}>{msg.text}</p>}
      {state.updatedAt && <p className="text-sm text-muted">Ostatnia zmiana: {new Date(state.updatedAt).toLocaleString('pl-PL')}</p>}

      <section className="border-t border-line pt-6">
        <ConfirmButton onConfirm={() => p.reset()} confirmText="Na pewno usunąć wszystko?">
          Wyczyść cały postęp
        </ConfirmButton>
      </section>
    </div>
  )
}
