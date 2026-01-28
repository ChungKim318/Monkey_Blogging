import React, { useEffect, useMemo, useState } from 'react'
import DashBoardHeading from '../dashboard/DashBoardHeading'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import CustomField from '~/components/field/CustomField'
import CustomLabel from '~/components/label/CustomLabel'
import CustomInput from '~/components/input/CustomInput'
import ImageUpload from '~/components/image/ImageUpload'
import DropDown from '~/components/dropdown/DropDown'
import { postStatus } from '~/utils/constants'
import Radio from '~/components/checkbox/Radio'
import CustomButton from '~/components/button/CustomButton'
import Toggle from '~/components/toggle/Toggle'
import {
  doc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
  updateDoc,
} from 'firebase/firestore'
import { db } from '~/firebase/firebase.config'
import FieldCheckBox from '~/components/field/FieldCheckBox'
import { useSearchParams } from 'react-router'
import ReactQuill, { Quill } from 'react-quill-new'
import ImageUploader from 'quill-image-uploader'
import axios from 'axios'
Quill.register('modules/imageUploader', ImageUploader)
import 'react-quill-new/dist/quill.snow.css'

const PostUpdate = () => {
  const [selectCategory, setSelectCategory] = useState(null)
  const [categories, setCategories] = useState([])
  const [content, setContent] = useState('')

  const [params] = useSearchParams()
  const postId = params.get('id')

  const modules = useMemo(
    () => ({
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote'],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['link', 'image'],
      ],
      imageUploader: {
        upload: async file => {
          const bodyFormData = new FormData()
          bodyFormData.append('image', file)
          const res = await axios({
            method: 'post',
            url: 'https://api.imgbb.com/1/upload?key=9a3490a7ac19927dd5bfdeb837d95768',
            data: bodyFormData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          return res.data.data.url
        },
      },
    }),
    []
  )

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {},
  })

  const watchStatus = watch('status')
  const watchHot = watch('hot')

  useEffect(() => {
    async function getCategoriesData() {
      const colRef = collection(db, 'categories')
      const q = query(colRef, where('status', '==', 1))
      const querySnapshot = await getDocs(q)
      let result = []
      querySnapshot.forEach(doc => {
        result.push({
          id: doc.id,
          ...doc.data(),
        })
      })
      setCategories(result)
    }
    getCategoriesData()
  }, [])

  useEffect(() => {
    async function fetchData() {
      if (!postId) return

      const docRef = doc(db, 'posts', postId)
      const docSnapshot = await getDoc(docRef)

      if (docSnapshot.data()) {
        reset(docSnapshot.data())
        setSelectCategory(docSnapshot.data()?.category || '')
        setContent(docSnapshot.data()?.content || '')
      }
    }
    fetchData()
  }, [postId, reset])

  const handleUpdatePost = async values => {
    if (!isValid) return
    try {
      const docRef = doc(db, 'posts', postId)
      await updateDoc(docRef, {
        ...values,
        content,
      })
      toast.success('Update post successfully!')
    } catch (error) {
      toast.error('Update post failed!')
      console.log(error)
    }
  }

  const handleClickOption = async item => {
    const colRef = doc(db, 'categories', item.id)
    const docData = await getDoc(colRef)
    setValue('category', {
      id: docData.id,
      ...docData.data(),
    })
    setSelectCategory(item)
  }

  /* 
    configure image upload
    const imageUrl = getValues('image')
    const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl)?
    const imageName = imageRegex?.length > 0 ? imageRegex?.[1] : ''

    async function deletePostImage() {
      const colRef = doc(db, 'posts', postId)
      await updateDoc(colRef, {
        avatar: '',
      })
    }

    const { image, setImage, progress, handleResetUpload, handleSelectImage, handleDeleteImage } = useFirebaseImage(setValue, getValues, imageName, deletePostImage)

    useEffect(() => {
      setImage(imageUrl)
      }, [imageUrl, setImage])
  */

  if (!postId) return null

  return (
    <div>
      <DashBoardHeading
        title="Update post"
        desc="Update post content"></DashBoardHeading>
      <form onSubmit={handleSubmit(handleUpdatePost)}>
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
        </div>
        <div className="form-layout">
          <CustomField>
            <CustomLabel>Image</CustomLabel>
            <ImageUpload
              image="https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2662&q=80"
              // onChange={onSelectImage}
              // // progress={progress}
              // image={image}
              // handleDeleteImage={handleDeleteImage}
            />
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
            {/* {selectCategory?.name && (
              <span className="inline-block p-3 text-sm font-medium text-green-600 rounded-lg bg-green-50">
                {selectCategory?.name}
              </span>
            )} */}
          </CustomField>
        </div>
        <div className="mb-10">
          <CustomField>
            <CustomLabel>Content</CustomLabel>
            <div className="w-full entry-content">
              <ReactQuill
                modules={modules}
                theme="snow"
                value={content}
                onChange={setContent}
              />
            </div>
          </CustomField>
        </div>
        <div className="form-layout">
          <CustomField>
            <CustomLabel>Status</CustomLabel>
            <FieldCheckBox>
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
            </FieldCheckBox>
          </CustomField>
          <CustomField>
            <CustomLabel>Feature post</CustomLabel>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue('hot', !watchHot)}></Toggle>
          </CustomField>
        </div>
        <CustomButton
          type="submit"
          className="mx-auto"
          isLoading={isSubmitting}
          disabled={isSubmitting}>
          Add new post
        </CustomButton>
      </form>
    </div>
  )
}

export default React.memo(PostUpdate)
