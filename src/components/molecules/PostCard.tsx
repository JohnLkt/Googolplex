import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Post } from '../../interfaces/GrandInterface'
import { format } from 'date-fns'
import { faFolderOpen, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router'

function formatDate(date: string) {
  return format(new Date(date), 'MMMM dd, yyyy hh:mm a')
}

const PostCard = (prop: Post) => {
  const { article, assignment } = prop
  const navigate = useNavigate()

  return (
    <div
      className="z-10 cursor-pointer rounded-xl p-4 bg-gradient-to-br from-primary from-40% to-secondary hover:shadow-secondary hover:shadow-lg hover:scale-95 transition ease-in-out"
      onClick={() => {
        navigate(
          `/class-detail/${prop.class_id}/post/${prop.article_id || prop.assignment_id}`
        )
      }}
    >
      {article ? (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <FontAwesomeIcon
              icon={faFolderOpen}
              className="text-secondary text-xl animate-bounce"
            />
            <div className="text-lg font-bold text-white">Article</div>
          </div>
          <div className="text-sm">{article?.title}</div>
          <div className="text-sm">{article?.content}</div>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <FontAwesomeIcon
              icon={faNewspaper}
              className="text-secondary text-xl animate-bounce"
            />
            <div className="text-lg font-bold text-white">Assignment</div>
          </div>
          <div className="text-sm">{assignment?.title}</div>
          <div className="text-sm">{assignment?.content}</div>
          <div className="text-sm mt-2">
            <strong>Due Date:</strong>{' '}
            {assignment?.due_date && formatDate(assignment!.due_date)}
          </div>
        </div>
      )}
    </div>
  )
}

export default PostCard
