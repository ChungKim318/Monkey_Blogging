import React from 'react'
import styled, { StyleSheetManager } from 'styled-components'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router'
import LoadingSpinner from '../loading/LoadingSpinner'

const CustomButton = ({
  children,
  type = 'button',
  onClick = () => {},
  ...props
}) => {
  const { isLoading, to } = props
  const child = isLoading ? <LoadingSpinner></LoadingSpinner> : children
  if (to !== '' && typeof to === 'string') {
    return (
      <NavLink to={to}>
        <StyleSheetManager shouldForwardProp={prop => prop !== 'isLoading'}>
          <CustomButtonStyles type={type} {...props}>
            {child}
          </CustomButtonStyles>
        </StyleSheetManager>
      </NavLink>
    )
  }
  return (
    <StyleSheetManager shouldForwardProp={prop => prop !== 'isLoading'}>
      <CustomButtonStyles type={type} onClick={onClick} {...props}>
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
  color: white;
  border-radius: 8px;
  font-weight: 600;
  font-size: 18px;
  height: ${props => props.height || '66px'};
  background-image: linear-gradient(
    to right,
    ${props => props.theme.blueLight},
    ${props => props.theme.greenLight}
  );
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
}

export default React.memo(CustomButton)
