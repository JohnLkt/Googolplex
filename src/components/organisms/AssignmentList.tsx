import { Assignment } from '../../interfaces/GrandInterface'
import PostCard from '../molecules/PostCard'

interface AssignmentListProps {
  assignments: Assignment[]
}

export default function AssignmentList({ assignments }: AssignmentListProps) {
  return (
    <div className="w-full flex flex-col gap-3 p-6">
      {assignments &&
        assignments.map((assignment, i) => (
          <PostCard assignment={assignment} key={i} />
        ))}
    </div>
  )
}
