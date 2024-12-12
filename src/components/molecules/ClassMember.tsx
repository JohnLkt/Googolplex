import { UserClassMember } from '../../interfaces/GrandInterface'

export default function ClassMember({ ...classMember }: UserClassMember) {
  return (
    <div className="text-2xl text-accent font-plusJakarta">
      {classMember?.user?.name}
    </div>
  )
}
