import { useNavigate } from 'react-router'
import { Assignment } from '../../interfaces/GrandInterface'
import ActionLightButton from '../atoms/ActionLightButton'
import PostCard from '../molecules/PostCard'
import AuthTeacherWrapper from '../molecules/AuthTeacherWrapper'

interface AssignmentListProps {
  assignments: Assignment[]
}

export default function AssignmentList({ assignments }: AssignmentListProps) {
  const navigate = useNavigate()
  return (
    <div className="w-full flex flex-col gap-3 p-6">
      <AuthTeacherWrapper>
        <div
          className="w-fit"
          onClick={() => {
            navigate('add/assignment/')
          }}
        >
          <ActionLightButton actionText="Add Assignment" />
        </div>
      </AuthTeacherWrapper>
      {assignments &&
        assignments.map((assignment, i) => (
          <PostCard assignment={assignment} key={i} />
        ))}
    </div>
  )
}
