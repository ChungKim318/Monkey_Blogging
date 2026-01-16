import React from 'react'
import { useForm } from 'react-hook-form'
import CustomButton from '~/components/button/CustomButton'
import CustomField from '~/components/field/CustomField'
import ImageUpload from '~/components/image/ImageUpload'
import CustomInput from '~/components/input/CustomInput'
import CustomLabel from '~/components/label/CustomLabel'
import DashBoardHeading from '~/modules/dashboard/DashBoardHeading'

const UserProfile = () => {
  const { control } = useForm({
    mode: 'onChange',
  })
  return (
    <div>
      <DashBoardHeading
        title="Account information"
        desc="Update your account information"></DashBoardHeading>
      <form>
        <div className="text-center mb-10">
          <ImageUpload className="w-50 h-50 rounded-full! min-h-0 mx-auto"></ImageUpload>
        </div>
        <div className="form-layout">
          <CustomField>
            <CustomLabel>Fullname</CustomLabel>
            <CustomInput
              control={control}
              name="fullname"
              placeholder="Enter your fullname"></CustomInput>
          </CustomField>
          <CustomField>
            <CustomLabel>Username</CustomLabel>
            <CustomInput
              control={control}
              name="username"
              placeholder="Enter your username"></CustomInput>
          </CustomField>
        </div>
        <div className="form-layout">
          <CustomField>
            <CustomLabel>Date of Birth</CustomLabel>
            <CustomInput
              control={control}
              name="birthday"
              placeholder="dd/mm/yyyy"></CustomInput>
          </CustomField>
          <CustomField>
            <CustomLabel>Mobile Number</CustomLabel>
            <CustomInput
              control={control}
              name="phone"
              placeholder="Enter your phone number"></CustomInput>
          </CustomField>
        </div>
        <div className="form-layout">
          <CustomField>
            <CustomLabel>Email</CustomLabel>
            <CustomInput
              control={control}
              name="email"
              type="email"
              placeholder="Enter your email address"></CustomInput>
          </CustomField>
          <CustomField></CustomField>
        </div>
        <div className="form-layout">
          <CustomField>
            <CustomLabel>New Password</CustomLabel>
            <CustomInput
              control={control}
              name="password"
              type="password"
              placeholder="Enter your password"></CustomInput>
          </CustomField>
          <CustomField>
            <CustomLabel>Confirm Password</CustomLabel>
            <CustomInput
              control={control}
              name="confirmPassword"
              type="password"
              placeholder="Enter your confirm password"></CustomInput>
          </CustomField>
        </div>
        <CustomButton kind="primary" className="mx-auto w-50">
          Update
        </CustomButton>
      </form>
    </div>
  )
}

export default React.memo(UserProfile)
