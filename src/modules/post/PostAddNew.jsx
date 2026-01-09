import { useForm } from 'react-hook-form'
import React from 'react'
import styled from 'styled-components'
import CustomField from '~/components/field/CustomField'
import CustomInput from '~/components/input/CustomInput'
import CustomLabel from '~/components/label/CustomLabel'
import CustomButton from '~/components/button/CustomButton'
import Radio from '~/components/checkbox/Radio'
import { DropDown } from '~/components/dropdown'
import slugify from 'slugify/slugify'
import { postStatus } from '~/utils/constants'

const PostAddNew = () => {
  const { control, watch, setValue, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      slug: '',
      status: 2,
      category: '',
    },
  })

  const watchStatus = watch('status')
  // console.log('🚀 ~ PostAddNew ~ watchStatus:', watchStatus)
  const watchCategory = watch('category')
  // console.log('🚀 ~ PostAddNew ~ watchCategory:', watchCategory)

  const addPostHandler = async values => {
    // values.preventDefault()
    const cloneValues = { ...values }
    cloneValues.slug = slugify(values.slug || values.title)
    cloneValues.status = Number(values.status)

    console.log('🚀 ~ addPostHandler ~ cloneValues:', cloneValues)
  }

  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add new post</h1>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
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
        <div className="grid grid-cols-2 gap-x-10 mb-10">
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
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <CustomField>
            <CustomLabel>Category</CustomLabel>
            <DropDown>
              <DropDown.Option>Knowledge</DropDown.Option>
              <DropDown.Option>Blockchain</DropDown.Option>
              <DropDown.Option>Setup</DropDown.Option>
              <DropDown.Option>Nature</DropDown.Option>
              <DropDown.Option>Developer</DropDown.Option>
            </DropDown>
          </CustomField>
          <CustomField></CustomField>
        </div>
        <CustomButton type="submit" className="mx-auto">
          Add new post
        </CustomButton>
      </form>
    </PostAddNewStyles>
  )
}

const PostAddNewStyles = styled.div``

export default React.memo(PostAddNew)
