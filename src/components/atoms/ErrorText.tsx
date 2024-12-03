import { ChildrenPropsWithClassName } from '../../interfaces/GrandInterface'

const ErrorText = ({ children, className }: ChildrenPropsWithClassName) => {
  return <div className={`text-red-500 text-sm ${className}`}>{children}</div>
}

export default ErrorText
