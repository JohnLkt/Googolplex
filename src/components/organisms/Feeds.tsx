import { useParams } from 'react-router'
import { useFetchPostByClassId } from '../../api/queries/Post'

export default function Feeds() {
  const { classId } = useParams()
  const test = useFetchPostByClassId(classId!)
  console.log(test.data)

  return <div>Feeds</div>
}
