import { useLocation } from 'react-router'
import { Class } from '../../interfaces/GrandInterface'

export default function ClassDetail() {
  const classProps = useLocation()
  const { ...classProp } = classProps.state as Class
  return (
    <div className="text-3xl font-bold text-accent">{classProp.subject}</div>
  )
}
