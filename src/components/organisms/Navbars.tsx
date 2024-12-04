import { useNavbar } from '../../hooks/useNavbar'
import NavbarItem from '../molecules/NavbarItem'

export default function Navbars() {
  const { setNavbarItemSelected, navbarWiden, setNavbarWiden } = useNavbar()
  return (
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
  )
}
