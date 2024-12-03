/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import { AuthContextInterface } from '../interfaces/AuthContextInterface'
import { ChildrenProps } from '../interfaces/GrandInterface'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router'

export const initialState: AuthContextInterface = {
  accessToken: localStorage.getItem('accessToken'),
  userId: localStorage.getItem('userId'),
  username: localStorage.getItem('username'),
  email: localStorage.getItem('email'),
  profilePicture: localStorage.getItem('profilePicture'),
}

export type AuthContextType = {
  authState: AuthContextInterface
  setAuthState: (key: keyof AuthContextInterface, value: string) => void
  LogOut: () => void
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
  const navigate = useNavigate()
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

  const LogOut = (): void => {
    localStorage.clear()
    setState(initialState)
    navigate('/')
  }

  useEffect(() => {
    if (authState.accessToken) {
      const decodedToken = jwtDecode<jwtPayload>(authState.accessToken)
      setAuthState('username', decodedToken?.name)
      setAuthState('email', decodedToken?.email)
      setAuthState('profilePicture', decodedToken?.picture)
      setAuthState('userId', decodedToken?.id)
    }
  }, [authState.accessToken])

  return (
    <AuthContext.Provider value={{ authState, setAuthState, LogOut }}>
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
