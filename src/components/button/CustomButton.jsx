import React from 'react'
import styled, { StyleSheetManager, css } from 'styled-components'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router'
import LoadingSpinner from '../loading/LoadingSpinner'

const CustomButton = ({
  children,
  type = 'button',
  onClick = () => {},
  kind = 'primary',
  ...props
}) => {
  const { isLoading, to } = props
  const child = isLoading ? <LoadingSpinner></LoadingSpinner> : children
  if (to !== '' && typeof to === 'string') {
    return (
      <NavLink to={to} style={{ display: 'inline-block' }}>
        <StyleSheetManager shouldForwardProp={prop => prop !== 'isLoading'}>
          <CustomButtonStyles type={type} kind={kind} {...props}>
            {child}
          </CustomButtonStyles>
        </StyleSheetManager>
      </NavLink>
    )
  }
  return (
    <StyleSheetManager shouldForwardProp={prop => prop !== 'isLoading'}>
      <CustomButtonStyles type={type} kind={kind} onClick={onClick} {...props}>
        {child}
      </CustomButtonStyles>
    </StyleSheetManager>
  )
}

const CustomButtonStyles = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0 25px;
  line-height: 1;
  border-radius: 8px;
  font-weight: 600;
  font-size: 18px;
  height: ${props => props.height || '66px'};
  ${props =>
    props.kind === 'secondary' &&
    css`
      background-color: white;
      color: ${props => props.theme.primary};
    `};
  ${props =>
    props.kind === 'primary' &&
    css`
      color: white;
      background-image: linear-gradient(
        to right bottom,
        ${props => props.theme.blueLight},
        ${props => props.theme.greenLight}
      );
    `}
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`

CustomButton.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
  children: PropTypes.node,
  kind: PropTypes.oneOf(['primary', 'secondary']),
}

export default React.memo(CustomButton)
