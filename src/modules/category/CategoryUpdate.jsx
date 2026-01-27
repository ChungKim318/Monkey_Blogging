import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { useForm } from 'react-hook-form'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import slugify from 'slugify/slugify'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import DashBoardHeading from '../dashboard/DashBoardHeading'
import CustomField from '~/components/field/CustomField'
import CustomLabel from '~/components/label/CustomLabel'
import CustomInput from '~/components/input/CustomInput'
import FieldCheckBox from '~/components/field/FieldCheckBox'
import Radio from '~/components/checkbox/Radio'
import CustomButton from '~/components/button/CustomButton'
import { categoryStatus } from '~/utils/constants'
import { db } from '~/firebase/firebase.config'

const CategoryUpdate = () => {
  const {
    control,
    watch,
    reset,
    formState: { isSubmitting, isValid },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      slug: '',
      status: 1,
      createdAt: new Date(),
    },
  })

  const [params] = useSearchParams()
  const categoryId = params.get('id')
  const navigate = useNavigate()

  const watchStatus = watch('status')

  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, 'categories', categoryId)
      const singleDoc = await getDoc(colRef)
      reset(singleDoc.data())
    }
    fetchData()
  }, [categoryId, reset])

  const handleUpdateCategory = async values => {
    const colRef = doc(db, 'categories', categoryId)
    await updateDoc(colRef, {
      name: values.name,
      slug: slugify(values.slug || values.name, { lower: true }),
      status: Number(values.status),
    })
    toast.success('Update category successfully!')
    navigate('/manage/category')
  }

  if (!categoryId) return null

  return (
    <div>
      <DashBoardHeading
        title="Update Category"
        desc={`Update your category: ${categoryId}`}
      />
      <form onSubmit={handleSubmit(handleUpdateCategory)} autoComplete="off">
        <div className="form-layout">
          <CustomField>
            <CustomLabel>Name</CustomLabel>
            <CustomInput
              control={control}
              name="name"
              placeholder="Enter your category name"
              required></CustomInput>
          </CustomField>
          <CustomField>
            <CustomLabel>Slug</CustomLabel>
            <CustomInput
              control={control}
              name="slug"
              placeholder="Enter your slug"></CustomInput>
          </CustomField>
        </div>
        <div className="form-layout">
          <CustomField>
            <CustomLabel>Status</CustomLabel>
            <FieldCheckBox>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === 1}
                value={categoryStatus.APPROVED}>
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === 2}
                value={categoryStatus.UNAPPROVED}>
                Unapproved
              </Radio>
            </FieldCheckBox>
          </CustomField>
        </div>
        <CustomButton
          kind="primary"
          className="mx-auto w-50"
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}>
          Update category
        </CustomButton>
      </form>
    </div>
  )
}

export default CategoryUpdate
