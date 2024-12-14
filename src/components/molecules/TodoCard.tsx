import { format } from 'date-fns'
import { UserAssignmentTodo } from '../../interfaces/GrandInterface'
import { useNavigate } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'

function formatDate(date: string) {
  return format(new Date(date), 'MMMM dd, yyyy hh:mm a')
}

const TodoCard = (prop: UserAssignmentTodo) => {
  const navigate = useNavigate()

  function handleAssignmentDetail() {
    navigate(
      `/class-detail/${prop.assignment.post.class.id}/assignment/${prop.assignment_id}`
    )
  }

  return (
    <div
      onClick={handleAssignmentDetail}
      className={`grid gap-3 items-center z-10 cursor-pointer rounded-xl p-4 bg-gradient-to-br ${
        prop.is_finish
          ? 'from-gray-500 to-gray-700'
          : 'from-primary from-40% to-secondary'
      } hover:shadow-secondary hover:shadow-lg transition ease-in-out`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faList}
            className="text-secondary text-xl animate-bounce"
          />
          <div className="text-lg font-bold text-white">
            {prop.assignment.post.class.subject}
          </div>
        </div>
      </div>
      <div className="grid gap-1">
        <div className="text-base font-bold">{prop.assignment?.title}</div>
        <div
          dangerouslySetInnerHTML={{
            __html: prop.assignment!.content.toString(),
          }}
          className="text-base"
        ></div>
        <div
          className={`px-2 py-1 text-sm font-bold rounded w-fit ${
            prop.is_finish ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}
        >
          {prop.is_finish ? 'Finished' : 'Pending'}
        </div>
      </div>
      <div className="text-base mt-2">
        <strong>Due Date:</strong>{' '}
        {prop.assignment?.due_date && formatDate(prop.assignment!.due_date)}
      </div>
    </div>
  )
}

export default TodoCard
