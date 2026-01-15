import React from 'react'
import { useDropdown } from '~/contexts/DropdownContext'

const Select = ({ placeholder = '' }) => {
  const { toggle, show } = useDropdown()
  return (
    <div
      className="flex items-center justify-between py-4 px-5 h-16.5 bg-[#E7ECF3] rounded-lg cursor-pointer font-medium"
      onClick={toggle}>
      <span className="mx-2">{placeholder}</span>
      <span>
        {show ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </span>
    </div>
  )
}

export default React.memo(Select)
