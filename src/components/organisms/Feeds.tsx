import { useParams } from 'react-router'
import { useFetchPostByClassId } from '../../api/queries/Post'
import PostCard from '../molecules/PostCard'

export default function Feeds() {
  const { classId } = useParams()
  const test = useFetchPostByClassId(classId!)

  if (test.isLoading)
    return <div className="text-3xl text-white">Loading...</div>

  return (
    <div className="grid gap-3 overflow-y-auto">
      {test.data?.data.map((p, i) => <PostCard {...p} key={i} />)}
    </div>
  )
}
