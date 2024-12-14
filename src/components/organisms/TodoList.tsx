import { useFetchManyTodoByUserId } from '../../api/queries/UserAssignmentTodo'
import TodoCard from '../molecules/TodoCard'

const TodoList = () => {
  const { todo, isLoading } = useFetchManyTodoByUserId()

  if (isLoading) return <div className="text-3xl text-white">Loading...</div>
  console.log(todo?.data[0])

  return (
    <div className="flex flex-col gap-3 p-6 text-accent">
      {todo?.data.map((item, i) => <TodoCard key={i} {...item} />)}
    </div>
  )
}

export default TodoList
