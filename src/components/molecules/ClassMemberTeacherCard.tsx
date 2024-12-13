import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UserClassMember } from '../../interfaces/GrandInterface'
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'
import ClassMemberTeacherAction from './ClassMemberTeacherAction'

export default function ClassMemberTeacherCard(prop: UserClassMember) {
  return (
    <div className="grid gap-3 items-center z-10 cursor-pointer rounded-xl p-4 bg-gradient-to-br from-primary from-40% to-secondary hover:shadow-secondary hover:shadow-lg transition ease-in-out">
      <div className="flex gap-3 ">
        <FontAwesomeIcon
          icon={faChalkboardTeacher}
          className="text-secondary text-xl animate-bounce"
        />
        <div className="text-2xl text-accent font-plusJakarta">
          {prop?.user?.name}
        </div>
      </div>
      <ClassMemberTeacherAction {...prop} />
    </div>
  )
}
