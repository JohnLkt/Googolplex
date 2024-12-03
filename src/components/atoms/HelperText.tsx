import { ChildrenPropsWithClassName } from '../../interfaces/GrandInterface'

const HelperText = ({ children, className }: ChildrenPropsWithClassName) => {
  return <div className={`text-primary text-sm ${className}`}>{children}</div>
}

export default HelperText
