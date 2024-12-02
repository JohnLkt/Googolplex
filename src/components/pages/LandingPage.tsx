import { useState } from 'react'
import LoginForm from '../organisms/Login'
import RegisterForm from '../organisms/Register'

function Landing() {
  const [authMode, setAuthMode] = useState(false)
  return (
    <div className="bg-primary text-accent text-3xl font-plusJakarta font-bold max-mobile:text-secondary">
      {authMode ? <RegisterForm /> : <LoginForm />}
      <button
        onClick={() => {
          setAuthMode(!authMode)
        }}
      >
        Change Mode
      </button>
    </div>
  )
}

export default Landing
