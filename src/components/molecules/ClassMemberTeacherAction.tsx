import {
  useDeleteUserClassMemberById,
  useFetchClassMemberByTokenAndClassId,
  useUpdateUserClassMemberById,
} from '../../api/queries/UserClassMember'
import { useAuthContext } from '../../contexts/AuthContext'
import { UserClassMember } from '../../interfaces/GrandInterface'
import ActionCustomkButton from '../atoms/ActionCustomButton'

interface ClassMemberTeacherActionInterface {
  each: UserClassMember
  currentUser?: UserClassMember
}

function RemoveMemberButton(prop: ClassMemberTeacherActionInterface) {
  // current user is not teacher
  if (!prop.currentUser?.is_teacher) return <></>

  // current user same with each
  if (prop.currentUser?.user_id === prop.each.user_id) {
    return <></>
  }

  return <ActionCustomkButton onClick={() => {}} actionText="Remove Member" />
}

function GrantRoleButton(prop: ClassMemberTeacherActionInterface) {
  // current user is not teacher
  if (!prop.currentUser?.is_teacher) return <></>

  // each is teacher
  if (prop.each.is_teacher) return <></>

  return <ActionCustomkButton onClick={() => {}} actionText="Grant Role" />
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

  return <ActionCustomkButton onClick={() => {}} actionText="Revoke Role" />
}

function LeaveClassButton(prop: ClassMemberTeacherActionInterface) {
  // check current user different with each
  if (!(prop.currentUser?.user_id === prop.each.user_id)) {
    return <></>
  }
  return <ActionCustomkButton onClick={() => {}} actionText="Leave Class" />
}

export default function ClassMemberTeacherAction(prop: UserClassMember) {
  const { authState } = useAuthContext()
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

  function handleRemoveMember() {}

  if (currentUserStatus.isLoading) return <div className=""></div>

  return (
    <div className="grid gap-3 justify-end">
      <GrantRoleButton each={prop} currentUser={currentUserStatus.data} />
      <RevokeRoleButton each={prop} currentUser={currentUserStatus.data} />
      <RemoveMemberButton each={prop} currentUser={currentUserStatus.data} />
      <LeaveClassButton each={prop} currentUser={currentUserStatus.data} />
    </div>
  )
}
