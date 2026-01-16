import { useForm } from 'react-hook-form'
import React, {
  useCallback,
  useEffect,
  useState,
  // useRef,
} from 'react'
import styled from 'styled-components'
import slugify from 'slugify/slugify'
import { toast } from 'react-toastify'
import {
  getStorage,
  ref,
  // uploadBytesResumable,
  // getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'
import CustomField from '~/components/field/CustomField'
import CustomInput from '~/components/input/CustomInput'
import CustomLabel from '~/components/label/CustomLabel'
import CustomButton from '~/components/button/CustomButton'
import Radio from '~/components/checkbox/Radio'
import { DropDown } from '~/components/dropdown'
import { postStatus } from '~/utils/constants'
import ImageUpload from '~/components/image/ImageUpload'
import Toggle from '~/components/toggle/Toggle'
import { db } from '~/firebase/firebase.config'
import { useAuth } from '~/contexts/AuthContext'
// import useFirebaseImage from '~/hooks/useFirebaseImage'

const PostAddNew = () => {
  const { userInfo } = useAuth()
  const { control, watch, setValue, handleSubmit, getValues, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      slug: '',
      status: 2,
      categoryId: '',
      hot: false,
      // image: '',
    },
  })
  // const [progress, setProgress] = useState(0)
  const [image, setImage] = useState('')
  const [categories, setCategories] = useState([])
  const [selectCategory, setSelectCategory] = useState('')
  const [loading, setLoading] = useState(false)

  // const fileInputRef = useRef(null)

  const watchStatus = watch('status')
  const watchHot = watch('hot')

  // const { image, progress, handleResetUpload, handleSelectImage, handleDeleteImage } = useFirebaseImage(setValue, getValues)

  const addPostHandler = async values => {
    // values.preventDefault()
    setLoading(true)
    try {
      const cloneValues = { ...values }
      cloneValues.slug = slugify(values.slug || values.title, {
        lower: true,
      })
      cloneValues.status = Number(values.status)
      const colRef = collection(db, 'posts')
      await addDoc(colRef, {
        ...cloneValues,
        userId: userInfo.uid,
        createdAt: serverTimestamp(),
        // image: cloneValues.image,
      })
      toast.success('Create post successfully')
      reset({
        title: '',
        slug: '',
        status: 2,
        categoryId: '',
        hot: false,
        // image: '',
      })
      // handleResetUpload()
      setSelectCategory({})
      // console.log('🚀 ~ addPostHandler ~ cloneValues:', cloneValues)
      // handleUploadImage(cloneValues.image)
    } catch (error) {
      setLoading(false)
      console.log('🚀 ~ addPostHandler ~ error:', error)
    } finally {
      setLoading(false)
    }
  }

  // const handleUploadImage = file => {
  //   const storage = getStorage()
  //   const storageRef = ref(storage, 'images/' + file.name)
  //   const uploadTask = uploadBytesResumable(storageRef, file)

  //   uploadTask.on(
  //     'state_changed',
  //     snapshot => {
  //       const progressPercent =
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       setProgress(progressPercent)
  //       switch (snapshot.state) {
  //         case 'paused':
  //           console.log('Upload is paused')
  //           break
  //         case 'running':
  //           console.log('Upload is running')
  //           break
  //         default:
  //           console.log('Nothing at all')
  //       }
  //     },
  //     error => {
  //       console.log('Error Update: ', error)
  //     },
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
  //         console.log('File available at', downloadURL)
  //         setImage(downloadURL)
  //       })
  //     }
  //   )
  // }

  const onSelectImage = e => {
    const file = e.target.files[0]
    if (!file) return
    setValue('image_name', file.name)
    // handleUploadImage(file)
  }

  const handleDeleteImage = () => {
    const storage = getStorage()

    const imageRef = ref(storage, 'images/' + getValues('image_name'))

    deleteObject(imageRef)
      .then(() => {
        console.log('Remove Image Successfully')
        setImage('')
      })
      .catch(error => {
        console.log('Can not delete image', error)
      })
  }

  const handleClickOption = item => {
    setValue('categoryId', item.id)
    setSelectCategory(item)
  }

  useEffect(() => {
    async function getData() {
      const colRef = collection(db, 'categories')
      const q = query(colRef, where('status', '==', 1))
      const querySnapshot = await getDocs(q)
      let result = []
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data())
        result.push({
          id: doc.id,
          ...doc.data(),
        })
      })
      console.log('🚀 ~ getData ~ result:', result)
      setCategories(result)
    }
    getData()
  }, [])

  useEffect(() => {
    document.title = 'Monkey Blogging - Add new post'
  }, [])

  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add new post</h1>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className="form-layout">
          <CustomField>
            <CustomLabel>Title</CustomLabel>
            <CustomInput
              control={control}
              placeholder="Enter your title"
              name="title"
              required
            />
          </CustomField>
          <CustomField>
            <CustomLabel>Slug</CustomLabel>
            <CustomInput
              control={control}
              placeholder="Enter your slug"
              name="slug"
            />
          </CustomField>
          <CustomField>
            <CustomLabel>Image</CustomLabel>
            <ImageUpload
              onChange={onSelectImage}
              // progress={progress}
              image={image}
              handleDeleteImage={handleDeleteImage}
            />
            {/* <input
              ref={fileInputRef}
              type="file"
              name="image"
              hidden
              onChange={onSelectImage}
            /> */}
            {/* <CustomButton onClick={() => fileInputRef.current.click()}>
              Choose Files
            </CustomButton> */}
          </CustomField>
          <CustomField>
            <CustomLabel>Category</CustomLabel>
            <DropDown>
              <DropDown.Select
                placeholder={`${
                  selectCategory?.name || 'Select category'
                }`}></DropDown.Select>
              <DropDown.List>
                {categories.length > 0 &&
                  categories.map(item => (
                    <DropDown.Option
                      key={item.id}
                      onClick={() => handleClickOption(item)}>
                      {item.name}
                    </DropDown.Option>
                  ))}
              </DropDown.List>
            </DropDown>
            {/* {selectCategory && (
              <span className="inline-block p-4 rounded-lg bg-gray-200 text-sm font-medium">
                {selectCategory.name}
              </span>
            )} */}
          </CustomField>
          <CustomField>
            <CustomLabel>Status</CustomLabel>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.APPROVED}
                value={postStatus.APPROVED}>
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                value={postStatus.PENDING}>
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECTED}
                value={postStatus.REJECTED}>
                Reject
              </Radio>
            </div>
          </CustomField>
          {/* <CustomField>
            <CustomLabel>Author</CustomLabel>
            <CustomInput control={control} placeholder="Find the author" />
          </CustomField> */}
          <CustomField>
            <CustomLabel>Feature post</CustomLabel>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue('hot', !watchHot)}>
              {' '}
            </Toggle>
          </CustomField>

          <CustomButton
            type="submit"
            className="mx-auto w-62.5"
            isLoading={loading}
            disabled={loading}>
            Add new post
          </CustomButton>
        </div>
      </form>
    </PostAddNewStyles>
  )
}

const PostAddNewStyles = styled.div``

export default React.memo(PostAddNew)
