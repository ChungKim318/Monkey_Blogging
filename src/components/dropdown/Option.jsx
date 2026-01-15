import React from 'react'
import { useDropdown } from '~/contexts/DropdownContext'

const Option = props => {
  const { onClick } = props
  const { setShow } = useDropdown()

  const handleClick = () => {
    onClick && onClick()
    setShow(false)
  }

  return (
    <div
      className="px-5 py-4 cursor-pointer flex items-center justify-between hover:bg-gray-100 h-10"
      onClick={handleClick}>
      {props.children}
    </div>
  )
}

export default React.memo(Option)
