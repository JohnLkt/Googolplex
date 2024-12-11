import React, { useEffect, useMemo } from 'react'
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
            quantity: 0,
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
          distance: 200,
          color: '#ffffff',
          opacity: 0.5,
          width: 1.3,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: OutMode.bounce,
          random: false,
          speed: 1,
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
    []
  )

  return <Particles options={particlesOptions} />
}

export default React.memo(ParticlesBackground)
