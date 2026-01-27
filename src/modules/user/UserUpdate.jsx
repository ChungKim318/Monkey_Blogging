import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router'
import { toast } from 'react-toastify'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import DashBoardHeading from '../dashboard/DashBoardHeading'
import ImageUpload from '~/components/image/ImageUpload'
import CustomField from '~/components/field/CustomField'
import CustomInput from '~/components/input/CustomInput'
import CustomLabel from '~/components/label/CustomLabel'
import FieldCheckBox from '~/components/field/FieldCheckBox'
import Radio from '~/components/checkbox/Radio'
import { userRole, userStatus } from '~/utils/constants'
import CustomButton from '~/components/button/CustomButton'
import { db } from '~/firebase/firebase.config'
// import useFirebaseImage from '~/hooks/useFirebaseImage'

const UserUpdate = () => {
  const {
    control,
    watch,
    handleSubmit,
    reset,
    /* 
    setValue, 
    getValues,
   */
    formState: { isSubmitting, isValid },
  } = useForm()

  const watchStatus = watch('status')
  const watchRole = watch('role')

  const [params] = useSearchParams()
  const userId = params.get('id')

  /* 
    configure image upload
    const imageUrl = getValues('avatar')
    const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl)?
    const imageName = imageRegex?.length > 0 ? imageRegex?.[1] : ''

    async function deleteAvatar() {
      const colRef = doc(db, 'users', userId)
      await updateDoc(colRef, {
        avatar: '',
      })
    }

    const { image, setImage, progress, handleResetUpload, handleSelectImage, handleDeleteImage } = useFirebaseImage(setValue, getValues, imageName, deleteAvatar)

    useEffect(() => {
      setImage(imageUrl)
      }, [imageUrl, setImage])
  */

  const handleUpdateUser = async values => {
    if (!isValid) return
    try {
      const colRef = doc(db, 'users', userId)
      await updateDoc(colRef, {
        ...values,
        // avatar: image
      })
      toast.success('Update user successfully!')
    } catch (error) {
      toast.error('Update user failed!')
      console.log(error)
    }
  }

  useEffect(() => {
    async function fetchData() {
      if (!userId) return
      try {
        const colRef = doc(db, 'users', userId)
        const docData = await getDoc(colRef)
        reset(docData && docData.data())
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [userId, reset])

  if (!userId) return null

  return (
    <div>
      <DashBoardHeading
        title="Update user"
        desc="Update user information"></DashBoardHeading>
      <form autoComplete="none" onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="w-50 h-50 rounded-full mx-auto mb-10">
          <ImageUpload
            className="rounded-full! h-full"
            /* 
                onChange={handleSelectImage}
                handleDeleteImage={handleDeleteImage}
                progress={progress}
                image={image}
                */
          />
        </div>
        <div className="form-layout">
          <CustomField>
            <CustomLabel>Fullname</CustomLabel>
            <CustomInput
              name="name"
              placeholder="Enter your fullname"
              control={control}></CustomInput>
          </CustomField>
          <CustomField>
            <CustomLabel>Username</CustomLabel>
            <CustomInput
              name="userName"
              placeholder="Enter your username"
              control={control}></CustomInput>
          </CustomField>
        </div>
        <div className="form-layout">
          <CustomField>
            <CustomLabel>Email</CustomLabel>
            <CustomInput
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"></CustomInput>
          </CustomField>
          <CustomField>
            <CustomLabel>Password</CustomLabel>
            <CustomInput
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"></CustomInput>
          </CustomField>
        </div>
        <div className="form-layout">
          <CustomField>
            <CustomLabel>Status</CustomLabel>
            <FieldCheckBox>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                value={userStatus.ACTIVE}>
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.PENDING}
                value={userStatus.PENDING}>
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.BANNED}
                value={userStatus.BANNED}>
                Banned
              </Radio>
            </FieldCheckBox>
          </CustomField>
          <CustomField>
            <CustomLabel>Role</CustomLabel>
            <FieldCheckBox>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.ADMIN}
                value={userRole.ADMIN}>
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.MODE}
                value={userRole.MODE}>
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.USER}
                value={userRole.USER}>
                User
              </Radio>
            </FieldCheckBox>
          </CustomField>
        </div>
        <CustomButton
          kind="primary"
          type="submit"
          className="mx-auto w-50"
          isLoading={isSubmitting}
          disabled={isSubmitting}>
          Update
        </CustomButton>
      </form>
    </div>
  )
}

export default React.memo(UserUpdate)
