import { useNavigate } from 'react-router'
import {
  useDeleteUserClassMemberById,
  useFetchClassMemberByClassId,
  useFetchClassMemberByTokenAndClassId,
  useLeaveUserClassMemberById,
  useUpdateUserClassMemberById,
} from '../../api/queries/UserClassMember'
import { useAuthContext } from '../../contexts/AuthContext'
import { UserClassMember } from '../../interfaces/GrandInterface'
import ActionCustomkButton from '../atoms/ActionCustomButton'
import { ReusableToast } from '../organisms/ReusableToast'

interface ClassMemberTeacherActionInterface {
  each: UserClassMember
  currentUser?: UserClassMember
  onClick?: () => void
}

function RemoveMemberButton(prop: ClassMemberTeacherActionInterface) {
  // current user is not teacher
  if (!prop.currentUser?.is_teacher) return <></>

  // current user same with each
  if (prop.currentUser?.user_id === prop.each.user_id) {
    return <></>
  }

  // each is teacher
  if (prop.each.is_teacher) return <></>

  return (
    <ActionCustomkButton onClick={prop.onClick!} actionText="Remove Member" />
  )
}

function GrantRoleButton(prop: ClassMemberTeacherActionInterface) {
  // current user is not teacher
  if (!prop.currentUser?.is_teacher) return <></>

  // each is teacher
  if (prop.each.is_teacher) return <></>

  return <ActionCustomkButton onClick={prop.onClick!} actionText="Grant Role" />
}

function RevokeRoleButton(prop: ClassMemberTeacherActionInterface) {
  // current user is not teacher
  if (!prop.currentUser?.is_teacher) return <></>

  // each is not teacher
  if (!prop.each.is_teacher) return <></>

  // current user same with each
  if (prop.currentUser?.user_id === prop.each.user_id) {
    return <></>
  }

  return (
    <ActionCustomkButton onClick={prop.onClick!} actionText="Revoke Role" />
  )
}

function LeaveClassButton(prop: ClassMemberTeacherActionInterface) {
  // check current user different with each
  if (!(prop.currentUser?.user_id === prop.each.user_id)) {
    return <></>
  }
  return (
    <ActionCustomkButton onClick={prop.onClick!} actionText="Leave Class" />
  )
}

export default function ClassMemberTeacherAction(prop: UserClassMember) {
  const { authState } = useAuthContext()
  const { refetch } = useFetchClassMemberByClassId(prop.class_id)
  const navigate = useNavigate()

  const currentUserStatus = useFetchClassMemberByTokenAndClassId(
    authState.accessToken,
    authState.userId,
    prop.class_id
  )
  const { mutate: deleteUserClassMember } = useDeleteUserClassMemberById(
    authState.accessToken,
    prop.id
  )
  const { mutate: updateUserClassMember } = useUpdateUserClassMemberById(
    authState.accessToken,
    prop.id
  )
  const { mutate: leaveUserClassMember } = useLeaveUserClassMemberById(
    authState.accessToken,
    prop.id
  )

  // function for handle remove member
  function handleRemoveMember() {
    deleteUserClassMember(undefined, {
      onSuccess: (response) => {
        ReusableToast(`success remove ${response.data.data.user.name}`)
        refetch()
      },
      onError: (error) => {
        console.error('Error deleting user class member:', error)
        ReusableToast(`error remove member : ${error}`)
      },
    })
  }

  // function for handle update role
  function handleUpdateRole(isTeacher: boolean) {
    updateUserClassMember(
      {
        isTeacher: isTeacher,
      },
      {
        onSuccess: (response) => {
          if (isTeacher) {
            ReusableToast(
              `success grant role ${response.data.data.user.name} as teacher`
            )
          } else {
            ReusableToast(
              `success revoke role ${response.data.data.user.name} as teacher`
            )
          }
          refetch()
        },
        onError: (error) => {
          console.error('Error deleting user class member:', error)
          ReusableToast(`error remove member : ${error}`)
        },
      }
    )
  }

  function handleLeaveClass() {
    leaveUserClassMember(undefined, {
      onSuccess: () => {
        ReusableToast(`success leave class`)
        refetch()
        navigate('/dashboard')
      },
      onError: (error) => {
        console.error('Error leave class:', error)
        ReusableToast(`error leave class : ${error}`)
      },
    })
  }

  console.log(prop)

  if (currentUserStatus.isLoading) return <div className=""></div>

  return (
    <div className="grid gap-3 justify-end">
      <GrantRoleButton
        onClick={() => {
          handleUpdateRole(true)
        }}
        each={prop}
        currentUser={currentUserStatus.data}
      />
      <RevokeRoleButton
        onClick={() => {
          handleUpdateRole(false)
        }}
        each={prop}
        currentUser={currentUserStatus.data}
      />
      <RemoveMemberButton
        onClick={handleRemoveMember}
        each={prop}
        currentUser={currentUserStatus.data}
      />
      <LeaveClassButton
        onClick={handleLeaveClass}
        each={prop}
        currentUser={currentUserStatus.data}
      />
    </div>
  )
}
