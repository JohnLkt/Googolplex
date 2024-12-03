import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim' // For a lightweight bundle
import { MoveDirection, OutMode } from '@tsparticles/engine'
// You can replace this with loadFull, loadAll, or other loaders if needed.

const ParticlesBackground = () => {
  const [init, setInit] = useState(false)

  useEffect(() => {
    // Initialize the particles engine
    initParticlesEngine(async (engine) => {
      await loadSlim(engine) // Loads the slim version of tsParticles
      setInit(true) // Marks initialization as complete
    })
  }, [])

  const particlesOptions = {
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
          distance: 300, // Distance within which particles are attracted to the cursor
          links: {
            opacity: 0.7, // Opacity of the link during the grab interaction
          },
        },
      },
    },
    particles: {
      color: {
        value: '#f1f1f2',
      },
      links: {
        color: '#f1f1f2',
        distance: 150,
        enable: true,
        opacity: 0.8,
        width: 1,
      },
      move: {
        direction: MoveDirection.none,
        enable: true,
        outModes: {
          default: OutMode.out,
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
        },
        value: 150,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    detectRetina: true,
  }

  if (!init) return null // Avoid rendering until initialization is complete

  return <Particles options={particlesOptions} />
}

export default ParticlesBackground
