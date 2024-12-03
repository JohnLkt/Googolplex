import { ChildrenPropsWithClassName } from '../../interfaces/GrandInterface'

const CenteredContainer = ({
  children,
  className,
}: ChildrenPropsWithClassName) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {children}
    </div>
  )
}

export default CenteredContainer
