import React, { useMemo } from 'react'
import styled from 'styled-components'
import { v4 } from 'uuid'
import { NavLink } from 'react-router'
import CustomButton from '../button/CustomButton'
import { useAuth } from '~/contexts/AuthContext'
import { getLastName } from '~/helpers/getLastName'

const Header = () => {
  const menuLinks = useMemo(() => {
    return [
      {
        url: '/',
        name: 'Home',
      },
      {
        url: '/blog',
        name: 'Blog',
      },
      {
        url: '/contact',
        name: 'About',
      },
    ]
  }, [])

  const { userInfo } = useAuth()

  return (
    <HeaderStyles>
      <div className="container">
        <div className="header-main">
          <NavLink to="/">
            <img
              srcSet="/monkey.png 2x"
              alt="monkey-blogging"
              className="logo"
            />
          </NavLink>
          <ul className="menu">
            {menuLinks.map(item => (
              <li key={v4()} className="menu-item">
                <NavLink to={item.url} className="menu-link">
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="search">
            <input
              type="text"
              className="search-input"
              placeholder="Search post..."
            />
            <span className="search-icon">
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <ellipse
                  cx="7.66669"
                  cy="7.05161"
                  rx="6.66669"
                  ry="6.05161"
                  stroke="#999999"
                  strokeWidth="1.5"
                />
                <path
                  d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
          {!userInfo ? (
            <CustomButton height="56px" className="header-button" to="/sign-up">
              Sign Up
            </CustomButton>
          ) : (
            <div className="header-author">
              <span>Welcome back, </span>
              <strong className="text-primary">
                {getLastName(userInfo?.displayName)}
              </strong>
            </div>
          )}
        </div>
      </div>
    </HeaderStyles>
  )
}

const HeaderStyles = styled.div`
  padding: 40px 0;
  .header-main {
    display: flex;
    align-items: center;
  }
  .logo {
    display: block;
    max-width: 50px;
  }
  .menu {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 40px;
    font-weight: 500;
    list-style: none;
  }
  .search {
    margin-left: auto;
    padding: 15px 25px;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 100%;
    max-width: 320px;
    display: flex;
    align-items: center;
    position: relative;
    margin-right: 20px;
  }
  .search-input {
    flex: 1;
    padding-right: 45px;
    font-weight: 500;
  }
  .search-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 15px;
    cursor: pointer;
  }
  .header-button {
    margin-left: 20px;
  }
  .header-author {
  }
`

export default React.memo(Header)
