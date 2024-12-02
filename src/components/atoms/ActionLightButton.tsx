interface ActionLightButtonProps {
  actionText: string
}

export default function ActionLightButton({
  actionText,
}: ActionLightButtonProps) {
  return (
    <button className="px-6 py-4 bg-secondary text-primary text-base hover:scale-105 transition ease-in-out">
      {actionText}
    </button>
  )
}
