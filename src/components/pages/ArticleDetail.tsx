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
  if (isLoading) return <div className="bg-primary"></div>
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
              className="text-2xl text-accent font-bold max-mobile:hidden"
              icon="minus"
            />
            <div className="font-plusJakarta text-2xl text-accent font-medium max-mobile:hidden">
              {classData?.data.subject}
            </div>
            <FontAwesomeIcon
              className="text-2xl text-accent font-bold max-mobile:hidden"
              icon="minus"
            />
            <div className="font-plusJakarta text-2xl text-accent font-medium max-mobile:hidden">
              {article?.data.title}
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-3 justify-center items-center font-plusJakarta px-3">
          <div className="w-1/2 max-mobile:w-full p-4 border-2 border-accent overflow-y-auto bg-primary z-10">
            <div className="flex flex-col gap-4">
              <div className="text-2xl font-bold text-accent">
                {article?.data.title}
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: article!.data.content.toString(),
                }}
                className="text-base font-normal text-accent"
              ></div>
            </div>
          </div>
          <div className="text-accent bg-primary z-10 text-base font-medium w-1/2 max-mobile:w-full p-4 border-2 border-accent">
            <div>Add Comment</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleDetail
