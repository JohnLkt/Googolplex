import { useState } from 'react'
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
} from '@fortawesome/free-solid-svg-icons'
import ParticlesBackground from '../molecules/Particles'
import ClassGrid from '../organisms/ClassGrid'

library.add(
  faCheckSquare,
  faBars,
  faGraduationCap,
  faHome,
  faPeopleGroup,
  faPlus
)

function Dashboard() {
  const { authState, LogOut } = useAuthContext()

  const [navbarWiden, setNavbarWiden] = useState(false)

  const [classTeaching, setClassTeaching] = useState('')
  const [classEnrolled, setClassEnrolled] = useState('')

  return (
    <div>
      <div className="flex flex-col bg-primary">
        <div className="flex gap-3 bg-primary p-6 border-b-2 border-accent sticky top-0">
          <div className="flex-1 flex flex-row space-x-4 items-center">
            <button
              onClick={() => {
                setNavbarWiden(!navbarWiden)
                setClassEnrolled('')
                setClassTeaching('')
                if (!navbarWiden) {
                  setClassEnrolled('Class Enrolled')
                  setClassTeaching('Class Teaching')
                }
              }}
            >
              <FontAwesomeIcon icon="bars" className="text-accent text-xl" />
            </button>
            <div className="font-plusJakarta font-bold text-2xl text-accent">
              Googolplex
            </div>
          </div>
          <div className="flex flex-row space-x-4 items-center">
            <button>
              <FontAwesomeIcon icon="plus" className="text-accent text-2xl" />
            </button>
            <div className=" w-8 h-8 bg-accent rounded-full"></div>
          </div>
        </div>

        <div className="flex flex-row">
          <div
            id="navbar"
            className={`transition-all duration-300 ${
              navbarWiden ? 'w-1/5 max-mobile:w-1/3' : 'w-16'
            } bg-primary p-4 border-r-2 border-accent overflow-auto`}
          >
            <div className="flex flex-col space-y-4">
              <div className="flex flex-row space-x-2">
                <FontAwesomeIcon
                  icon="people-group"
                  className="text-accent text-xl"
                />
                <div className="font-plusJakarta text-sm font-medium text-accent">
                  {classTeaching}
                </div>
              </div>

              <div className="flex flex-row space-x-2">
                <FontAwesomeIcon
                  icon="graduation-cap"
                  className="text-accent text-xl"
                />
                <div className="font-plusJakarta text-sm font-medium text-accent">
                  {classEnrolled}
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div
            className={`overflow-y-auto ${navbarWiden ? 'w-4/5' : 'flex-1'} bg-primary p-6`}
          >
            <div className="flex flex-col">
              <div className="text-xl font-plusJakarta font-medium text-accent">
                Welcome, {authState!.username}
              </div>
              <ClassGrid />
              <button
                onClick={() => {
                  LogOut()
                }}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
      <ParticlesBackground />
    </div>
  )
}

export default Dashboard
