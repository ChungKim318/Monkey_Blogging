import { useParams } from 'react-router'
import React, { useEffect, useState } from 'react'
import Layout from '~/components/layout/Layout'
import { query, collection, where, onSnapshot } from 'firebase/firestore'
import { db } from '~/firebase/firebase.config'
import Heading from '~/components/layout/Heading'
import { PostItem } from '~/modules/post/PostItem'

const CategoryPage = () => {
  const [posts, setPosts] = useState([])

  const params = useParams()

  useEffect(() => {
    async function fetchData() {
      const docRef = query(
        collection(db, 'posts'),
        where('category.slug', '==', params.slug)
      )
      onSnapshot(docRef, snapshot => {
        let results = []
        snapshot.forEach(doc => {
          results.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        setPosts(results)
      })
    }
    fetchData()
  }, [params.slug])

  if (posts.length <= 0) return null

  return (
    <Layout>
      <div className="container">
        <Heading className="pt-10">Danh muc {params.slug}</Heading>
        <div className="grid-layout grid-layout--primary">
          {posts?.length > 0 &&
            posts.map(post => <PostItem key={post.id} data={post} />)}
        </div>
      </div>
    </Layout>
  )
}

export default React.memo(CategoryPage)
