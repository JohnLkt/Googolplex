interface ClassTeacherProps {
  teacherName: string
}

export default function ClassTeacher({ teacherName }: ClassTeacherProps) {
  return <div className="text-sm font-medium text-accent">{teacherName}</div>
}
