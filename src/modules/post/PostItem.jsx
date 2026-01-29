import React from 'react'
import styled from 'styled-components'
import PostCategory from './PostCategory'
import PostTitle from './PostTitle'
import PostMeta from './PostMeta'
import PostImage from './PostImage'
import slugify from 'slugify/slugify'

const PostItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .post {
    &-image {
      height: 202px;
      margin-bottom: 20px;
      display: block;
      width: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 16px;
      }
    }
    &-category {
      margin-bottom: 16px;
    }
    &-info {
      color: #6b6b6b;
      margin-top: auto;
    }
    &-title {
      margin-bottom: 12px;
    }
  }
`
export const PostItem = ({ data }) => {
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date()
  const formatDate = new Date(date).toLocaleDateString('vi-VN')

  if (!data) return null

  return (
    <PostItemStyles>
      <PostImage
        url={
          data?.image ||
          'https://images.unsplash.com/photo-1570993492881-25240ce854f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2290&q=80'
        }
        alt={''}
        to={data?.slug}
      />

      <PostCategory to={data?.category?.slug}>
        {data?.category?.name}
      </PostCategory>
      <PostTitle to={data?.slug}>{data?.title}</PostTitle>
      <PostMeta
        to={(slugify(data?.user?.userName || ''), { lower: true })}
        authorName={data?.user?.name}
        date={formatDate}
      />
    </PostItemStyles>
  )
}
