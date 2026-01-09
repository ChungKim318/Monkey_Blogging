import { createContext, useContext } from 'react'

const DropdownContext = createContext()
function DropdownProvider({ children, ...props }) {
  return (
    <DropdownContext.Provider value={props}>
      {children}
    </DropdownContext.Provider>
  )
}
function useDropdown() {
  const context = useContext(DropdownContext)
  if (typeof context === 'undefined') {
    throw new Error('useDropdown must be used within DropdownProvider')
  }
  return context
}

export { useDropdown, DropdownProvider }
