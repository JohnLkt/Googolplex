import React, { createContext, useState, ReactNode } from 'react'

interface SidebarContextType {
  sidebarItemSelected: string
  setSidebarItemSelected: React.Dispatch<React.SetStateAction<string>>
  sidebarWiden: boolean
  setSidebarWiden: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarItemSelected, setSidebarItemSelected] = useState('Home')
  const [sidebarWiden, setSidebarWiden] = useState(false)

  console.log(sidebarWiden)

  return (
    <SidebarContext.Provider
      value={{
        sidebarItemSelected,
        setSidebarItemSelected,
        sidebarWiden,
        setSidebarWiden,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export default SidebarContext // Export the context separately for use in hooks
