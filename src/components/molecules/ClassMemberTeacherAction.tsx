import {
  // useDeleteUserClassMemberById,
  useFetchClassMemberByTokenAndClassId,
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
  if (currentUserStatus.isLoading) <div className=""></div>

  // const { mutate: deleteUserClassMember } = useDeleteUserClassMemberById(
  //   authState.accessToken,
  //   currentUserStatus!.data!.id!
  // )

  return (
    <div className="grid gap-3 justify-end">
      <GrantRoleButton each={prop} currentUser={currentUserStatus.data} />
      <RevokeRoleButton each={prop} currentUser={currentUserStatus.data} />
      <RemoveMemberButton each={prop} currentUser={currentUserStatus.data} />
      <LeaveClassButton each={prop} currentUser={currentUserStatus.data} />
    </div>
  )
}
