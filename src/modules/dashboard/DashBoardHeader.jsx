import React from 'react'
import styled from 'styled-components'
import CustomButton from '~/components/button/CustomButton'

const DashBoardHeader = () => {
  return (
    <DashBoardHeaderStyles>
      <CustomButton
        to="/manage/add-post"
        className="header-button"
        height="52px">
        Write new post
      </CustomButton>
      <div className="header-avatar">
        <img
          src="https://i.pinimg.com/736x/11/de/fc/11defce1bbc28f8a2a810aaa241a104d.jpg"
          alt=""
        />
      </div>
    </DashBoardHeaderStyles>
  )
}

const DashBoardHeaderStyles = styled.div`
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  .header-avatar {
    width: 52px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }
`

export default React.memo(DashBoardHeader)
