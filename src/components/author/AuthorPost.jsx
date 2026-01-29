import React, { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '~/firebase/firebase.config'

const AuthorPost = ({ userId = '' }) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, 'users', userId)
      const docSnap = await getDoc(docRef)
      if (docSnap.data()) {
        setUser(docSnap.data())
      }
    }
    fetchData()
  }, [userId])

  if (!userId || !user?.userName) return null

  return (
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
        <h3 className="author-name">{user?.name}</h3>
        <p className="author-desc">{user?.description}</p>
      </div>
    </div>
  )
}

export default AuthorPost
