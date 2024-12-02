interface ClassTitleProps {
  subject: string
}

export default function ClassTitle({ subject }: ClassTitleProps) {
  return <div className="text-xl text-primary font-semibold">{subject}</div>
}
