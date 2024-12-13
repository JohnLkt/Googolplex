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
import { useQueryClassByClassId } from '../../api/queries/Class'
import { useQueryFetchAssignmentById } from '../../api/queries/Assignment'
import { format } from 'date-fns'

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
  if (isLoading) return <></>
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
              {assignment?.data.title}
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-3 justify-center items-center font-plusJakarta px-3">
          <div className="w-1/2 max-mobile:w-full p-4 border-2 border-accent overflow-y-auto bg-primary z-10">
            <div className="flex flex-col gap-4">
              <div className="text-2xl font-bold text-accent">
                {assignment?.data.title}
              </div>
              {/* <div className="text-base font-bold text-accent">
                {formatDate(assignment!.data!.due_date)}
              </div> */}
              <div
                dangerouslySetInnerHTML={{ __html: assignment!.data?.content }}
                className="text-base font-normal text-accent"
              ></div>
            </div>
          </div>
          <div
            onClick={() => {}}
            className="cursor-pointer text-accent bg-primary z-10 text-base font-medium w-1/2 max-mobile:w-full p-4 border-2 border-accent"
          >
            <div>Download Assignment File</div>
          </div>
          <div className="text-accent bg-primary z-10 text-base font-medium w-1/2 max-mobile:w-full p-4 border-2 border-accent">
            <div>Add Comment</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssignmentDetail
