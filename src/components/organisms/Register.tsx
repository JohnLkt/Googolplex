import React from 'react'
import { useRegister } from '../../api/queries/Auth'
import { useAuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { RegisterCredentials } from '../../interfaces/GrandInterface'
import Input from '../molecules/Input'
import AuthTitle from '../atoms/AuthTitle'

const RegisterForm: React.FC = () => {
  const { setAuthState } = useAuthContext()
  const navigate = useNavigate()
  const { mutate: register, isPending } = useRegister()

  const handleSubmit = (values: RegisterCredentials) => {
    register(values, {
      onSuccess: (response) => {
        console.log('Registration successful:', response.data)
        const data = response?.data?.data

        setAuthState('accessToken', data?.access_token)
        navigate('/dashboard')
      },
      onError: (err) => {
        console.error('Registration failed:', err)
      },
    })
  }

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required'),
  })

  return (
    <Formik<RegisterCredentials>
      initialValues={{ userName: '', email: '', password: '' }}
      validationSchema={RegisterSchema}
      onSubmit={(values) => {
        handleSubmit(values)
      }}
      validateOnChange={true}
      validateOnBlur={true}
    >
      <Form className="flex flex-col space-y-3">
        <AuthTitle title="Register now to chase your dreams" />
        <Input
          name="userName"
          type="text"
          label="Username"
          placeholder="Please enter a valid username"
        />
        <Input
          name="email"
          type="text"
          label="Email"
          placeholder="Please enter a valid email"
        />
        <Input
          name="password"
          type="password"
          label="Password"
          placeholder="Please enter a valid password"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-primary to-secondary p-3 rounded-md font-bold text-sm text-accent"
          disabled={isPending}
        >
          {isPending ? 'Submitting...' : 'Submit'}
        </button>
      </Form>
    </Formik>
  )
}

export default RegisterForm
