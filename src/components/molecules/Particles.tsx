import { useEffect, useMemo } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim' // For a lightweight bundle
import { MoveDirection, OutMode } from '@tsparticles/engine'

const ParticlesBackground = () => {
  useEffect(() => {
    // Initialize the particles engine once
    initParticlesEngine(loadSlim)
  }, [])

  // Use useMemo to memoize the particles configuration
  const particlesOptions = useMemo(
    () => ({
      fullScreen: {
        enable: true,
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: 'push',
          },
          onHover: {
            enable: true,
            mode: 'grab',
            distance: 300,
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          grab: {
            distance: 300,
            lineLinked: {
              opacity: 0.5,
            },
          },
        },
      },
      particles: {
        color: { value: '#ffffff' },
        links: {
          enable: true,
          distance: 150,
          color: '#ffffff',
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: OutMode.bounce,
          random: false,
          speed: 2,
          straight: false,
        },
        number: {
          density: { enable: true, area: 800 },
          value: 150,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    [] // Dependencies array ensures the memoized object doesn't change
  )

  return <Particles options={particlesOptions} />
}

export default ParticlesBackground
