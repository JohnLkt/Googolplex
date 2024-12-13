interface ActionCustomButtonInterface {
  actionText: string
  onClick: () => void
}

export default function ActionCustomkButton(prop: ActionCustomButtonInterface) {
  return (
    <button
      onClick={prop.onClick}
      className="px-6 py-2 max-mobile:px-4 max-mobile:py-3 z-20 self-start bg-primary text-accent font-bold text-sm border border-1 border-accent hover:scale-105 transition ease-in-out"
    >
      {prop.actionText}
    </button>
  )
}
