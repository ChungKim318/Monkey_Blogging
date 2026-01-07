import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate, NavLink } from 'react-router'
import CustomField from '~/components/field/CustomField'
import CustomInput from '~/components/input/CustomInput'
import CustomLabel from '~/components/label/CustomLabel'
import { SignInSchema } from '~/helpers/yupSchema'
import IconEyeClose from '~/components/icon/IconEyeClose'
import IconEyeOpen from '~/components/icon/IconEyeOpen'
import CustomButton from '~/components/button/CustomButton'
import { auth } from '~/firebase/firebase.config'
import { useAuth } from '~/contexts/AuthContext'
import AuthenticationPage from '../Auth/AuthenticationPage'

const SignInPage = () => {
  const navigate = useNavigate()
  const { userInfo } = useAuth()
  // console.log('🚀 ~ SignInPage ~ userInfo:', userInfo)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(SignInSchema),
  })

  const [togglePassword, setTogglePassword] = useState(false)

  useEffect(() => {
    document.title = 'Login Page'
    if (userInfo?.email) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleSignIn = async values => {
    if (!isValid) return

    try {
      const user = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      )

      await navigate('/')

      toast.success('Sign in successfully', {
        pauseOnHover: false,
        delay: 0,
      })
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
        autoComplete="off"
        onSubmit={handleSubmit(handleSignIn)}>
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
              <IconEyeOpen onClick={() => setTogglePassword(!togglePassword)} />
            )}
          </CustomInput>
        </CustomField>
        <div className="have-account">
          Already have an account?
          <NavLink to="/sign-up">Register</NavLink>
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
          Sign In
        </CustomButton>
      </form>
    </AuthenticationPage>
  )
}

export default React.memo(SignInPage)
