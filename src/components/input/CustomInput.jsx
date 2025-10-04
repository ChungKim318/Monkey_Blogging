import React, { Children } from 'react'
import styled, { StyleSheetManager } from 'styled-components'
import { useController } from 'react-hook-form'
import PropTypes from 'prop-types'
import IconEyeOpen from '../icon/IconEyeOpen'

const CustomInput = ({
  name = '',
  type = 'text',
  control,
  children,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: '',
  })
  return (
    <StyleSheetManager shouldForwardProp={prop => prop !== 'hasIcon'}>
      <CustomInputStyles hasIcon={children ? true : false}>
        <input id={name} type={type} {...field} {...props} />
        {children && <div className="input-icon">{children}</div>}
      </CustomInputStyles>
    </StyleSheetManager>
  )
}

const CustomInputStyles = styled.div`
  position: relative;
  width: 100%;
  input {
    width: 100%;
    padding: ${props => (props.hasIcon ? '20px 60px 20px 20px' : '20px')};
    background-color: ${props => props.theme.grayLight};
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s linear;
    border: 1px solid transparent;
  }
  input:focus {
    background-color: #fff;
    border-color: ${props => props.theme.primary};
  }
  input::-webkit-input-placeholder {
    color: #84878b;
  }
  input::-moz-input-placeholder {
    color: #84878b;
  }
  .input-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`

CustomInput.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node,
}

export default React.memo(CustomInput)
