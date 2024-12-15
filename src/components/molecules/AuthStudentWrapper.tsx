import { useParams } from 'react-router'
import { useAuthContext } from '../../contexts/AuthContext'
import { useFetchClassMemberByTokenAndClassId } from '../../api/queries/UserClassMember'
import { ChildrenProps } from '../../interfaces/GrandInterface'

const AuthStudentWrapper = ({ children }: ChildrenProps) => {
  const { classId } = useParams()
  const { authState } = useAuthContext()
  const { data, isLoading } = useFetchClassMemberByTokenAndClassId(
    authState.accessToken,
    authState.userId,
    classId!
  )
  if (isLoading) return <></>
  if (data?.is_teacher) return <></>
  return children
}

export default AuthStudentWrapper
