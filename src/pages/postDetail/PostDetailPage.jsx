import { useParams } from 'react-router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Heading from '~/components/layout/Heading'
import Layout from '~/components/layout/Layout'
import PostCategory from '~/modules/post/PostCategory'
import PostImage from '~/modules/post/PostImage'
import { PostItem } from '~/modules/post/PostItem'
import PostMeta from '~/modules/post/PostMeta'
import NotFoundPage from '../notFound/NotFoundPage'
import { db } from '~/firebase/firebase.config'
import { query, collection, where, onSnapshot } from 'firebase/firestore'
import parse from 'html-react-parser'

const PostDetailPage = () => {
  const { slug } = useParams()
  const [postInfo, setPostInfo] = useState({})
  const { user } = postInfo

  useEffect(() => {
    async function fetchData() {
      if (!slug) return
      const colRef = query(collection(db, 'posts'), where('slug', '==', slug))
      onSnapshot(colRef, snapshot => {
        snapshot.forEach(doc => {
          doc.data() && setPostInfo(doc.data())
        })
      })
    }
    fetchData()
  }, [slug])

  if (!slug || !postInfo?.title) return <NotFoundPage />
  if (!postInfo.title) return null

  console.log(postInfo)

  return (
    <PostDetailPageStyles>
      <Layout>
        <div className="container">
          <div className="post-header">
            <PostImage
              url={
                postInfo?.image ||
                'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2662&q=80'
              }
              className="post-feature"
            />
            <div className="post-info">
              <PostCategory className="mb-6">
                {postInfo.category?.name}
              </PostCategory>
              <h1 className="post-heading">{postInfo.title}</h1>
              <PostMeta />
            </div>
          </div>
          <div className="post-content">
            <div className="entry-content">{parse(postInfo.content || '')}</div>
            <div className="author">
              <div className="author-image">
                <img
                  src={
                    user?.avatar ||
                    'https://i.pinimg.com/1200x/70/95/00/709500826d1e49399ec1b30b06864dfd.jpg'
                  }
                  alt=""
                />
              </div>
              <div className="author-content">
                <h3 className="author-name">{user?.userName}</h3>
                <p className="author-desc">{user?.desc}</p>
              </div>
            </div>
          </div>
          <div className="post-related">
            <Heading>Bài viết liên quan</Heading>
            <div className="grid-layout grid-layout--primary">
              <PostItem />
              <PostItem />
              <PostItem />
              <PostItem />
            </div>
          </div>
        </div>
      </Layout>
    </PostDetailPageStyles>
  )
}

const PostDetailPageStyles = styled.div`
  padding-bottom: 100px;
  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 16px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }
  .author {
    margin-top: 40px;
    margin-bottom: 80px;
    display: flex;
    border-radius: 20px;
    background-color: ${props => props.theme.grayF3};
    &-image {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      border-radius: inherit;
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
      padding: 20px;
    }
    &-name {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
    }
    @media screen and (max-width: 1023.98px) {
      padding-bottom: 40px;
      .post {
        &-header {
          flex-direction: column;
        }
        &-feature {
          height: auto;
        }
        &-heading {
          font-size: 26px;
        }
        &-content {
          margin: 40px 0;
        }
      }
      .author {
        flex-direction: column;
        &-image {
          width: 100%;
          height: auto;
        }
      }
    }
  }
`

export default React.memo(PostDetailPage)
