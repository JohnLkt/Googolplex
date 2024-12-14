import { useNavigate } from 'react-router'
import { Assignment } from '../../interfaces/GrandInterface'
import ActionLightButton from '../atoms/ActionLightButton'
import PostCard from '../molecules/PostCard'

interface AssignmentListProps {
  assignments: Assignment[]
}

export default function AssignmentList({ assignments }: AssignmentListProps) {
  const navigate = useNavigate()
  return (
    <div className="w-full flex flex-col gap-3 p-6">
      <div
        className="w-fit"
        onClick={() => {
          navigate('add/assignment/')
        }}
      >
        <ActionLightButton actionText="Add Assignment" />
      </div>
      {assignments &&
        assignments.map((assignment, i) => (
          <PostCard assignment={assignment} key={i} />
        ))}
    </div>
  )
}
