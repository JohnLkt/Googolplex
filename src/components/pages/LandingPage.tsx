import { useState } from 'react'
import LoginForm from '../organisms/Login'
import RegisterForm from '../organisms/Register'
import ActionDarkButton from '../atoms/ActionDarkButton'
import CenteredContainer from '../organisms/CenteredContainer'
import LandingTitle from '../atoms/LandingTitle'
import ParticlesBackground from '../molecules/Particles'

function Landing() {
  const [authMode, setAuthMode] = useState(false)
  return (
    <div className="font-plusJakarta z-10">
      <ParticlesBackground />
      <div className="w-full h-screen grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-2">
        <CenteredContainer className="bg-primary">
          <div className="flex flex-col gap-10 w-2/3">
            {/* <h1 className="text-6xl text-accent font-bold pb-4">
              Manage your educational pursuit with Googolplex
            </h1> */}
            <LandingTitle
              title="Manage your educational pursuit with Googolplex"
              textColor="text-accent"
            />
            <ActionDarkButton actionText={'Get Started'}></ActionDarkButton>
          </div>
        </CenteredContainer>
        <CenteredContainer className="bg-accent z-20 flex flex-col">
          <LandingTitle
            title="Find out how Googolplex helps you achieve your dreams"
            textColor="text-primary"
          />
          <div className="w-3/5 py-4 z-20 mt-3">
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
      <div>Footer</div>
    </div>
  )
}

export default Landing
