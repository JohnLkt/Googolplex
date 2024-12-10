import { useNavigate } from 'react-router'
import ClassTeacher from '../atoms/ClassTeacher'
import ClassTitle from '../atoms/ClassTitle'
import { Class } from '../../interfaces/GrandInterface'

export default function ClassCard({ ...classProp }: Class) {
  const navigate = useNavigate()
  const handleNavClassDetail = (classId: string) => {
    navigate(`/class-detail/${classId}`, { state: classProp })
  }
  return (
    <div
      onClick={() => handleNavClassDetail(classProp.id)}
      className="z-10 cursor-pointer w-64 h-64 rounded-xl p-4 hover:scale-105 bg-gradient-to-br from-primary from-40% to-secondary hover:shadow-secondary hover:shadow-lg transition ease-in-out"
    >
      <div className="flex flex-col space-y-3">
        <div className="h-1/4 flex flex-col space-y-3">
          <ClassTitle subject={classProp.subject} />
          <ClassTeacher teacherName="TBD" />
          <ClassTeacher teacherName={classProp.class_code} />
          <ClassTitle subject={classProp.id} />
        </div>
        <div className="h-3/4">
          <div className="text-sm font-plusJakarta font-light text-accent">
            {classProp.description}
          </div>
        </div>
      </div>
    </div>
  )
}
