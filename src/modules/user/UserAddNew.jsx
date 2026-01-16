import React from 'react'
import { useForm } from 'react-hook-form'
import CustomField from '~/components/field/CustomField'
import CustomInput from '~/components/input/CustomInput'
import CustomLabel from '~/components/label/CustomLabel'
import DashBoardHeading from '~modules/dashboard/DashBoardHeading'
import FieldCheckBox from '~/components/field/FieldCheckBox'
import Radio from '~/components/checkbox/Radio'
import CustomButton from '~/components/button/CustomButton'

const UserAddNew = () => {
  const { control } = useForm({
    mode: 'onChange',
  })
  return (
    <div>
      <DashBoardHeading
        title="New user"
        desc="Add new user to system"></DashBoardHeading>
      <form>
        <div className="form-layout">
          <CustomField>
            <CustomLabel>Fullname</CustomLabel>
            <CustomInput
              name="fullname"
              placeholder="Enter your fullname"
              control={control}></CustomInput>
          </CustomField>
          <CustomField>
            <CustomLabel>Username</CustomLabel>
            <CustomInput
              name="username"
              placeholder="Enter your username"
              control={control}></CustomInput>
          </CustomField>
        </div>
        <div className="form-layout">
          <CustomField>
            <CustomLabel>Email</CustomLabel>
            <CustomInput
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"></CustomInput>
          </CustomField>
          <CustomField>
            <CustomLabel>Password</CustomLabel>
            <CustomInput
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"></CustomInput>
          </CustomField>
        </div>
        <div className="form-layout">
          <CustomField>
            <CustomLabel>Status</CustomLabel>
            <FieldCheckBox>
              <Radio name="status" control={control}>
                Active
              </Radio>
              <Radio name="status" control={control}>
                Pending
              </Radio>
              <Radio name="status" control={control}>
                Banned
              </Radio>
            </FieldCheckBox>
          </CustomField>
          <CustomField>
            <CustomLabel>Role</CustomLabel>
            <FieldCheckBox>
              <Radio name="role" control={control}>
                Admin
              </Radio>
              <Radio name="role" control={control}>
                Moderator
              </Radio>
              <Radio name="role" control={control}>
                Editor
              </Radio>
              <Radio name="role" control={control}>
                User
              </Radio>
            </FieldCheckBox>
          </CustomField>
        </div>
        <CustomButton kind="primary" className="mx-auto w-50">
          Add new user
        </CustomButton>
      </form>
    </div>
  )
}

export default React.memo(UserAddNew)
