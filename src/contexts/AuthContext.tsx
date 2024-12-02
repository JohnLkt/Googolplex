/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import {
  AuthContextInterface,
  ChildrenProps,
} from '../interfaces/AuthContextInterface'
import { jwtDecode } from 'jwt-decode'

export const initialState: AuthContextInterface = {
  accessToken: null,
  userId: null,
  username: null,
  email: null,
  profilePicture: null,
  isSet: false,
}

export type AuthContextType = {
  authState: AuthContextInterface
  setAuthState: (key: keyof AuthContextInterface, value: string) => void
}

export type jwtPayload = {
  id: string
  email: string
  name: string
  picture: string
  iat: number
  exp: number
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({
  children,
}: ChildrenProps): React.ReactElement => {
  const [authState, setState] = useState<AuthContextInterface>(initialState)

  const setAuthState = (
    key: keyof AuthContextInterface,
    value: string | null
  ): void => {
    // set to Context State
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }))
    // set to localStorage
    if (value) {
      localStorage.setItem(key, value)
    }
  }

  const finishedSettingState = (value: boolean): void => {
    setState((prevState) => ({
      ...prevState,
      ['isSet']: value,
    }))
  }

  useEffect(() => {
    if (!authState.accessToken) {
      const accessToken: string | null = localStorage.getItem('accessToken')
      if (accessToken) {
        const decodedToken = jwtDecode<jwtPayload>(accessToken)
        setAuthState('accessToken', accessToken)
        setAuthState('username', decodedToken?.name)
        setAuthState('email', decodedToken?.email)
        setAuthState('profilePicture', decodedToken?.picture)
        setAuthState('userId', decodedToken?.id)

        finishedSettingState(true)
      }
    }
  }, [authState])

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }

  return context
}
