import { useParams } from 'react-router-dom'
import { sectionById } from '../data/roadmap'
import { RoadmapSection } from './Home'
import { PageTitle } from '../components/ui'

export default function Section() {
  const { id } = useParams()
  const s = sectionById[id]
  if (!s) return <p>Nie ma takiego działu.</p>
  return (
    <div>
      <PageTitle eyebrow={`Dział ${s.num}`} title={s.title} />
      <RoadmapSection section={s} open />
    </div>
  )
}
