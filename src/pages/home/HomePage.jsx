import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
// import { signOut } from 'firebase/auth'
// import { auth } from '~/firebase/firebase.config'
import Header from '~/components/header/Header'
import HomeBanner from '~/modules/home/HomeBanner'
import Layout from '~/components/layout/Layout'
import HomeFeature from '~/modules/home/HomeFeature'
import HomeNewest from '~/modules/home/HomeNewest'

const HomePage = () => {
  // const handleSignOut = () => {
  //   signOut(auth)
  // }

  return (
    <HomePageStyles>
      <Layout>
        <HomeBanner />
        <HomeFeature />
        <HomeNewest />
      </Layout>
    </HomePageStyles>
  )
}

const HomePageStyles = styled.div``

export default React.memo(HomePage)
