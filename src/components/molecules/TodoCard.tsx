import { format } from 'date-fns'
import { UserAssignmentTodo } from '../../interfaces/GrandInterface'

function formatDate(date: string) {
  return format(new Date(date), 'MMMM dd, yyyy hh:mm a')
}
const TodoCard = (prop: UserAssignmentTodo) => {
  console.log(prop.assignment)

  return (
    <div className="grid gap-3 items-center z-10 cursor-pointer rounded-xl p-4 bg-gradient-to-br from-primary from-40% to-secondary hover:shadow-secondary hover:shadow-lg transition ease-in-out">
      <div className="">{prop.assignment.title}</div>
      <div
        dangerouslySetInnerHTML={{
          __html: prop.assignment!.content.toString(),
        }}
        className="text-base"
      ></div>
      <div className="">Due date: {formatDate(prop.assignment.due_date)}</div>
    </div>
  )
}

export default TodoCard
