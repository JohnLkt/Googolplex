interface LandingTitleProps {
  title: string
  textColor: string
}

export default function LandingTitle({ title, textColor }: LandingTitleProps) {
  return (
    <div className={`h-24 w-96 font-bold ${textColor} text-4xl`}>{title}</div>
  )
}
