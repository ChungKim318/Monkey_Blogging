import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router'

const NotFoundPage = () => {
  return (
    <NotFoundPageStyles>
      <NavLink to="/" className="logo">
        <img srcSet="/monkey.png 2x" alt="monkey-blogging" />
      </NavLink>
      <h1 className="heading">404 Not Found</h1>
      <NavLink to="/" className="back">
        Back to Home
      </NavLink>
    </NotFoundPageStyles>
  )
}

const NotFoundPageStyles = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .logo {
    display: block;
    margin-bottom: 40px;
  }
  .heading {
    font-size: 60px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .back {
    display: block;
    padding: 15px 30px;
    color: white;
    background-color: ${props => props.theme.primary};
    border-radius: 6px;
    font-weight: 500;
  }
`

export default React.memo(NotFoundPage)
