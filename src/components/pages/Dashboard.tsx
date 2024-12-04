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
} from '@fortawesome/free-solid-svg-icons'
import ParticlesBackground from '../molecules/Particles'
import ClassGrid from '../organisms/ClassGrid'
import Sidebar from '../organisms/Sidebar'
import { useSidebar } from '../../hooks/useSidebar'
import { useState } from 'react'

library.add(
  faCheckSquare,
  faBars,
  faGraduationCap,
  faHome,
  faPeopleGroup,
  faPlus,
  faHomeAlt
)

function Dashboard() {
  const { authState, LogOut } = useAuthContext()

  const { sidebarItemSelected, sidebarWiden, setSidebarWiden } = useSidebar()
  const [showProfileOptions, setShowProfileOptions] = useState(false)

  return (
    <div className="w-full h-screen">
      <div className="flex flex-col bg-primary h-full">
        <div className="flex gap-3 bg-primary p-6 border-b-2 border-accent sticky top-0 z-30">
          <div className="flex-1 flex flex-row space-x-4 items-center">
            <button onClick={() => setSidebarWiden(!sidebarWiden)}>
              <FontAwesomeIcon icon="bars" className="text-accent text-xl" />
            </button>
            <div className="font-plusJakarta font-bold text-2xl text-accent">
              Googolplex
            </div>
          </div>
          <div className="flex flex-row space-x-4 items-center">
            <button className="w-8 h-8 rounded-full text-accent focus:text-primary border-2 border-transparent hover:border-accent focus:border-transparent focus:bg-accent hover:scale-120 transition ease-in-out">
              <FontAwesomeIcon icon="plus" />
            </button>
            <button
              onClick={() => {
                setShowProfileOptions(!showProfileOptions)
              }}
            >
              <img
                src={authState.profilePicture || ''}
                alt={'Profile Picture'}
                width={'32px'}
                height={'32px'}
              />
            </button>
          </div>
        </div>

        <div className="h-full flex flex-row relative">
          {showProfileOptions && (
            <div className="absolute z-20 bg-white right-2 top-2 w-64 rounded-lg overflow-hidden">
              <button className="hover:bg-slate-300 p-4 font-semibold w-full text-left">
                Edit Profile
              </button>
              <button
                className="hover:bg-slate-300 p-4 text-red-500 font-semibold w-full text-left"
                onClick={() => {
                  LogOut()
                }}
              >
                Logout
              </button>
            </div>
          )}
          <Sidebar />

          {/* Content Area */}
          <div
            className={`overflow-y-auto ${sidebarWiden ? 'w-4/5' : 'flex-1'} bg-primary p-6`}
          >
            <div className="flex flex-col">
              <div className="text-xl font-plusJakarta font-medium text-accent">
                Welcome, {authState!.username}
              </div>
              {sidebarItemSelected == 'Class Enrolled' ? (
                <ClassGrid classType="enrolled" />
              ) : sidebarItemSelected == 'Class Teaching' ? (
                <ClassGrid classType="teaching" />
              ) : (
                <ClassGrid classType="all" />
              )}
            </div>
          </div>
        </div>
      </div>
      <ParticlesBackground />
    </div>
  )
}

export default Dashboard
