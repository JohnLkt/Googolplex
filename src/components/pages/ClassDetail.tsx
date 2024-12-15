import { useNavigate, useParams } from 'react-router'
import { useState } from 'react'
import { useSidebar } from '../../hooks/useSidebar'
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
  faArrowRight,
  faMinus,
} from '@fortawesome/free-solid-svg-icons'
import Sidebar from '../organisms/Sidebar'
import UserClassMemberList from '../organisms/UserClassMemberList'
import ArticleList from '../organisms/ArticleList'
import { useQueryClassByClassId } from '../../api/queries/Class'
import { useAuthContext } from '../../contexts/AuthContext'
import { useQueryFetchPostByClassId } from '../../api/queries/Post'
import AssignmentList from '../organisms/AssignmentList'
import { Article, Assignment } from '../../interfaces/GrandInterface'

library.add(
  faCheckSquare,
  faBars,
  faGraduationCap,
  faHome,
  faPeopleGroup,
  faPlus,
  faHomeAlt,
  faArrowRight,
  faMinus
)

export default function ClassDetail() {
  const { authState } = useAuthContext()
  const { sidebarWiden, setSidebarWiden } = useSidebar()
  // const [showProfileOptions, setShowProfileOptions] = useState(false)

  const { classId } = useParams()
  const { data: classData } = useQueryClassByClassId(
    authState.accessToken,
    classId,
    { enabled: !!authState.accessToken && !!classId }
  )
  const classProp = classData?.data
  const navigate = useNavigate()

  const [contentShown, setContentShown] = useState('Articles')
  const { data: rawPosts } = useQueryFetchPostByClassId(
    authState.accessToken,
    classId,
    { enabled: !!authState.accessToken && !!classId }
  )

  const posts = rawPosts?.data
  console.log('posts di class detail: ', posts)

  const articles: Article[] | undefined =
    posts &&
    posts
      .filter((item) => item.article !== null)
      .map((item) => item.article as Article)

  const assignments: Assignment[] | undefined =
    posts &&
    posts
      .filter((item) => item.assignment !== null)
      .map((item) => item.assignment as Assignment)

  return (
    <div className="w-full h-screen overflow-hidden font-plusJakarta">
      <div className="flex flex-col bg-primary h-full">
        <div className="flex gap-3 bg-primary px-6 border-b-2 border-accent sticky top-0 z-30">
          <div className="flex flex-row h-20 space-x-4 items-center font-bold text-2xl max-mobile:text-lg text-accent line-clamp-1 text-ellipsis">
            <button onClick={() => setSidebarWiden(!sidebarWiden)}>
              <FontAwesomeIcon icon="bars" className="" />
            </button>
            <div
              onClick={() => navigate('/dashboard')}
              className="cursor-pointer font-plusJakarta"
            >
              Googolplex
            </div>
            <FontAwesomeIcon icon="minus" />
            <div className="font-plusJakarta font-medium">
              {classProp?.subject}
            </div>
          </div>
        </div>

        <div className="h-[calc(100%-82px)] w-screen flex flex-row relative">
          <Sidebar />
          {/* content */}
          <div className="h-full w-full">
            <div className="px-6 flex max-mobile:justify-around items-center bg-primary h-20 border-b-2 border-accent sticky z-30 overflow-x-auto gap-4">
              <div
                onClick={() => setContentShown('Articles')}
                className={`cursor-pointer font-plusJakarta ${contentShown == 'Articles' ? 'font-bold' : 'font-medium'} text-lg text-accent hover:underline`}
              >
                Articles
              </div>
              <div
                onClick={() => setContentShown('Assignments')}
                className={`cursor-pointer font-plusJakarta ${contentShown == 'Assignments' ? 'font-bold' : 'font-medium'} text-lg text-accent hover:underline`}
              >
                Assignments
              </div>
              <div
                onClick={() => setContentShown('Members')}
                className={`cursor-pointer font-plusJakarta ${contentShown == 'Members' ? 'font-bold' : 'font-medium'} text-lg text-accent hover:underline`}
              >
                Members
              </div>
            </div>

            <div className="h-[calc(100%-80px)] w-full overflow-y-auto">
              <div className="h-full text-xl font-plusJakarta font-medium text-accent">
                {contentShown == 'Articles'
                  ? articles && <ArticleList articles={articles} />
                  : contentShown == 'Assignments'
                    ? assignments && (
                        <AssignmentList assignments={assignments} />
                      )
                    : contentShown == 'Members'
                      ? classProp && <UserClassMemberList {...classProp} />
                      : articles && <ArticleList articles={articles} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
