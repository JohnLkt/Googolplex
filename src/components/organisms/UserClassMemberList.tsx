import { useEffect } from 'react'
import { useFetchClassMemberByClassId } from '../../api/queries/UserClassMember'
import { Class } from '../../interfaces/GrandInterface'
import ClassMember from '../molecules/ClassMember'

export default function UserClassMemberList({ ...classProp }: Class) {
  const { members } = useFetchClassMemberByClassId(classProp.id)

  useEffect(() => {
    if (members) {
      console.log('members: ', members)
    }
  }, [members])

  return (
    <div className="flex flex-col gap-3">
      {members?.data.map((member) => <ClassMember {...member} />)}
    </div>
  )
}
