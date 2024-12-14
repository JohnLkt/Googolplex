export interface CommentCardProps {
  author: string
  comment: string
}
export const CommentCard = ({ ...commentProp }: CommentCardProps) => {
  return (
    <div className="text-accent bg-primary z-10 text-base font-medium w-1/2 max-mobile:w-full p-4 border-2 border-accent">
      <div className="flex flex-col space-y-3">
        <div className="text-base text-accent font-bold">
          {commentProp.author}
        </div>
        <div className="text-base text-accent font-normal">
          {commentProp.comment}
        </div>
      </div>
    </div>
  )
}
