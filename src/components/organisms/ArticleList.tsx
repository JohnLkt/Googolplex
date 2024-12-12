import { Article } from '../../interfaces/GrandInterface'
import PostCard from '../molecules/PostCard'

interface ArticleListProps {
  articles: Article[]
}
export default function ArticleList({ articles }: ArticleListProps) {
  return (
    <div className="w-full flex flex-col gap-3 p-6">
      {articles &&
        articles.map((article, i) => <PostCard article={article} key={i} />)}
    </div>
  )
}
