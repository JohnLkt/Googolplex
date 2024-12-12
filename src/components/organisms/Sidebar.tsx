import { useNavigate } from 'react-router'
import { useSidebar } from '../../hooks/useSidebar'
import SidebarItem from '../molecules/SidebarItem'

export default function Sidebar() {
  const { setSidebarItemSelected, sidebarWiden, setSidebarWiden } = useSidebar()
  const navigate = useNavigate()
  return (
    <div
      id="sidebar"
      onMouseEnter={() => setSidebarWiden(true)}
      onMouseLeave={() => setSidebarWiden(false)}
      className={`z-20 transition-hover duration-300 ${
        sidebarWiden
          ? 'w-1/5 max-mobile:w-full max-mobile:absolute max-mobile:inset-0 max-mobile:z-40 border-r-2'
          : 'w-16 max-mobile:w-0 max-mobile:p-0 '
      } bg-primary p-4 max-mobile:p-0 border-accent overflow-auto border-r-2 max-mobile:border-r-0`}
    >
      <div className="flex flex-col space-y-6 max-mobile:m-4">
        <SidebarItem
          sidebarTitle="Home"
          sidebarWiden={sidebarWiden}
          handleClick={() => {
            setSidebarWiden(!sidebarWiden)
            setSidebarItemSelected('Home')
            navigate('/dashboard')
          }}
          iconItem="home-alt"
        />
        <SidebarItem
          sidebarTitle="To-dos"
          sidebarWiden={sidebarWiden}
          handleClick={() => {
            setSidebarWiden(!sidebarWiden)
            setSidebarItemSelected('Todos')
            navigate('/dashboard')
          }}
          iconItem="tasks"
        />
        <SidebarItem
          sidebarTitle="Class Enrolled"
          sidebarWiden={sidebarWiden}
          handleClick={() => {
            setSidebarWiden(!sidebarWiden)
            setSidebarItemSelected('Class Enrolled')
            navigate('/dashboard')
          }}
          iconItem="graduation-cap"
        />
        <SidebarItem
          sidebarTitle="Class Teaching"
          sidebarWiden={sidebarWiden}
          handleClick={() => {
            setSidebarWiden(!sidebarWiden)
            setSidebarItemSelected('Class Teaching')
            navigate('/dashboard')
          }}
          iconItem="people-group"
        />
      </div>
    </div>
  )
}
