import { Post } from '../../interfaces/GrandInterface'
import { format } from 'date-fns'

function formatDate(date: string) {
  return format(new Date(date), 'MMMM dd, yyyy hh:mm a')
}

const PostCard = (prop: Post) => {
  const { article, assignment } = prop

  return (
    <div className="z-10 cursor-pointer rounded-xl p-4 bg-gradient-to-br from-primary from-40% to-secondary hover:shadow-secondary hover:shadow-lg hover:scale-95 transition ease-in-out">
      {article && (
        <div className="mb-4">
          <h2 className="text-lg font-bold">{article.title}</h2>
          <p className="text-sm text-accent">{article.content}</p>
        </div>
      )}
      {assignment && (
        <div>
          <h2 className="text-lg font-bold">{assignment.title}</h2>
          <p className="text-sm text-accent">{assignment.content}</p>
          {assignment.due_date && (
            <p className="text-sm text-accent mt-2">
              <strong>Due Date:</strong> {formatDate(assignment.due_date)}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default PostCard
