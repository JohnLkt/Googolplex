import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Article, Assignment } from '../../interfaces/GrandInterface'
import { format } from 'date-fns'
import { faFolderOpen, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from 'react-router'

function formatDate(date: string) {
  return format(new Date(date), 'MMMM dd, yyyy hh:mm a')
}

interface PostCardProps {
  article?: Article
  assignment?: Assignment
}

const PostCard = ({ article, assignment }: PostCardProps) => {
  const navigate = useNavigate()
  const { classId } = useParams()

  return (
    <div
      className="z-10 cursor-pointer rounded-xl p-4 bg-gradient-to-br from-primary from-40% to-secondary hover:shadow-secondary hover:shadow-lg transition ease-in-out"
      onClick={() => {
        if (article) {
          navigate(`/class-detail/${classId}/article/${article.id}`)
        } else {
          navigate(`/class-detail/${classId}/assignment/${assignment?.id}`)
        }
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
          <div className="text-base font-bold">{article?.title}</div>
          <div
            dangerouslySetInnerHTML={{
              __html: article!.content.toString(),
            }}
            className="text-base"
          ></div>
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
          <div className="text-base font-bold">{assignment?.title}</div>
          <div
            dangerouslySetInnerHTML={{
              __html: assignment!.content.toString(),
            }}
            className="text-base"
          ></div>
          <div className="text-base mt-2">
            <strong>Due Date:</strong>{' '}
            {assignment?.due_date && formatDate(assignment!.due_date)}
          </div>
        </div>
      )}
    </div>
  )
}

export default PostCard
