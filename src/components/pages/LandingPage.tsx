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
            <LandingTitle />
            <ActionDarkButton actionText={'Get Started'}></ActionDarkButton>
          </div>
        </CenteredContainer>
        <CenteredContainer className="bg-accent">
          <div className="w-3/5 bg-slate-500 p-4">
            {authMode ? <RegisterForm /> : <LoginForm />}
            <button
              onClick={() => {
                setAuthMode(!authMode)
              }}
            >
              Change Mode
            </button>
          </div>
        </CenteredContainer>
      </div>
      <div>Footer</div>
    </div>
  )
}

export default Landing
