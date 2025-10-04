import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const CustomField = ({ children }) => {
  return <FieldStyled>{children}</FieldStyled>
}

const FieldStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 40px;
  &:last-child {
    margin-bottom: 0;
  }
`

CustomField.propTypes = {
  children: PropTypes.node,
}

export default React.memo(CustomField)
