import { Link } from 'react-router-dom'
import { EXTRA } from '../components/Layout'
import Icon from '../components/Icon'
import { PageTitle } from '../components/ui'

export default function More() {
  return (
    <div>
      <PageTitle title="Więcej" />
      <div className="grid gap-2">
        {EXTRA.map((n) => (
          <Link key={n.to} to={n.to} className="flex min-h-14 items-center gap-3 rounded-2xl border border-line bg-surface px-4 font-semibold shadow-[var(--shadow)] hover:border-accent">
            <Icon name={n.icon} size={22} className="text-accent" />
            <span className="flex-1">{n.label}</span>
            <Icon name="next" className="text-muted" />
          </Link>
        ))}
      </div>
    </div>
  )
}
