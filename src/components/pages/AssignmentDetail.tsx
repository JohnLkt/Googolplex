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
  faDownload,
  faFileUpload,
} from '@fortawesome/free-solid-svg-icons'
import { useQueryClassByClassId } from '../../api/queries/Class'
import { useQueryFetchAssignmentById } from '../../api/queries/Assignment'
import { FormSubmitComment } from './ArticleDetail'
import { ReusableToast } from '../organisms/ReusableToast'
import {
  useQueryFetchCommentsByPostId,
  useSubmitComment,
} from '../../api/queries/Comment'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CommentCard } from '../organisms/CommentCard'

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
  faMinus,
  faDownload,
  faFileUpload
)

const AssignmentDetail = () => {
  const { authState } = useAuthContext()
  const { classId, assignmentId } = useParams()
  const navigate = useNavigate()
  // call useQueryArticleById here
  const { data: classData } = useQueryClassByClassId(
    authState.accessToken,
    classId,
    { enabled: !!authState.accessToken && !!classId }
  )
  const { data: assignment, isLoading } = useQueryFetchAssignmentById(
    authState.accessToken,
    assignmentId!
  )

  // useform, form submit comments
  const { register, handleSubmit } = useForm<FormSubmitComment>()
  const { mutate: createComment } = useSubmitComment(authState.accessToken)
  const {
    data: comments,
    isLoading: commentLoading,
    refetch: refetchComments,
  } = useQueryFetchCommentsByPostId(
    authState.accessToken,
    assignment?.data?.post.id
  )
  const submitComment: SubmitHandler<FormSubmitComment> = (data) => {
    console.log('data comment: ', data.comment)
    console.log('user id: ', authState.userId)
    console.log('post id: ', assignment?.data.post.id)

    // assignment's post id belom ada
    if (!assignment) {
      return
    }
    createComment(
      {
        userId: authState.userId!.toString(),
        postId: assignment.data.post.id.toString(),
        comment: data.comment,
      },
      {
        onSuccess: (response) => {
          const msg = response.data.message
          console.log(msg)
          ReusableToast('Successful commenting')
          refetchComments()
          data.comment = ''
        },
        onError: (err) => {
          console.log('error commenting', err)
        },
      }
    )
  }
  return (
    <div className="w-full min-h-screen bg-primary overflow-hidden">
      <div className="flex flex-col h-full space-y-3">
        <div className="flex gap-3 bg-primary p-6 border-b-2 border-accent sticky top-0 z-30">
          <div className="flex-1 flex flex-row space-x-4 items-center ">
            <button onClick={() => navigate(`/class-detail/${classId}`)}>
              <FontAwesomeIcon
                icon="arrow-left"
                className="text-accent text-xl"
              />
            </button>
            <div
              onClick={() => navigate('/dashboard')}
              className="font-plusJakarta line-clamp-1 text-ellipsis max-mobile:text-lg font-bold text-2xl text-accent"
            >
              Googolplex
            </div>
            <FontAwesomeIcon
              className="text-2xl text-accent font-bold max-tablet:hidden max-mobile:hidden"
              icon="minus"
            />
            <div className="font-plusJakarta text-2xl text-accent font-medium max-tablet:hidden max-mobile:hidden">
              {classData?.data.subject}
            </div>
            <FontAwesomeIcon
              className="text-2xl text-accent font-bold max-mobile:hidden max-tablet:hidden"
              icon="minus"
            />
            <div className="font-plusJakarta text-2xl text-accent font-medium max-mobile:hidden max-tablet:hidden">
              {isLoading ? 'Loading..' : assignment?.data.title}
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-3 justify-center items-center font-plusJakarta px-3">
          <div className="w-1/2 max-mobile:w-full p-4 border-2 border-accent overflow-y-auto bg-primary z-10">
            <div className="flex flex-col gap-4">
              <div className="text-2xl font-bold text-accent">
                {isLoading ? 'Loading..' : assignment?.data.title}
              </div>
              {/* <div className="text-base font-bold text-accent">
                {formatDate(assignment!.data!.due_date)}
              </div> */}
              <div
                dangerouslySetInnerHTML={{
                  __html: isLoading ? 'Loading..' : assignment!.data?.content,
                }}
                className="text-base font-normal text-accent"
              ></div>
            </div>
          </div>
          {assignment && assignment.data && assignment.data.assignment_file && (
            <div
              onClick={() => {
                window.open(
                  `https://ecos.joheee.com/googolplex${assignment?.data.assignment_file?.path}`
                )
              }}
              className="flex items-center cursor-pointer text-accent bg-primary z-10 text-base font-medium w-1/2 max-mobile:w-full p-4 border-2 border-accent"
            >
              <div className="flex-1">Download Assignment File </div>
              <FontAwesomeIcon
                icon="download"
                className="flex-none text-accent text-xl"
              />
            </div>
          )}
          <div
            onClick={() => {}}
            className="flex items-center cursor-pointer text-accent bg-primary z-10 text-base font-medium w-1/2 max-mobile:w-full p-4 border-2 border-accent"
          >
            <div className="flex-1">Upload your answer here</div>
            <FontAwesomeIcon
              icon="file-upload"
              className="flex-none text-accent text-xl"
            />
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
          {commentLoading ? (
            <div>Loading...</div>
          ) : (
            comments &&
            comments.data.map((comment, i) => (
              <CommentCard
                key={i}
                author={comment.user.name}
                comment={comment.comment}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default AssignmentDetail
