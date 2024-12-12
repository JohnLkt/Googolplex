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
import Feeds from '../organisms/Feeds'
import Assignments from '../organisms/Assignments'
import { useQueryClassByClassId } from '../../api/queries/Class'
import { useAuthContext } from '../../contexts/AuthContext'

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

  const [contentShown, setContentShown] = useState('Feeds')

  return (
    <div className="w-full h-screen overflow-hidden">
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
            <div className="font-plusJakarts text-ellipsis">
              {classProp?.subject}
            </div>
          </div>
          <div className="flex flex-row space-x-4 items-center">
            {/* <button
              onClick={() => {
                setShowProfileOptions(!showProfileOptions)
                if (showClassOptions) setShowClassOptions(false)
              }}
            >
              <img
                src={authState.profilePicture || ''}
                alt={'Profile Picture'}
                width={'32px'}
                height={'32px'}
              />
            </button> */}
          </div>
        </div>

        <div className="h-[calc(100%-82px)] w-screen flex flex-row relative">
          <Sidebar />
          {/* content */}
          <div className="h-full w-full">
            <div className="px-6 flex max-mobile:justify-around items-center bg-primary h-20 border-b-2 border-accent sticky z-30 overflow-x-auto gap-4">
              <div
                onClick={() => setContentShown('Feeds')}
                className="cursor-pointer font-plusJakarta font-medium text-lg text-accent hover:underline hover:underline-offset-1"
              >
                Feeds
              </div>
              <div
                onClick={() => setContentShown('Assignments')}
                className="cursor-pointer font-plusJakarta font-medium text-lg text-accent hover:underline hover:underline-offset-1"
              >
                Assignments
              </div>
              <div
                onClick={() => setContentShown('Members')}
                className="cursor-pointer font-plusJakarta font-medium text-lg text-accent hover:underline hover:underline-offset-1"
              >
                Members
              </div>
              {/* <div className="flex items-center gap-4 cursor-pointer font-plusJakarta font-medium text-lg text-accent whitespace-nowrap">
                <div
                  className="hover:underline hover:underline-offset-1 text-nowrap"
                  onClick={() => {
                    navigate('add/assignment/')
                  }}
                >
                  Add Assignment
                </div>
                <div
                  className="hover:underline hover:underline-offset-1 text-nowrap"
                  onClick={() => {
                    navigate('add/article/')
                  }}
                >
                  Add Article
                </div>
              </div> */}
            </div>

            <div className="h-[calc(100%-80px)] w-full overflow-y-auto">
              <div className="h-full text-xl font-plusJakarta font-medium text-accent">
                {contentShown == 'Feeds' ? (
                  <Feeds />
                ) : contentShown == 'Assignments' ? (
                  <Assignments />
                ) : contentShown == 'Members' ? (
                  classProp && <UserClassMemberList {...classProp} />
                ) : (
                  <Feeds />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
