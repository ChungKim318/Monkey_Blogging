import React from 'react'
import DashBoardHeading from '~/modules/dashboard/DashBoardHeading'
import UserTable from './UserTable'
import CustomButton from '~/components/button/CustomButton'

const UserManage = () => {
  return (
    <div>
      <DashBoardHeading
        title="Users"
        desc="Manage your user"></DashBoardHeading>
      <div className="flex justify-end mb-10">
        <CustomButton to="/manage/add-user" kind="ghost">
          Add new user
        </CustomButton>
      </div>
      <UserTable></UserTable>
    </div>
  )
}

export default React.memo(UserManage)
