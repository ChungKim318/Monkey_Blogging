import React, { useEffect } from 'react'
import styled from 'styled-components'
import { doc, getDoc } from 'firebase/firestore'
import slugify from 'slugify/slugify'
import PostCategory from './PostCategory'
import PostTitle from './PostTitle'
import PostMeta from './PostMeta'
import PostImage from './PostImage'
import { db } from '~/firebase/firebase.config'

const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 169px;
  .post {
    &-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 16px;
    }
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background: linear-gradient(
        179.77deg,
        #6b6b6b 36.45%,
        rgba(163, 163, 163, 0.622265) 63.98%,
        rgba(255, 255, 255, 0) 99.8%
      );
      mix-blend-mode: multiply;
      opacity: 0.6;
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  }

  @media screen and (min-width: 1024px) {
    height: 272px;
  }
`

const PostFeatureItem = ({ data }) => {
  const [category, setCategory] = React.useState('')
  const [user, setUser] = React.useState('')

  useEffect(() => {
    async function fetch() {
      const docRef = doc(db, 'categories', data.categoryId)
      const docSnap = await getDoc(docRef)
      setCategory(docSnap.data())
    }
    fetch()
  }, [data.categoryId])

  useEffect(() => {
    async function fetchUser() {
      if (data.userId) {
        const docRef = doc(db, 'users', data.userId)
        const docSnap = await getDoc(docRef)
        // console.log('🚀 ~ fetchUser ~ docSnap:', docSnap.data())
        if (docSnap.data()) {
          setUser(docSnap.data())
        }
      }
    }
    fetchUser()
  }, [data.userId])

  if (!data || !data.id) return null

  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date()
  const formatDate = new Date(date).toLocaleDateString('vi-VN')

  return (
    <PostFeatureItemStyles>
      <PostImage
        // url={data.image}
        url={
          'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2662&q=80'
        }
        alt={'unsplash'}
      />
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          {category?.name && (
            <PostCategory to={category.slug}>{category.name}</PostCategory>
          )}
          <PostMeta
            authorName={user?.name}
            to={(slugify(user?.name || ''), { lower: true })}
            date={formatDate}
          />
        </div>
        <PostTitle size="big" to={data.slug}>
          {data.title}
        </PostTitle>
      </div>
    </PostFeatureItemStyles>
  )
}

export default PostFeatureItem
