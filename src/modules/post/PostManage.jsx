import React, { useEffect, useState } from 'react'
import CustomButton from '~/components/button/CustomButton'
import DropDown from '~/components/dropdown/DropDown'
import Table from '~/components/table/Table'
import {
  collection,
  query,
  where,
  limit,
  getDocs,
  onSnapshot,
  startAfter,
  doc,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '~/firebase/firebase.config'
import LabelStatus from '~/components/label/LabelStatus'
import { postStatus } from '~/utils/constants'
import { useNavigate } from 'react-router'
import ActionView from '~/components/action/ActionView'
import ActionEdit from '~/components/action/ActionEdit'
import ActionDelete from '~/components/action/ActionDelete'
import Swal from 'sweetalert2'
import { debounce } from 'lodash'

const POST_PER_PAGE = 5

const PostManage = () => {
  const [postList, setPostList] = useState([])
  const [filter, setFilter] = useState('')
  const [lastDoc, setLastDoc] = useState()
  const [total, setTotal] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, 'posts')
      const newRef = filter
        ? query(
            colRef,
            where('title', '>=', filter || ''),
            where('title', '<=', filter + 'utf8')
          )
        : query(colRef, limit(POST_PER_PAGE))

      const documentSnapshots = await getDocs(newRef)
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1]

      onSnapshot(colRef, snapshot => {
        setTotal(snapshot.size)
      })

      onSnapshot(newRef, snapshot => {
        let result = []
        snapshot.forEach(doc => {
          result.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        setPostList(result)
      })
      setLastDoc(lastVisible)
    }
    fetchData()
  }, [filter])

  const handleLoadMore = async () => {
    const nextRef = query(
      collection(db, 'posts'),
      startAfter(lastDoc),
      limit(POST_PER_PAGE)
    )

    onSnapshot(nextRef, snapshot => {
      let result = []
      snapshot.forEach(doc => {
        result.push({
          id: doc.id,
          ...doc.data(),
        })
      })
      setPostList([...postList, ...result])
    })
    const documentSnapshots = await getDocs(nextRef)
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1]
    setLastDoc(lastVisible)
  }

  const handleDeletePost = postId => {
    const colRef = doc(db, 'posts', postId)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        await deleteDoc(colRef)
        Swal.fire('Deleted!', 'Your post has been deleted.', 'success')
      }
    })
  }

  const handleSearchPost = debounce(e => {
    setFilter(e.target.value)
  }, 500)

  const renderPostStatus = status => {
    switch (status) {
      case postStatus.APPROVED:
        return <LabelStatus type="success">Approved</LabelStatus>
      case postStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>
      case postStatus.REJECTED:
        return <LabelStatus type="danger">Rejected</LabelStatus>
      default:
        break
    }
  }

  return (
    <div>
      <h1 className="dashboard-heading">Manage post</h1>
      <div className="mb-10 flex justify-end gap-5">
        <div className="w-full max-w-50">
          <DropDown>
            <DropDown.Select placeholder="Category"></DropDown.Select>
          </DropDown>
        </div>
        <div className="w-full max-w-75">
          <input
            type="text"
            className="w-full p-4 rounded-lg border border-solid border-gray-300"
            placeholder="Search post..."
            onChange={handleSearchPost}
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {postList.length > 0 &&
            postList.map(post => (
              <tr key={post.id}>
                <td title={post.id}>{post.id.slice(0, 6) + '...'}</td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <img
                      src={
                        post?.image ||
                        'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2662&q=80'
                      }
                      alt=""
                      className="w-16.5 h-13.75 rounded object-cover"
                    />
                    <div className="flex-1 whitespace-pre-wrap">
                      <h3 className="font-semibold max-w-75">{post?.title}</h3>
                      <time className="text-sm text-gray-500">
                        Date:{' '}
                        {new Date(
                          post?.createdAt?.seconds * 1000
                        ).toLocaleDateString('vi-VN')}
                      </time>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-gray-500">{post?.category?.name}</span>
                </td>
                <td>
                  <span className="text-gray-500">{post?.user?.name}</span>
                </td>
                <td>{renderPostStatus(post?.status)}</td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <ActionView
                      onClick={() => {
                        navigate(`/${post?.slug}`)
                      }}
                    />
                    <ActionEdit
                      onClick={() => {
                        navigate(`/manage/update-post?id=${post?.id}`)
                      }}
                    />
                    <ActionDelete onClick={() => handleDeletePost(post?.id)} />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {total > postList.length && (
        <CustomButton className="mx-auto w-50" onClick={handleLoadMore}>
          Load more
        </CustomButton>
      )}
    </div>
  )
}

export default React.memo(PostManage)
