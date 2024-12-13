import { useParams } from 'react-router'
import ParticlesBackground from '../molecules/Particles'

export default function AssignmentDetail() {
  const { assignmentId } = useParams()

  return (
    <div className="w-full min-h-screen bg-primary">
      <div className="text-2xl font-plusJakarta text-accent">
        {assignmentId}
      </div>
      <ParticlesBackground />
    </div>
  )
}
