export interface ChildrenProps {
  children?: React.ReactNode | React.ReactElement
}

export interface AuthContextInterface {
  accessToken: string | null
  userId: string | null
  username: string | null
  email: string | null
  profilePicture: string | null
  isSet: boolean
}
