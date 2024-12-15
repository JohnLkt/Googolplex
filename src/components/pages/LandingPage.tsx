import { useState } from 'react'
import LoginForm from '../organisms/Login'
import RegisterForm from '../organisms/Register'
import CenteredContainer from '../organisms/CenteredContainer'
import LandingTitle from '../atoms/LandingTitle'
import ParticlesBackground from '../molecules/Particles'

function Landing() {
  const [authMode, setAuthMode] = useState(false)

  return (
    <div className="font-plusJakarta z-10">
      <ParticlesBackground />
      <div className="w-full h-screen grid grid-cols-1 grid-rows-none lg:grid-rows-1 lg:grid-cols-2">
        <CenteredContainer className="bg-primary h-screen lg:h-auto">
          <div className="flex flex-col py-4 w-2/3">
            <LandingTitle
              title="Manage your educational pursuit with Googolplex"
              textColor="text-accent mb-4 max-mobile:mb-4"
            />
            <p className="text-accent">
              All-inclusive Learning Management System in your area
            </p>
          </div>
        </CenteredContainer>
        <CenteredContainer className="bg-accent z-20 flex flex-col h-screen lg:h-auto">
          <div className="w-3/5 py-4 z-20">
            <LandingTitle
              title="Find out how Googolplex helps you achieve your dreams"
              textColor="text-primary mb-4 max-mobile:mb-4"
            />
            {authMode ? <RegisterForm /> : <LoginForm />}

            <div className="flex flex-row space-x-1 mt-2 items-center text-sm">
              {authMode ? (
                <div>Don't have an account?</div>
              ) : (
                <div>Have registered before?</div>
              )}
              <button
                className="underline"
                onClick={() => {
                  setAuthMode(!authMode)
                }}
              >
                {authMode ? 'Log in' : 'Register'}
              </button>
            </div>
          </div>
        </CenteredContainer>
      </div>
    </div>
  )
}

export default Landing
