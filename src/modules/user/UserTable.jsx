import React, { useEffect, useState } from 'react'
import Table from '~/components/table/Table'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
// import { deleteUser } from 'firebase/auth'
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  startAfter,
  limit,
  getDocs,
} from 'firebase/firestore'
import { db } from '~/firebase/firebase.config'
import ActionEdit from '~/components/action/ActionEdit'
import ActionDelete from '~/components/action/ActionDelete'
import { userRole, userStatus } from '~/utils/constants'
import LabelStatus from '~/components/label/LabelStatus'
import CustomButton from '~/components/button/CustomButton'

const USER_PER_PAGE = 5

const UserTable = () => {
  const navigate = useNavigate()

  const [userList, setUserList] = useState([])
  const [lastDoc, setLastDoc] = useState()
  const [total, setTotal] = useState(0)

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, 'users')
      const newRef = query(colRef, limit(USER_PER_PAGE))

      const documentSnapshots = await getDocs(newRef)
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1]

      onSnapshot(colRef, snapshot => {
        setTotal(snapshot.size)
      })
      onSnapshot(newRef, snapshot => {
        let results = []
        snapshot.forEach(doc => {
          results.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        setUserList(results)
      })
      setLastDoc(lastVisible)
    }
    fetchData()
  }, [])

  const renderLabelStatus = status => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type="success">Active</LabelStatus>
      case userStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>
      case userStatus.BANNED:
        return <LabelStatus type="danger">Banned</LabelStatus>
      default:
        break
    }
  }

  const renderRole = role => {
    switch (role) {
      case userRole.ADMIN:
        return 'Admin'
      case userRole.MODE:
        return 'Moderator'
      case userRole.USER:
        return 'User'
      default:
        break
    }
  }

  const handleDeleteUser = async user => {
    const colRef = doc(db, 'users', user.id)
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
        // await deleteUser(user)
        toast.success('Delete user successfully!')
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
      }
    })
  }

  const handleLoadMore = async () => {
    const nextRef = query(
      collection(db, 'users'),
      startAfter(lastDoc),
      limit(USER_PER_PAGE)
    )
    onSnapshot(nextRef, snapshot => {
      let result = []
      snapshot.forEach(doc => {
        result.push({
          id: doc.id,
          ...doc.data(),
        })
      })
      setUserList([...userList, ...result])
    })
    const documentSnapshots = await getDocs(nextRef)
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1]
    setLastDoc(lastVisible)
  }

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Info</th>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 &&
            userList.map(user => (
              <tr key={user.id}>
                <td title={user?.id}>{user?.id.slice(0, 5) + '...'}</td>
                <td className="whitespace-nowrap">
                  <div className="flex items-center gap-x-3">
                    <img
                      src={
                        user?.avatar
                          ? user?.avatar
                          : 'https://instagram.fsgn5-13.fna.fbcdn.net/v/t51.82787-15/553513399_18544710658022893_6046173997086846431_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=101&ig_cache_key=MzcyOTU4OTgyNjgwMzc4NzY3Mw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMS5zZHIuQzMifQ%3D%3D&_nc_ohc=lHdKB1QaJQIQ7kNvwEqn6YS&_nc_oc=Adl5LjJQyPtdU9tT07TkVA6zU5W172B4zWwPnWRaBO1spIEtfXPw2u-WIdhNMBDW2MU&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fsgn5-13.fna&_nc_gid=VZYjTVG82ztnykh_sf6qhA&oh=00_Afrz7MEJeZWmeUmeCGJUIqwx6dU6pCCm1BDFd5UQU0PXOg&oe=697E8D19'
                      }
                      alt=""
                      className="w-10 h-10 object-cover rounded-md shrink-0"
                    />
                    <div className="flex-1">
                      <h3>{user?.name}</h3>
                      <time className="text-sm text-gray-300">
                        {user?.createdAt
                          ? new Date(
                              user?.createdAt?.seconds * 1000
                            ).toLocaleDateString('vi-VN')
                          : new Date().toLocaleDateString()}
                      </time>
                    </div>
                  </div>
                </td>
                <td>{user?.userName}</td>
                <td title={user?.email}>{user?.email.slice(0, 5) + '...'}</td>

                <td>{renderLabelStatus(Number(user?.status))}</td>
                <td>{renderRole(Number(user?.role))}</td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-user?id=${user.id}`)
                      }
                    />
                    <ActionDelete onClick={() => handleDeleteUser(user)} />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {total > userList.length && (
        <div className="mt-10">
          <CustomButton className="mx-auto" onClick={handleLoadMore}>
            Load more
          </CustomButton>
        </div>
      )}
    </div>
  )
}

export default React.memo(UserTable)
