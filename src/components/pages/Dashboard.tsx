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
  faHomeAlt,
} from '@fortawesome/free-solid-svg-icons'
import ParticlesBackground from '../molecules/Particles'
import ClassGrid from '../organisms/ClassGrid'
import Navbars from '../organisms/Navbars'
import { useNavbar } from '../../hooks/useNavbar'

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
  const { authState } = useAuthContext()

  const [navbarWiden, setNavbarWiden] = useState(false)

  const { navbarItemSelected } = useNavbar()

  return (
    <div>
      <div className="flex flex-col bg-primary">
        <div className="flex gap-3 bg-primary p-6 border-b-2 border-accent sticky top-0 z-30">
          <div className="flex-1 flex flex-row space-x-4 items-center">
            <button onClick={() => setNavbarWiden(!navbarWiden)}>
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
            <div className=" w-8 h-8 bg-accent rounded-full"></div>
          </div>
        </div>

        <div className="flex flex-row">
          <Navbars />

          {/* Content Area */}
          <div
            className={`overflow-y-auto ${navbarWiden ? 'w-4/5' : 'flex-1'} bg-primary p-6`}
          >
            <div className="flex flex-col">
              <div className="text-xl font-plusJakarta font-medium text-accent">
                Welcome, {authState!.username}
              </div>
              {navbarItemSelected == 'Class Enrolled' ? (
                <ClassGrid classType="enrolled" />
              ) : navbarItemSelected == 'Class Teaching' ? (
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
