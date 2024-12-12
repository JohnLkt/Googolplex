import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface SidebarItemProps {
  sidebarTitle: string
  sidebarWiden: boolean
  iconItem: IconProp
  handleClick: () => void
}

export default function SidebarItem({
  sidebarTitle,
  sidebarWiden,
  iconItem,
  handleClick,
}: SidebarItemProps) {
  return (
    <div
      onClick={handleClick}
      className="cursor-pointer flex flex-row gap-3 items-center"
    >
      <div className="w-8 flex justify-center">
        <FontAwesomeIcon icon={iconItem} className="text-accent text-xl" />
      </div>
      <div className="hover:underline text-nowrap font-plusJakarta text-sm font-medium text-accent p-1">
        {sidebarWiden ? sidebarTitle : ''}
      </div>
    </div>
  )
}
