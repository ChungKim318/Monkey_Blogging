import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from '~/components/header/Header'
import PostNewestLarge from '../post/PostNewestLarge'
import PostNewestItem from '../post/PostNewestItem'
import { PostItem } from '../post/PostItem'
import Heading from '~/components/layout/Heading'
import { query, collection, where, onSnapshot, limit } from 'firebase/firestore'
import { db } from '~/firebase/firebase.config'
import { v4 } from 'uuid'

const HomeNewestStyles = styled.div`
  .layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 40px;
    margin-bottom: 64px;
    align-items: start;
  }
  .sidebar {
    padding: 28px 20px;
    background-color: #f3edff;
    border-radius: 16px;
  }
`
const HomeNewest = () => {
  const [posts, setPosts] = useState([])

  const [first, ...other] = posts

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, 'posts')
      const queries = query(
        colRef,
        where('status', '==', 1),
        where('hot', '==', false),
        limit(4)
      )
      onSnapshot(queries, snapshot => {
        let result = []
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
  }, [])

  if (posts.length <= 0) return null

  return (
    <HomeNewestStyles className="home-block">
      <div className="container">
        <Heading>Mới nhất</Heading>
        <div className="layout">
          <PostNewestLarge data={first}></PostNewestLarge>
          <div className="sidebar">
            {other.length > 0 &&
              other.map(item => (
                <PostNewestItem key={v4} data={item}></PostNewestItem>
              ))}
          </div>
        </div>
      </div>
    </HomeNewestStyles>
  )
}

export default HomeNewest
