import { useEffect } from 'react'
import ClassCard from '../molecules/ClassCard'

interface ClassGridProps {
  classType: string
}

export default function ClassGrid({ classType }: ClassGridProps) {
  useEffect(() => {
    console.log('class type: ', classType)
  }, [classType])

  return (
    <div className="py-6 flex flex-wrap gap-8">
      <ClassCard />
      <ClassCard />
      <ClassCard />
      <ClassCard />
      <ClassCard />
      <ClassCard />
      <ClassCard />
      <ClassCard />
      <ClassCard />
      <ClassCard />
    </div>
  )
}
