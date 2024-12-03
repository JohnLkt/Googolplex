import React from 'react'
import { useLogin } from '../../api/queries/Auth'
import { useAuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { LoginCredentials } from '../../interfaces/GrandInterface'
import Input from '../molecules/Input'

const LoginForm: React.FC = () => {
  const { setAuthState } = useAuthContext()
  const navigate = useNavigate()

  const { mutate: register, isPending } = useLogin()

  const handleSubmit = (values: LoginCredentials) => {
    register(values, {
      onSuccess: (response) => {
        console.log('Registration successful:', response?.data)
        const data = response?.data?.data

        setAuthState('accessToken', data?.access_token)
        navigate('/dashboard')
      },
      onError: (err) => {
        console.error('Registration failed:', err)
      },
    })
  }

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required'),
  })

  return (
    <Formik<LoginCredentials>
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        handleSubmit(values)
      }}
      validateOnChange={true}
      validateOnBlur={true}
    >
      <Form>
        <Input name="email" type="text" label="Email" placeholder="Email" />
        <Input
          name="password"
          type="password"
          label="Password"
          placeholder="Password"
        />
        <button type="submit" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit'}
        </button>
      </Form>
    </Formik>
  )
}

export default LoginForm
