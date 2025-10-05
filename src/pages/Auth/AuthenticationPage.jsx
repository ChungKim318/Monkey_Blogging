import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router'

const AuthenticationPage = ({ children }) => {
  return (
    <AuthenticationPageStyles>
      <div className="container">
        <NavLink to="/">
          <img srcSet="/monkey.png 2x" alt="monkey-blogging" className="logo" />
        </NavLink>
        <h1 className="heading">Monkey Blogging</h1>
        {children}
      </div>
    </AuthenticationPageStyles>
  )
}

const AuthenticationPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto 20px;
    display: block;
  }
  .heading {
    text-align: center;
    color: ${props => props.theme.primary};
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 60px;
  }
  .form {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  .have-account {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
    a {
      display: block;
      color: ${props => props.theme.primary};
      font-weight: 500;
      margin-left: 5px;
    }
  }
`

AuthenticationPage.propTypes = {
  children: PropTypes.node,
}

export default React.memo(AuthenticationPage)
