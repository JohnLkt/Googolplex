interface ClassTeacherProps {
  teacherName: string | undefined
}

export default function ClassTeacher({ teacherName }: ClassTeacherProps) {
  return <div className="text-sm font-medium text-accent">{teacherName}</div>
}
