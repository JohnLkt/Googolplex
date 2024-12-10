import { useLocation } from 'react-router'
import { Class } from '../../interfaces/GrandInterface'
import { useAuthContext } from '../../contexts/AuthContext'
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

  const classProps = useLocation()
  const { ...classProp } = classProps.state as Class
  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="flex flex-col bg-primary h-full">
        <div className="flex gap-3 bg-primary p-6 border-b-2 border-accent sticky top-0 z-30">
          <div className="flex-1 flex flex-row space-x-4 items-center">
            <button onClick={() => setSidebarWiden(!sidebarWiden)}>
              <FontAwesomeIcon icon="bars" className="text-accent text-xl" />
            </button>
            <div className="font-plusJakarta font-bold text-2xl text-accent">
              Googolplex
            </div>
            <FontAwesomeIcon icon="minus" className="text-accent text-xl" />
            <div className="font-plusJakarta font-bold text-2xl text-accent">
              {classProp.subject} {classProp.class_code}
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

        <div className="h-full flex flex-row relative">
          <Sidebar />
          <div className="flex flex-col w-screen">
            <div className="flex gap-3 bg-primary p-6 border-b-2 border-accent sticky top-10 z-30">
              <div className="flex-1 flex flex-row space-x-4 items-center">
                <div className="font-plusJakarta font-medium text-lg text-accent">
                  Feeds
                </div>
                <div className="font-plusJakarta font-medium text-lg text-accent">
                  Assignments
                </div>
                <div className="font-plusJakarta font-medium text-lg text-accent">
                  Members
                </div>
              </div>
            </div>
            <div
              className={`overflow-y-auto ${sidebarWiden ? 'w-4/5' : 'flex-1'}  p-6`}
            >
              <div className="flex flex-col">
                <div className="text-xl font-plusJakarta font-medium text-accent">
                  Welcome, {authState!.username}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
