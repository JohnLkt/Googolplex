interface ActionDarkButtonProps {
  actionText: string
}

export default function ActionDarkButton({
  actionText,
}: ActionDarkButtonProps) {
  return (
    <button className="px-6 py-4 z-20 self-start bg-primary text-accent font-bold text-sm border border-1 border-accent hover:scale-105 transition ease-in-out">
      {actionText}
    </button>
  )
}
