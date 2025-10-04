import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router'
import CustomInput from '~/components/input/CustomInput'
import CustomLabel from '~/components/label/CustomLabel'
import IconEyeClose from '~/components/icon/IconEyeClose'
import CustomField from '~/components/field/CustomField'
import IconEyeOpen from '~/components/icon/IconEyeOpen'
import CustomButton from '~/components/button/CustomButton'
import LoadingSpinner from '~/components/loading/LoadingSpinner'
import { SignUpSchema } from '~/helpers/yupSchema'
import { auth, db } from '~/firebase/firebase.config'

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

  const [togglePassword, setTogglePassword] = useState(false)

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

      await addDoc(colRef, {
        name: values.fullName,
        email: values.email,
        password: values.password,
        uid: user.user.uid,
      })

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
    <SignUpPageStyles>
      <div className="container">
        <img srcSet="/monkey.png 2x" alt="monkey-blogging" className="logo" />
        <h1 className="heading">Monkey Blogging</h1>
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
            <CustomInput
              control={control}
              type={togglePassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password">
              {!togglePassword ? (
                <IconEyeClose
                  onClick={() => setTogglePassword(!togglePassword)}
                />
              ) : (
                <IconEyeOpen
                  onClick={() => setTogglePassword(!togglePassword)}
                />
              )}
            </CustomInput>
          </CustomField>
          <CustomButton
            type="submit"
            style={{
              maxWidth: 300,
              margin: '0 auto',
            }}
            isLoading={isSubmitting}
            disabled={isSubmitting}>
            Sign Up
          </CustomButton>
        </form>
      </div>
    </SignUpPageStyles>
  )
}

const SignUpPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto 20px;
    display: block;
  }
  .heading {
    text-align: center;
    color: ${props => props.theme.primary};
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 60px;
  }
  .form {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`

export default SignUpPage
