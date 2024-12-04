import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface NavbarItemProps {
  navbarTitle: string
  navbarWiden: boolean
  iconItem: IconProp
  handleClick: () => void
}

export default function NavbarItem({ ...navbarProp }: NavbarItemProps) {
  return (
    <div
      onClick={navbarProp.handleClick}
      className="cursor-pointer flex flex-row space-x-3 items-center"
    >
      <FontAwesomeIcon
        icon={navbarProp.iconItem}
        className="text-accent text-xl"
      />
      <div className="hover:underline text-nowrap font-plusJakarta text-sm font-medium text-accent">
        {navbarProp.navbarWiden ? navbarProp.navbarTitle : ''}
      </div>
    </div>
  )
}
