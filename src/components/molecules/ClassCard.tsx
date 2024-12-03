import ClassTeacher from '../atoms/ClassTeacher'
import ClassTitle from '../atoms/ClassTitle'

export default function ClassCard() {
  return (
    <div className="z-10 cursor-pointer w-64 h-64 rounded-xl border-2 border-accent p-4 bg-primary hover:shadow-secondary hover:shadow-lg transition ease-in-out">
      <div className="flex flex-col space-y-3">
        <div className="h-1/4 flex flex-col space-y-3">
          <ClassTitle subject="Introduction to Algorithm" />
          <ClassTeacher teacherName="Michael Angelo Chandra" />
        </div>
        <div className="h-3/4">
          <div className="text-sm font-plusJakarta font-light text-accent">
            This is a class description. I made this class to teach some random
            idiots about algorithm. It is my duty as someone educated to spread
            algorithm literacy throughout Indonesia.
          </div>
        </div>
      </div>
    </div>
  )
}
