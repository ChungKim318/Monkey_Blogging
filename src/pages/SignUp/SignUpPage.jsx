import { yupResolver } from '@hookform/resolvers/yup'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import {
  //  addDoc,
  collection,
  setDoc,
  doc,
} from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import CustomButton from '~/components/button/CustomButton'
import CustomField from '~/components/field/CustomField'
import CustomInput from '~/components/input/CustomInput'
import InputPasswordToggle from '~/components/input/InputPasswordToggle'
import CustomLabel from '~/components/label/CustomLabel'
import { auth, db } from '~/firebase/firebase.config'
import { SignUpSchema } from '~/helpers/yupSchema'
import AuthenticationPage from '../Auth/AuthenticationPage'
import slugify from 'slugify/slugify'

const SignUpPage = () => {
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(SignUpSchema),
  })

  useEffect(() => {
    document.title = 'Register Page'
  }, [])

  useEffect(() => {
    const arrErrors = Object.values(errors)
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      })
    }
  }, [errors])

  const handleSignUp = async values => {
    if (!isValid) return

    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      )

      await updateProfile(auth.currentUser, {
        displayName: values.fullName,
      })
      const colRef = collection(db, 'users')

      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        name: values.fullName,
        email: values.email,
        password: values.password,
        userName: slugify(values.name, { lower: true }),
      })

      // await addDoc(colRef, {
      //   name: values.fullName,
      //   email: values.email,
      //   password: values.password,
      //   uid: user.user.uid,
      // })

      toast.success('Sign up successfully!')

      navigate('/')
    } catch (error) {
      toast.error(error.message, {
        pauseOnHover: false,
        delay: 0,
      })
    }
  }

  return (
    <AuthenticationPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignUp)}
        autoComplete="off">
        <CustomField>
          <CustomLabel htmlFor="fullName">Full Name</CustomLabel>
          <CustomInput
            control={control}
            type="text"
            name="fullName"
            placeholder="Enter your full name"></CustomInput>
        </CustomField>
        <CustomField>
          <CustomLabel htmlFor="email">Email</CustomLabel>
          <CustomInput
            control={control}
            type="email"
            name="email"
            placeholder="Enter your email"></CustomInput>
        </CustomField>
        <CustomField>
          <CustomLabel htmlFor="password">Password</CustomLabel>
          <InputPasswordToggle control={control} />
        </CustomField>
        <div className="have-account">
          Already have an account?
          <NavLink to="/sign-in">Login</NavLink>
        </div>
        <CustomButton
          type="submit"
          style={{
            with: '100%',
            maxWidth: 300,
            margin: '0 auto',
          }}
          isLoading={isSubmitting}
          disabled={isSubmitting}>
          Sign Up
        </CustomButton>
      </form>
    </AuthenticationPage>
  )
}

export default React.memo(SignUpPage)
