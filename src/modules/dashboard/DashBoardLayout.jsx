import React from 'react'
import styled from 'styled-components'
import { Outlet } from 'react-router'
import DashBoardHeader from './DashBoardHeader'
import SideBar from './SideBar'

const DashBoardLayout = ({ children }) => {
  return (
    <DashBoardLayoutStyles>
      <DashBoardHeader />
      <div className="dashboard-main">
        <SideBar />
        <div className="dashboard-children">
          <Outlet></Outlet>
        </div>
      </div>
    </DashBoardLayoutStyles>
  )
}

const DashBoardLayoutStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  .dashboard {
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 40px;
      color: ${props => props.theme.primary};
      letter-spacing: 1px;
    }
    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      padding: 40px 20px;
      gap: 0 40px;
      align-items: start;
    }
  }
`

export default React.memo(DashBoardLayout)
