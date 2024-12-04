interface LandingTitleProps {
  title: string
  textColor: string
}

export default function LandingTitle({ title, textColor }: LandingTitleProps) {
  return (
    <div
      className={`w-full font-bold ${textColor} text-4xl max-mobile:text-2xl`}
    >
      {title}
    </div>
  )
}
