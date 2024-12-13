import { useFetchClassMemberByTokenAndClassId } from '../../api/queries/UserClassMember'
import { UserClassMember } from '../../interfaces/GrandInterface'
import ActionCustomkButton from '../atoms/ActionCustomButton'

interface ClassMemberTeacherActionInterface {
  each: UserClassMember
  currentUser?: UserClassMember
}

function RemoveMemberButton(prop: ClassMemberTeacherActionInterface) {
  // current user is not teacher
  if (!prop.currentUser?.is_teacher) return <div className=""></div>
  return <div className="">Remove Member</div>
}

function GrantRoleButton(prop: ClassMemberTeacherActionInterface) {
  // current user is not teacher
  if (!prop.currentUser?.is_teacher) return <div className=""></div>
  return <div className="">Grant Role</div>
}

function RevokeRoleButton(prop: ClassMemberTeacherActionInterface) {
  // current user is not teacher
  if (!prop.currentUser?.is_teacher) return <div className=""></div>
  return <div className="">Revoke Role</div>
}

function LeaveClassButton(prop: ClassMemberTeacherActionInterface) {
  // check current user same with current card
  if (!(prop.currentUser?.user_id === prop.each.user_id)) {
    return <div className=""></div>
  }
  return <ActionCustomkButton onClick={() => {}} actionText="Leave Class" />
}

export default function ClassMemberTeacherAction(prop: UserClassMember) {
  const currentUserStatus = useFetchClassMemberByTokenAndClassId(prop.class_id)
  if (currentUserStatus.isLoading) <div className=""></div>
  return (
    <div className="">
      <RemoveMemberButton each={prop} currentUser={currentUserStatus.data} />
      <GrantRoleButton each={prop} currentUser={currentUserStatus.data} />
      <RevokeRoleButton each={prop} currentUser={currentUserStatus.data} />
      <LeaveClassButton each={prop} currentUser={currentUserStatus.data} />
    </div>
  )
}
