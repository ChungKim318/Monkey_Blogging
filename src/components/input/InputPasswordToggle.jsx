import React, { Fragment, useState } from 'react'
import CustomInput from './CustomInput'
import IconEyeClose from '../icon/IconEyeClose'
import IconEyeOpen from '../icon/IconEyeOpen'

const InputPasswordToggle = ({ control }) => {
  const [togglePassword, setTogglePassword] = useState(false)
  if (!control) return null
  return (
    <Fragment>
      <CustomInput
        control={control}
        type={togglePassword ? 'text' : 'password'}
        name="password"
        placeholder="Enter your password">
        {!togglePassword ? (
          <IconEyeClose onClick={() => setTogglePassword(!togglePassword)} />
        ) : (
          <IconEyeOpen onClick={() => setTogglePassword(!togglePassword)} />
        )}
      </CustomInput>
    </Fragment>
  )
}

export default React.memo(InputPasswordToggle)
