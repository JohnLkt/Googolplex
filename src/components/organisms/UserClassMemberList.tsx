import { useFetchClassMemberByClassId } from '../../api/queries/UserClassMember'
import { Class } from '../../interfaces/GrandInterface'
import ClassMemberStudentCard from '../molecules/ClassMemberStudentCard'
import ClassMemberTeacherCard from '../molecules/ClassMemberTeacherCard'

export default function UserClassMemberList({ ...classProp }: Class) {
  const { members } = useFetchClassMemberByClassId(classProp.id)

  return (
    <div className="flex flex-col gap-3 p-6">
      {members?.data.map((member, i) =>
        member.is_teacher ? (
          <ClassMemberTeacherCard key={i} {...member} />
        ) : (
          <ClassMemberStudentCard key={i} {...member} />
        )
      )}
    </div>
  )
}
