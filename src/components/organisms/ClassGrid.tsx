import { useEffect } from 'react'
import ClassCard from '../molecules/ClassCard'
import { useFetchClass } from '../../api/queries/Class'

interface ClassGridProps {
  classType: string
}

export default function ClassGrid({ classType }: ClassGridProps) {
  const { classes, isLoading } = useFetchClass()
  useEffect(() => {
    console.log('class type: ', classType)
  }, [classType])

  if (isLoading) return <div className="text-3xl text-white">Loading...</div>

  return (
    <div className="py-6 flex flex-wrap gap-8">
      {classes?.data.map((c, i) => (
        // <div className="">
        //   <div className="">{c.subject}</div>
        //   <div className="">{c.description}</div>
        // </div>
        <ClassCard key={i} subject={c.subject} description={c.description} />
      ))}
      {/* {classes && (
        // classes.data.map((class) => (
        //   <div>{class}</div>
        // ))
        <div className="">{
          classes.data.map(class => ())
        }</div>
      )} */}
    </div>
  )
}
