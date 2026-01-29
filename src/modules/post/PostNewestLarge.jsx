import React from 'react'
import styled from 'styled-components'
import PostCategory from './PostCategory'
import PostTitle from './PostTitle'
import PostMeta from './PostMeta'
import PostImage from './PostImage'
import slugify from 'slugify/slugify'

const PostNewestLargeStyles = styled.div`
  .post {
    &-image {
      display: block;
      margin-bottom: 16px;
      height: 433px;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 10px;
    }
    &-title {
      margin-bottom: 10px;
    }
  }
`
const PostNewestLarge = ({ data }) => {
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date()
  const formatDate = new Date(date).toLocaleDateString('vi-VN')
  if (!data.id) return null

  return (
    <PostNewestLargeStyles>
      <PostImage
        url={
          data?.image ||
          'https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2294&q=80'
        }
        alt={''}
        to={data?.slug}
      />

      <PostCategory to={data?.category?.slug}>
        {data?.category?.name}
      </PostCategory>
      <PostTitle size="big" to={data?.slug}>
        {data?.title}
      </PostTitle>
      <PostMeta
        date={formatDate}
        authorName={data?.user?.name}
        to={slugify(data?.user?.userName || '', { lower: true })}
      />
    </PostNewestLargeStyles>
  )
}

export default PostNewestLarge
