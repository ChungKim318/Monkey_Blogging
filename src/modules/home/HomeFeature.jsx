import React from 'react'
import styled from 'styled-components'
import Header from '~/components/header/Header'
import PostFeatureItem from '../post/PostFeatureItem'

const HomeFeatureStyles = styled.div``
const HomeFeature = () => {
  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <Header>Bài viết nổi bật</Header>
        <div className="grid-layout">
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
        </div>
      </div>
    </HomeFeatureStyles>
  )
}

export default HomeFeature
