import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Icon from './Icon'
import { SECTIONS } from '../data/roadmap'
import { sectionProgress, useProgress } from '../lib/progress'

function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('inf04-theme', next ? 'dark' : 'light')
    } catch {
      /* bez zapisu */
    }
  }
  return [dark, toggle]
}

const NAV = [
  { to: '/', label: 'Nauka', icon: 'home', end: true },
  { to: '/fiszki', label: 'Fiszki', icon: 'cards' },
  { to: '/5-minut', label: '5 minut', icon: 'bolt' },
  { to: '/egzamin', label: 'Egzamin', icon: 'exam' },
  { to: '/wiecej', label: 'Więcej', icon: 'more' },
]

const EXTRA = [
  { to: '/sciagi', label: 'Ściągi', icon: 'sheet' },
  { to: '/test', label: 'Test teoretyczny', icon: 'list' },
  { to: '/postep', label: 'Postęp i kopia', icon: 'download' },
  { to: '/o-egzaminie', label: 'O egzaminie', icon: 'book' },
]

export default function Layout() {
  const [dark, toggleTheme] = useTheme()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { state } = useProgress()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[272px_minmax(0,1fr)]">
      {/* Panel boczny na dużych ekranach */}
      <aside className="sticky top-0 hidden h-dvh overflow-y-auto border-r border-line bg-surface px-3 py-5 lg:block">
        <Link to="/" className="mb-5 flex items-center gap-2 px-2 text-lg font-extrabold">
          <span className="grid size-8 place-items-center rounded-lg bg-accent font-mono text-sm text-accent-ink">04</span>
          INF.04 krok po kroku
        </Link>
        <nav className="space-y-0.5">
          {[...NAV.filter((n) => n.to !== '/wiecej'), ...EXTRA].map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `flex min-h-10 items-center gap-3 rounded-xl px-3 font-semibold ${isActive ? 'bg-accent-soft text-accent' : 'text-ink hover:bg-surface-2'}`
              }
            >
              <Icon name={n.icon} size={19} />
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="mb-2 mt-6 px-3 text-xs font-bold uppercase tracking-wider text-muted">Działy</div>
        <nav className="space-y-0.5">
          {SECTIONS.map((s) => {
            const p = sectionProgress(s, state.lessons)
            return (
              <NavLink
                key={s.id}
                to={`/dzial/${s.id}`}
                className={({ isActive }) => `flex min-h-10 items-center gap-2 rounded-xl px-3 text-[0.95rem] ${isActive ? 'bg-surface-2 font-semibold' : 'hover:bg-surface-2'}`}
              >
                <span className="w-4 font-mono text-xs text-muted">{s.num}</span>
                <span className="flex-1 truncate">{s.short}</span>
                <span className="font-mono text-xs text-muted">{p.pct}%</span>
              </NavLink>
            )
          })}
        </nav>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-20 border-b border-line bg-bg/85 backdrop-blur-md" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
          <div className="mx-auto flex h-14 max-w-3xl items-center gap-2 px-4">
            {pathname !== '/' ? (
              <button type="button" onClick={() => (window.history.state?.idx > 0 ? navigate(-1) : navigate('/'))} className="-ml-2 grid size-11 place-items-center rounded-xl hover:bg-surface-2 lg:hidden" aria-label="Wstecz">
                <Icon name="back" size={22} />
              </button>
            ) : null}
            <Link to="/" className="flex items-center gap-2 font-extrabold lg:hidden">
              <span className="grid size-7 place-items-center rounded-lg bg-accent font-mono text-xs text-accent-ink">04</span>
              INF.04
            </Link>
            <div className="flex-1" />
            <Link to="/szukaj" className="grid size-11 place-items-center rounded-xl hover:bg-surface-2" aria-label="Szukaj">
              <Icon name="search" size={22} />
            </Link>
            <button type="button" onClick={toggleTheme} className="grid size-11 place-items-center rounded-xl hover:bg-surface-2" aria-label={dark ? 'Jasny motyw' : 'Ciemny motyw'}>
              <Icon name={dark ? 'sun' : 'moon'} size={22} />
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-3xl px-4 pb-32 pt-6 lg:pb-20">
          <Outlet />
        </main>
      </div>

      {/* Dolny pasek na telefonie */}
      <nav className="pb-safe fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 backdrop-blur-md lg:hidden" aria-label="Główna nawigacja">
        <div className="mx-auto grid max-w-xl grid-cols-5">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) => `flex min-h-16 flex-col items-center justify-center gap-0.5 text-[0.72rem] font-semibold ${isActive ? 'text-accent' : 'text-muted'}`}
            >
              <Icon name={n.icon} size={23} />
              {n.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}

export { EXTRA }
