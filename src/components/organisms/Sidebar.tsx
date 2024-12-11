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
      className={`z-20 transition-all duration-300 ${
        sidebarWiden ? 'w-1/5 max-mobile:w-[240px]' : 'w-16'
      } bg-primary p-4 border-r-2 border-accent overflow-auto`}
    >
      <div className="flex flex-col space-y-6">
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
