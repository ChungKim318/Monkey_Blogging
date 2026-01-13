import { useForm } from 'react-hook-form'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import slugify from 'slugify/slugify'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import CustomField from '~/components/field/CustomField'
import CustomInput from '~/components/input/CustomInput'
import CustomLabel from '~/components/label/CustomLabel'
import CustomButton from '~/components/button/CustomButton'
import Radio from '~/components/checkbox/Radio'
import { DropDown } from '~/components/dropdown'
import { postStatus } from '~/utils/constants'
import ImageUpload from '~/components/image/ImageUpload'
import Toggle from '~/components/toggle/Toggle'
// import useFirebaseImage from '~/hooks/useFirebaseImage'

const PostAddNew = () => {
  const { control, watch, setValue, handleSubmit, getValues } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      slug: '',
      status: 2,
      category: '',
      hot: false,
    },
  })
  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState('')

  const fileInputRef = useRef(null)

  const watchStatus = watch('status')
  const watchCategory = watch('category')
  const watchHot = watch('hot')

  const addPostHandler = async values => {
    // values.preventDefault()
    const cloneValues = { ...values }
    cloneValues.slug = slugify(values.slug || values.title)
    cloneValues.status = Number(values.status)

    console.log('🚀 ~ addPostHandler ~ cloneValues:', cloneValues)
    // handleUploadImage(cloneValues.image)
  }

  // const { image, progress, handleSelectImage, handleDeleteImage } = useFirebaseImage(setValue, getValues)

  const handleUploadImage = file => {
    const storage = getStorage()
    const storageRef = ref(storage, 'images/' + file.name)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      snapshot => {
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(progressPercent)
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
          default:
            console.log('Nothing at all')
        }
      },
      error => {
        console.log('Error Update: ', error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          console.log('File available at', downloadURL)
          setImage(downloadURL)
        })
      }
    )
  }

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
              progress={progress}
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
          <CustomField>
            <CustomLabel>Author</CustomLabel>
            <CustomInput control={control} placeholder="Find the author" />
          </CustomField>
          <CustomField>
            <CustomLabel>Feature post</CustomLabel>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue('hot', !watchHot)}>
              {' '}
            </Toggle>
          </CustomField>
          {/* <CustomField>
            <CustomLabel>Category</CustomLabel>
            <DropDown>
              <DropDown.Option>Knowledge</DropDown.Option>
              <DropDown.Option>Blockchain</DropDown.Option>
              <DropDown.Option>Setup</DropDown.Option>
              <DropDown.Option>Nature</DropDown.Option>
              <DropDown.Option>Developer</DropDown.Option>
            </DropDown>
          </CustomField> */}

          <CustomButton type="submit" className="mx-auto w-62.5">
            Add new post
          </CustomButton>
        </div>
      </form>
    </PostAddNewStyles>
  )
}

const PostAddNewStyles = styled.div``

export default React.memo(PostAddNew)
