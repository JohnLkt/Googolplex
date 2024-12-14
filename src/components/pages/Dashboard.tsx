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
} from '@fortawesome/free-solid-svg-icons'
import ClassGrid from '../organisms/ClassGrid'
import Sidebar from '../organisms/Sidebar'
import { useSidebar } from '../../hooks/useSidebar'
import { useState } from 'react'
import { CreateClassForm } from '../organisms/CreateClassForm'
import JoinClassForm from '../organisms/JoinClassForm'
import TodoList from '../organisms/TodoList'

library.add(
  faCheckSquare,
  faBars,
  faGraduationCap,
  faHome,
  faPeopleGroup,
  faPlus,
  faHomeAlt,
  faTasks
)

function Dashboard() {
  const { authState, LogOut } = useAuthContext()

  const { sidebarItemSelected, sidebarWiden, setSidebarWiden } = useSidebar()
  const [showProfileOptions, setShowProfileOptions] = useState(false)

  // add class, join class
  const [showClassOptions, setShowClassOptions] = useState(false)
  const [createClassModal, setCreateClassModal] = useState(false)
  const [joinClassModal, setJoinClassModal] = useState(false)

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
          </div>
          <div className="flex flex-row space-x-4 items-center">
            <button
              onClick={() => {
                setShowClassOptions(!showClassOptions)
                if (showProfileOptions) setShowProfileOptions(false)
              }}
              className="w-8 h-8 rounded-full text-accent focus:text-primary border-2 border-transparent hover:border-accent focus:border-transparent focus:bg-accent hover:scale-120 transition ease-in-out"
            >
              <FontAwesomeIcon icon="plus" />
            </button>
            <button
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
            </button>
          </div>
        </div>

        <div className="h-full flex flex-row relative">
          {showProfileOptions && (
            <div className="animate-fadeIn font-plusJakarta absolute z-20 bg-white right-2 top-2 w-64 rounded-lg overflow-hidden">
              <button className="hover:bg-slate-300 p-4 text-sm font-bold w-full text-left">
                Edit Profile
              </button>
              <button
                className="hover:bg-slate-300 p-4 text-red-500 text-sm font-bold w-full text-left"
                onClick={() => {
                  LogOut()
                }}
              >
                Logout
              </button>
            </div>
          )}
          {showClassOptions && (
            <div className="animate-fadeIn font-plusJakarta absolute z-20 bg-accent right-20 top-2 w-64 rounded-lg overflow-hidden">
              <button
                onClick={() => {
                  setCreateClassModal(!createClassModal)
                  setShowClassOptions(false)
                }}
                className="hover:bg-slate-300 p-4 text-sm font-bold w-full text-left"
              >
                Create class
              </button>
              <button
                onClick={() => {
                  setJoinClassModal(!joinClassModal)
                  setShowClassOptions(false)
                }}
                className="hover:bg-slate-300 p-4 text-sm font-bold w-full text-left"
              >
                Join class
              </button>
            </div>
          )}
          {createClassModal && (
            <CreateClassForm
              createClassModal={createClassModal}
              showClassOptions={showClassOptions}
              setCreateClassModal={() => setCreateClassModal(false)}
              setShowClassOptions={() => setShowClassOptions(false)}
            />
          )}
          {joinClassModal && (
            <JoinClassForm
              joinClassModal={joinClassModal}
              showClassOptions={showClassOptions}
              setJoinClassModal={() => setJoinClassModal(false)}
              setShowClassOptions={() => setShowClassOptions(false)}
            />
          )}
          <Sidebar />

          {/* Content Area */}
          <div
            className={`h-[calc(100%-80px)] overflow-y-auto ${sidebarWiden ? 'w-4/5' : 'flex-1'}  p-6`}
          >
            <div className="flex flex-col">
              <div className="text-xl font-plusJakarta font-medium text-accent">
                Welcome, {authState!.username}
              </div>
              {sidebarItemSelected == 'Class Enrolled' ? (
                <ClassGrid classType="enrolled" />
              ) : sidebarItemSelected == 'Class Teaching' ? (
                <ClassGrid classType="teaching" />
              ) : sidebarItemSelected == 'Todos' ? (
                <TodoList />
              ) : (
                <ClassGrid classType="all" />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <ParticlesBackground /> */}
    </div>
  )
}

export default Dashboard
