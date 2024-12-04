interface AuthTitleProps {
  title: string
}

export default function AuthTitle({ title }: AuthTitleProps) {
  return (
    <div className="text-base font-medium font-plusJakarta text-primary">
      {title}
    </div>
  )
}
