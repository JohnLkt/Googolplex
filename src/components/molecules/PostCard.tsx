import { Post } from '../../interfaces/GrandInterface'

const PostCard = (prop: Post) => {
  console.log(prop)

  return (
    <div className="z-10 cursor-pointer rounded-xl p-4 hover:scale-95 bg-gradient-to-br from-primary from-40% to-secondary hover:shadow-secondary hover:shadow-lg transition ease-in-out">
      <div className="">
        {prop.article?.title ? prop.article?.title : prop.assignment?.title}
      </div>
      <div className="">
        {prop.article?.content
          ? prop.article?.content
          : prop.assignment?.content}
      </div>
      <div className="">{prop.assignment?.due_date ?? ''}</div>
    </div>
  )
}

export default PostCard
