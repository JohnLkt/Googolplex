import { useParams } from 'react-router'
import { useAuthContext } from '../../contexts/AuthContext'
import { useFetchClassMemberByTokenAndClassId } from '../../api/queries/UserClassMember'
import { ChildrenProps } from '../../interfaces/GrandInterface'

const AuthTeacherWrapper = ({ children }: ChildrenProps) => {
  const { classId } = useParams()
  const { authState } = useAuthContext()
  const { data, isLoading } = useFetchClassMemberByTokenAndClassId(
    authState.accessToken,
    authState.userId,
    classId!
  )
  if (isLoading) return <></>
  if (!data?.is_teacher) return <></>
  return <div>{children}</div>
}

export default AuthTeacherWrapper
