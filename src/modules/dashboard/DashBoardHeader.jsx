import { Link, NavLink } from 'react-router'
import React from 'react'
import styled from 'styled-components'
import CustomButton from '~/components/button/CustomButton'
import { useAuth } from '~/contexts/AuthContext'

const DashBoardHeader = () => {
  const { userInfo } = useAuth()
  return (
    <DashBoardHeaderStyles>
      <NavLink to="/" className="logo">
        <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
        <span className="hidden lg:inline-block">Monkey Blogging</span>
      </NavLink>
      <div className="header-right">
        <CustomButton
          to="/manage/add-post"
          className="header-button"
          height="52px">
          Write new post
        </CustomButton>
        <Link to="/profile" className="header-avatar">
          <img
            src={
              userInfo?.avatar ||
              'https://i.pinimg.com/736x/11/de/fc/11defce1bbc28f8a2a810aaa241a104d.jpg'
            }
            alt=""
          />
        </Link>
      </div>
    </DashBoardHeaderStyles>
  )
}

const DashBoardHeaderStyles = styled.div`
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  .logo {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 18px;
    font-weight: 600;
    img {
      max-width: 40px;
    }
  }
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
  .header-right {
    display: flex;
    align-items: center;
    gap: 20px;
  }
`

export default React.memo(DashBoardHeader)
