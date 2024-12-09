import ClassTeacher from '../atoms/ClassTeacher'
import ClassTitle from '../atoms/ClassTitle'

interface ClassCardProps {
  subject: string
  description: string
  classCode: string
  // may be incomplete
}

export default function ClassCard({
  subject,
  description,
  classCode,
}: ClassCardProps) {
  return (
    <div className="z-10 cursor-pointer w-64 h-64 rounded-xl p-4 hover:scale-105 bg-gradient-to-br from-primary from-40% to-secondary hover:shadow-secondary hover:shadow-lg transition ease-in-out">
      <div className="flex flex-col space-y-3">
        <div className="h-1/4 flex flex-col space-y-3">
          <ClassTitle subject={subject} />
          <ClassTeacher teacherName="TBD" />
          <ClassTeacher teacherName={classCode} />
        </div>
        <div className="h-3/4">
          <div className="text-sm font-plusJakarta font-light text-accent">
            {description}
          </div>
        </div>
      </div>
    </div>
  )
}
