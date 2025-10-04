import * as Yup from 'yup'

export const SignUpSchema = Yup.object({
  fullName: Yup.string().required('Please enter your username'),
  email: Yup.string()
    .email('Invalid email address')
    .matches(/^(?!.*@[^,]*,)/)
    .required('Please enter your email address'),
  password: Yup.string()
    .required('Please enter your password')
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      {
        message:
          'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character',
      }
    ),
})

export const SignInSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .matches(/^(?!.*@[^,]*,)/)
    .required('Please enter your email address'),
  password: Yup.string()
    .required('Please enter your password')
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      {
        message:
          'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character',
      }
    ),
})
