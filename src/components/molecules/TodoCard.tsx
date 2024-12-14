import { UserAssignmentTodo } from '../../interfaces/GrandInterface'

const TodoCard = (prop: UserAssignmentTodo) => {
  console.log(prop.id, prop.assignment)

  return (
    <div className="grid gap-3 items-center z-10 cursor-pointer rounded-xl p-4 bg-gradient-to-br from-primary from-40% to-secondary hover:shadow-secondary hover:shadow-lg transition ease-in-out">
      <div className="">{prop.assignment.title}</div>
      <div className="">{prop.id}</div>
    </div>
  )
}

export default TodoCard
