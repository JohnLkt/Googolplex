import { useEffect } from 'react'
import ClassCard from '../molecules/ClassCard'
import { useFetchClass } from '../../api/queries/Class'
import { useAuthContext } from '../../contexts/AuthContext'

interface ClassGridProps {
  classType: string
}

export default function ClassGrid({ classType }: ClassGridProps) {
  const { classes, isLoading } = useFetchClass()
  const { authState } = useAuthContext()

  useEffect(() => {
    console.log('class type: ', classType)
    if (classType == 'enrolled') {
      classes?.data.filter(
        (c) =>
          !c.user_class_member?.some(
            (m) => m.is_teacher && m.user_id === authState.userId
          )
      )
    }
  }, [classType, classes, authState])

  if (isLoading) return <div className="text-3xl text-white">Loading...</div>

  return (
    <div className="py-6 flex flex-wrap gap-8">
      {classes?.data && authState.userId ? (
        classType === 'enrolled' ? (
          classes.data
            .filter(
              (c) =>
                !c.user_class_member?.some(
                  (m) => m.is_teacher && m.user_id === authState.userId
                )
            )
            .map((c) => <ClassCard key={c.id} {...c} />)
        ) : classType === 'teaching' ? (
          classes.data
            .filter((c) =>
              c.user_class_member?.some(
                (m) => m.is_teacher && m.user_id === authState.userId
              )
            )
            .map((c) => <ClassCard key={c.id} {...c} />)
        ) : (
          classes.data.map((c) => <ClassCard key={c.id} {...c} />)
        )
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  )
}
