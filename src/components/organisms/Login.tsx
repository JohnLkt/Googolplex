import React, { useState } from 'react'
import { useLogin } from '../../api/queries/Auth'

const LoginForm: React.FC = () => {
  const {
    mutate: register,
    isPending,
    isError,
    error,
    isSuccess,
    data,
  } = useLogin()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    register(formData, {
      onSuccess: (response) => {
        console.log('Registration successful:', response.data)
      },
      onError: (err) => {
        console.error('Registration failed:', err)
      },
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </label>
      </div>
      <button type="submit" disabled={isPending}>
        {isPending ? 'Logging in...' : 'Login'}
      </button>
      {isError && <p>Error: {(error as Error).message}</p>}
      {isSuccess && <p>Success: {data?.data.message}</p>}
    </form>
  )
}

export default LoginForm
