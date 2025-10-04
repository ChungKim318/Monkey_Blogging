import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { signOut } from 'firebase/auth'
import { auth } from '~/firebase/firebase.config'
import CustomButton from '~/components/button/CustomButton'

const HomePage = () => {
  const handleSignOut = () => {
    signOut(auth)
  }

  return (
    <HomePageStyles>
      <CustomButton onClick={handleSignOut}>Sign Out</CustomButton>
    </HomePageStyles>
  )
}

const HomePageStyles = styled.div``

export default React.memo(HomePage)
