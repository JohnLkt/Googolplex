import ParticlesBackground from '../molecules/Particles'
import AssignmentEditor from '../organisms/AssignmentEditor'
import CenteredContainer from '../organisms/CenteredContainer'

const CreateAssignment = () => {
  return (
    <div className="w-full min-h-screen bg-primary">
      <CenteredContainer>
        <AssignmentEditor />
      </CenteredContainer>
      <ParticlesBackground />
    </div>
  )
}

export default CreateAssignment
