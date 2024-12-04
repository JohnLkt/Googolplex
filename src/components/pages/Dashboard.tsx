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
import NavbarItem from '../organisms/NavbarItem'

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

  const [navbarItemSelected, setNavbarItemSelected] = useState('')

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
          <div
            id="navbar"
            onMouseEnter={() => setNavbarWiden(true)}
            onMouseLeave={() => setNavbarWiden(false)}
            className={`z-20 transition-all duration-300 ${
              navbarWiden ? 'w-1/5 max-mobile:w-1/3' : 'w-16'
            } bg-primary p-4 border-r-2 border-accent overflow-auto`}
          >
            <div className="flex flex-col space-y-6">
              <NavbarItem
                navbarTitle="Home"
                navbarWiden={navbarWiden}
                handleClick={() => {
                  setNavbarWiden(!navbarWiden)
                  setNavbarItemSelected('Home')
                }}
                iconItem="home-alt"
              />
              <NavbarItem
                navbarTitle="Class Enrolled"
                navbarWiden={navbarWiden}
                handleClick={() => {
                  setNavbarWiden(!navbarWiden)
                  setNavbarItemSelected('Class Enrolled')
                }}
                iconItem="graduation-cap"
              />
              <NavbarItem
                navbarTitle="Class Teaching"
                navbarWiden={navbarWiden}
                handleClick={() => {
                  setNavbarWiden(!navbarWiden)
                  setNavbarItemSelected('Class Teaching')
                }}
                iconItem="people-group"
              />
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
