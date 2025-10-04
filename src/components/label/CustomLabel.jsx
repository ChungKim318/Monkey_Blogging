import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const CustomLabel = ({ htmlFor = '', children, ...props }) => {
  return (
    <CustomLabelStyles htmlFor={htmlFor} {...props}>
      {children}
    </CustomLabelStyles>
  )
}

const CustomLabelStyles = styled.label`
  color: ${props => props.theme.primaryDark};
  font-weight: 600;
  cursor: pointer;
`

CustomLabel.propTypes = {
  htmlFor: PropTypes.string,
  children: PropTypes.node,
}

export default React.memo(CustomLabel)
