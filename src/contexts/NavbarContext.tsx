import React, { createContext, useState, ReactNode } from 'react'

interface NavbarContextType {
  navbarItemSelected: string
  setNavbarItemSelected: React.Dispatch<React.SetStateAction<string>>
  navbarWiden: boolean
  setNavbarWiden: React.Dispatch<React.SetStateAction<boolean>>
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined)

export const NavbarProvider = ({ children }: { children: ReactNode }) => {
  const [navbarItemSelected, setNavbarItemSelected] = useState('Home')
  const [navbarWiden, setNavbarWiden] = useState(false)

  return (
    <NavbarContext.Provider
      value={{
        navbarItemSelected,
        setNavbarItemSelected,
        navbarWiden,
        setNavbarWiden,
      }}
    >
      {children}
    </NavbarContext.Provider>
  )
}

export default NavbarContext // Export the context separately for use in hooks
