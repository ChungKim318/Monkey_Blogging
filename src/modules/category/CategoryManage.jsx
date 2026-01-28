import React, { useEffect, useState } from 'react'
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  query,
  where,
  limit,
  startAfter,
  getDocs,
} from 'firebase/firestore'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router'
import { debounce } from 'lodash'
import ActionDelete from '~/components/action/ActionDelete'
import ActionEdit from '~/components/action/ActionEdit'
import ActionView from '~/components/action/ActionView'
import CustomButton from '~/components/button/CustomButton'
import LabelStatus from '~/components/label/LabelStatus'
import Table from '~/components/table/Table'
import { db } from '~/firebase/firebase.config'
import DashBoardHeading from '~/modules/dashboard/DashBoardHeading'
import { categoryStatus } from '~/utils/constants'

const CATEGORY_PER_PAGE = 5

const CategoryManage = () => {
  const [categoryList, setCategoryList] = useState([])
  const [filter, setFilter] = useState('')
  const [lastDoc, setLastDoc] = useState()
  const [total, setTotal] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, 'categories')
      const newRef = filter
        ? query(
            colRef,
            where('name', '>=', filter || ''),
            where('name', '<=', filter + 'utf8')
          )
        : query(colRef, limit(CATEGORY_PER_PAGE))

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
        setCategoryList(result)
      })
      setLastDoc(lastVisible)
    }
    fetchData()
  }, [filter])

  const handleDeleteCategory = async docId => {
    const colRef = doc(db, 'categories', docId)
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
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
      }
    })
  }

  const handleInputFilter = debounce(e => {
    setFilter(e.target.value)
  }, 500)

  const handleLoadMoreCategory = async () => {
    const nextRef = query(
      collection(db, 'categories'),
      startAfter(lastDoc),
      limit(CATEGORY_PER_PAGE)
    )

    onSnapshot(nextRef, snapshot => {
      let result = []
      snapshot.forEach(doc => {
        result.push({
          id: doc.id,
          ...doc.data(),
        })
      })
      setCategoryList([...categoryList, ...result])
    })
    const documentSnapshots = await getDocs(nextRef)
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1]
    setLastDoc(lastVisible)
  }

  return (
    <div>
      <DashBoardHeading title="Categories" desc="Manage your category">
        <CustomButton kind="ghost" height="60px" to="/manage/add-category">
          Create category
        </CustomButton>
      </DashBoardHeading>
      <div className="mb-10 flex justify-end">
        <input
          type="text"
          placeholder="Search category..."
          className="py-4 px-5 border border-gray-300 rounded-lg outline-none"
          onChange={handleInputFilter}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.length > 0 &&
            categoryList.map(category => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  <span className="italic text-gray-400">{category.slug}</span>
                </td>
                <td>
                  {Number(category.status) === categoryStatus.APPROVED && (
                    <LabelStatus type="success">Approved</LabelStatus>
                  )}
                  {Number(category.status) === categoryStatus.UNAPPROVED && (
                    <LabelStatus type="warning">Unapproved</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <ActionView />
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-category?id=${category.id}`)
                      }
                    />
                    <ActionDelete
                      onClick={() => handleDeleteCategory(category.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {total > categoryList.length && (
        <div className="mt-10">
          <CustomButton className="mx-auto" onClick={handleLoadMoreCategory}>
            Load more
          </CustomButton>
        </div>
      )}
    </div>
  )
}

export default React.memo(CategoryManage)
