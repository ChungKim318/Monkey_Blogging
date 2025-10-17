import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { signOut } from 'firebase/auth'
import { auth } from '~/firebase/firebase.config'
import CustomButton from '~/components/button/CustomButton'
import Header from '~/components/header/Header'

const HomePage = () => {
  const handleSignOut = () => {
    signOut(auth)
  }

  console.log('test page')
  return (
    <HomePageStyles>
      <Header />
    </HomePageStyles>
  )
}

const HomePageStyles = styled.div``

export default React.memo(HomePage)
