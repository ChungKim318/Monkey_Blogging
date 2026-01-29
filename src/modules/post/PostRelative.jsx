import React, { useEffect, useState } from 'react'
import Heading from '~/components/layout/Heading'
import { query, collection, where, onSnapshot } from 'firebase/firestore'
import { db } from '~/firebase/firebase.config'
import { PostItem } from './PostItem'

const PostRelative = ({ categoryId = '' }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchData() {
      const docRef = query(
        collection(db, 'posts'),
        where('categoryId', '==', categoryId)
      )
      onSnapshot(docRef, snapshot => {
        const result = []
        snapshot.forEach(doc => {
          result.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        setPosts(result)
      })
    }
    fetchData()
  }, [categoryId, posts])

  if (!categoryId || posts.length <= 0) return null

  return (
    <div className="post-related">
      <Heading>Bài viết liên quan</Heading>
      <div className="grid-layout grid-layout--primary">
        {posts.map(item => (
          <PostItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  )
}

export default PostRelative
