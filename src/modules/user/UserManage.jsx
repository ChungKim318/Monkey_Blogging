import React from 'react'
import DashBoardHeading from '~/modules/dashboard/DashBoardHeading'

const UserManage = () => {
  return (
    <div>
      <DashBoardHeading
        title="Users"
        desc="Manage your user"></DashBoardHeading>
    </div>
  )
}

export default React.memo(UserManage)
