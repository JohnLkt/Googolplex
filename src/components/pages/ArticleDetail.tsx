import { useNavigate, useParams } from 'react-router'
import { useAuthContext } from '../../contexts/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCheckSquare,
  faBars,
  faGraduationCap,
  faHome,
  faPeopleGroup,
  faPlus,
  faHomeAlt,
  faTasks,
  faArrowLeft,
  faMinus,
} from '@fortawesome/free-solid-svg-icons'
import { useQueryFetchArticleById } from '../../api/queries/Article'
import { useQueryClassByClassId } from '../../api/queries/Class'
import { SubmitHandler, useForm } from 'react-hook-form'

library.add(
  faCheckSquare,
  faBars,
  faGraduationCap,
  faHome,
  faPeopleGroup,
  faPlus,
  faHomeAlt,
  faTasks,
  faArrowLeft,
  faMinus
)

interface FormSubmitComment {
  comment: string
}

const ArticleDetail = () => {
  const { authState } = useAuthContext()
  const { classId, articleId } = useParams()
  const navigate = useNavigate()
  // call useQueryArticleById here
  const { data: classData } = useQueryClassByClassId(
    authState.accessToken,
    classId,
    { enabled: !!authState.accessToken && !!classId }
  )
  const { data: article, isLoading } = useQueryFetchArticleById(
    authState.accessToken,
    articleId!
  )

  // useform, form submit comments
  const { register, handleSubmit } = useForm<FormSubmitComment>()

  const submitComment: SubmitHandler<FormSubmitComment> = (data) => {
    console.log('data comment: ', data.comment)
    console.log('user id: ', authState.userId)
    // console.log('post id: ', article?.data.post.id)
    // butuh koneksi ke post dari article buat dapet post_id
  }

  return (
    <div className="w-full min-h-screen bg-primary overflow-hidden">
      <div className="flex flex-col h-full space-y-3">
        <div className="flex gap-3 bg-primary p-6 border-b-2 border-accent sticky top-0 z-30">
          <div className="flex-1 flex flex-row space-x-4 items-center">
            <button onClick={() => navigate(`/class-detail/${classId}`)}>
              <FontAwesomeIcon
                icon="arrow-left"
                className="text-accent text-xl"
              />
            </button>
            <div
              onClick={() => navigate('/dashboard')}
              className="font-plusJakarta font-bold text-2xl text-accent"
            >
              Googolplex
            </div>
            <FontAwesomeIcon
              className="text-2xl text-accent font-bold max-mobile:hidden max-tablet:hidden"
              icon="minus"
            />
            <div className="font-plusJakarta text-2xl text-accent font-medium max-mobile:hidden max-tablet:hidden">
              {classData?.data.subject}
            </div>
            <FontAwesomeIcon
              className="text-2xl text-accent font-bold max-mobile:hidden max-tablet:hidden"
              icon="minus"
            />
            <div className="font-plusJakarta text-2xl text-accent font-medium max-mobile:hidden max-tablet:hidden">
              {!isLoading && article?.data.title}
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-3 justify-center items-center font-plusJakarta px-3">
          <div className="w-1/2 max-mobile:w-full p-4 border-2 border-accent overflow-y-auto bg-primary z-10">
            <div className="flex flex-col gap-4">
              <div className="text-2xl font-bold text-accent">
                {isLoading ? 'Loading..' : article?.data.title}
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: isLoading
                    ? 'Loading'
                    : article!.data.content.toString(),
                }}
                className="text-base font-normal text-accent"
              ></div>
            </div>
          </div>
          <div className="text-accent bg-primary z-10 text-base font-medium w-1/2 max-mobile:w-full p-4 border-2 border-accent">
            <form
              onSubmit={handleSubmit(submitComment)}
              className="flex flex-col space-y-4"
            >
              <div className="font-medium text-accent">Add comment(s)</div>

              <div className="flex flex-row space-x-3">
                <input
                  {...register('comment')}
                  className="p-3 text-sm text-primary w-4/5"
                  type="text"
                  placeholder="Add comment here"
                />
                <button
                  type="submit"
                  className="p-3 w-1/5 border-2 border-accent"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
          <CommentCard author="Mike" comment="Waduh pak" />
          <CommentCard author="John" comment="Mank bole pak?" />
          <CommentCard author="Johe" comment="Skip dulu deh pak" />
        </div>
      </div>
    </div>
  )
}

interface CommentCardProps {
  author: string
  comment: string
}
const CommentCard = ({ ...commentProp }: CommentCardProps) => {
  return (
    <div className="text-accent bg-primary z-10 text-base font-medium w-1/2 max-mobile:w-full p-4 border-2 border-accent">
      <div className="flex flex-col space-y-3">
        <div className="text-base text-accent font-bold">
          {commentProp.author}
        </div>
        <div className="text-base text-accent font-normal">
          {commentProp.comment}
        </div>
      </div>
    </div>
  )
}

export default ArticleDetail
