/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import {
  AuthContextInterface,
  ChildrenProps,
} from '../interfaces/AuthContextInterface'

export const initialState: AuthContextInterface = {
  accessToken: null,
  username: null,
  email: null,
}

export type AuthContextType = {
  authState: AuthContextInterface
  setAuthState: (key: keyof AuthContextInterface, value: string) => void
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

  useEffect(() => {
    if (!authState.accessToken) {
      const access_token: string | null = localStorage.getItem('access_token')
      setAuthState('accessToken', access_token)
    }
    console.log(authState, 'authState')
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
