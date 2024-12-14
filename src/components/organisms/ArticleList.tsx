import { useNavigate } from 'react-router'
import { Article } from '../../interfaces/GrandInterface'
import ActionLightButton from '../atoms/ActionLightButton'
import PostCard from '../molecules/PostCard'

interface ArticleListProps {
  articles: Article[]
}
export default function ArticleList({ articles }: ArticleListProps) {
  const navigate = useNavigate()
  return (
    <div className="w-full flex flex-col gap-3 p-6">
      <div
        className="w-fit"
        onClick={() => {
          navigate('add/article/')
        }}
      >
        <ActionLightButton actionText="Add Article" />
      </div>
      {articles &&
        articles.map((article, i) => <PostCard article={article} key={i} />)}
    </div>
  )
}
