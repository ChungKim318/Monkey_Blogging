import React from 'react'
import { DropdownProvider } from '~/contexts/DropdownContext'

const DropDown = ({ children, ...props }) => {
  return (
    <DropdownProvider {...props}>
      <div className="relative inline-block w-full">{children}</div>
    </DropdownProvider>
  )
}

export default React.memo(DropDown)
