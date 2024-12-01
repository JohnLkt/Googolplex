interface ActionDarkButtonProps {
  actionText: string
}

export default function ActionDarkButton({
  actionText,
}: ActionDarkButtonProps) {
  return (
    <button className="px-6 py-4 bg-primary text-accent text-base border border-1 border-accent hover:scale-105 transition ease-in-out">
      {actionText}
    </button>
  )
}
