import { NavLink } from 'react-router'
import React from 'react'
import styled, { css } from 'styled-components'

const PostTitle = ({ children, className = '', size = 'normal', to = '/' }) => {
  return (
    <PostTitleStyles className={`post-title ${className}`} size={size}>
      <NavLink to={to}>{children}</NavLink>
    </PostTitleStyles>
  )
}

const PostTitleStyles = styled.h3`
  font-weight: 600;
  line-height: 1.5;
  display: block;
  a {
    display: block;
  }
  ${props =>
    props.size === 'normal' &&
    css`
      font-size: 18px;
    `};
  ${props =>
    props.size === 'big' &&
    css`
      font-size: 22px;
    `}
`

export default React.memo(PostTitle)
