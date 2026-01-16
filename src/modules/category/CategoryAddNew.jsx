import React from 'react'
import { useForm } from 'react-hook-form'
import slugify from 'slugify/slugify'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { toast } from 'react-toastify'
import DashBoardHeading from '~/modules/dashboard/DashBoardHeading'
import CustomField from '~/components/field/CustomField'
import CustomLabel from '~/components/label/CustomLabel'
import CustomInput from '~/components/input/CustomInput'
import Radio from '~/components/checkbox/Radio'
import CustomButton from '~/components/button/CustomButton'
import FieldCheckBox from '~/components/field/FieldCheckBox'
import { categoryStatus } from '~/utils/constants'
import { db } from '~/firebase/firebase.config'

const CategoryAddNew = () => {
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

  const watchStatus = watch('status')

  const handleAddNewCategory = async values => {
    if (!isValid) return

    const newValues = {
      ...values,
    }
    newValues.slug = slugify(newValues.name || newValues.slug, { lower: true })

    const colRef = collection(db, 'categories')
    try {
      await addDoc(colRef, {
        ...newValues,
        createdAt: serverTimestamp(),
      })
      toast.success('Create category successfully')
    } catch (error) {
      toast.error(error?.message)
    } finally {
      reset({
        name: '',
        slug: '',
        status: 1,
        createdAt: new Date(),
      })
    }
  }

  return (
    <div>
      <DashBoardHeading title="New category" desc="Add new category" />
      <form onSubmit={handleSubmit(handleAddNewCategory)} autoComplete="off">
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
          Add new category
        </CustomButton>
      </form>
    </div>
  )
}

export default React.memo(CategoryAddNew)
