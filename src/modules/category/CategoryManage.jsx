import React from 'react'
import DashBoardHeading from '~/modules/dashboard/DashBoardHeading'

const CategoryManage = () => {
  return (
    <div>
      <DashBoardHeading
        title="Categories"
        desc="Manage your category"></DashBoardHeading>
    </div>
  )
}

export default React.memo(CategoryManage)
