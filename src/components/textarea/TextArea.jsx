import React from 'react'
import styled, { StyleSheetManager } from 'styled-components'
import PropTypes from 'prop-types'
import { useController } from 'react-hook-form'

const TextArea = ({
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
      <TextAreaStyles hasIcon={children ? true : false}>
        <textarea id={name} type={type} {...field} {...props} />
        {children && <div className="input-icon">{children}</div>}
      </TextAreaStyles>
    </StyleSheetManager>
  )
}

const TextAreaStyles = styled.div`
  position: relative;
  width: 100%;
  textarea {
    width: 100%;
    padding: ${props => (props.hasIcon ? '20px 60px 20px 20px' : '20px')};
    background-color: ${props => props.theme.grayLight};
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s linear;
    border: 1px solid transparent;
    resize: none;
    min-height: 200px;
  }
  textarea:focus {
    background-color: #fff;
    border-color: ${props => props.theme.primary};
  }
  textarea::-webkit-input-placeholder {
    color: #84878b;
  }
  textarea::-moz-input-placeholder {
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

TextArea.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node,
}

export default React.memo(TextArea)
