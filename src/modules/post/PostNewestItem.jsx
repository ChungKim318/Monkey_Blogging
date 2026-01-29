import React from 'react'
import styled from 'styled-components'
import PostCategory from './PostCategory'
import PostTitle from './PostTitle'
import PostMeta from './PostMeta'
import PostImage from './PostImage'
import slugify from 'slugify/slugify'

const PostNewestItemStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #ccc;
  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }
  .post {
    &-image {
      display: block;
      flex-shrink: 0;
      width: 180px;
      height: 130px;
      border-radius: 12px;
    }
    &-category {
      margin-bottom: 8px;
    }
    &-title {
      margin-bottom: 8px;
    }
  }
`
const PostNewestItem = ({ data }) => {
  console.log('🚀 ~ PostNewestItem ~ item:', data)
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date()
  const formatDate = new Date(date).toLocaleDateString('vi-VN')
  return (
    <PostNewestItemStyles>
      <PostImage
        url={
          data?.image ||
          'https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2294&q=80'
        }
        alt={''}
        to={data?.slug}
      />

      <div className="post-content">
        <PostCategory type="secondary" to={data?.category?.slug}>
          {data?.category?.name}
        </PostCategory>
        <PostTitle to={data?.slug}>{data?.title}</PostTitle>
        <PostMeta
          date={formatDate}
          authorName={data?.user?.name}
          to={slugify(data?.user?.userName || '', { lower: true })}
        />
      </div>
    </PostNewestItemStyles>
  )
}

export default PostNewestItem
