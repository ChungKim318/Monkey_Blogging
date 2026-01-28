import React from 'react'
import PropTypes from 'prop-types'

const Toggle = props => {
  const { on, onClick, ...rest } = props

  return (
    <label>
      <input
        type="checkbox"
        checked={on}
        onClick={onClick}
        className="hidden-input"
        onChange={() => {}}
      />
      <div
        className={`inline-block w-17.5 h-10.5 relative cursor-pointer rounded-full p-1 transition-all ${
          on ? 'bg-green-500' : 'bg-gray-300'
        }`}
        {...rest}>
        <span
          className={`transition-all w-8.5 h-8.5 bg-white rounded-full inline-block ${
            on ? 'translate-x-8' : ''
          }`}></span>
      </div>
    </label>
  )
}

Toggle.propTypes = {
  on: PropTypes.bool,
  onClick: PropTypes.func,
}

export default React.memo(Toggle)
