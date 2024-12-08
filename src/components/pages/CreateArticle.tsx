import CenteredContainer from '../organisms/CenteredContainer'
import ArticleEditor from '../organisms/ArticleEditor'
import ParticlesBackground from '../molecules/Particles'

const CreateArticle = () => {
  return (
    <div className="w-full min-h-screen bg-primary">
      <CenteredContainer>
        <ArticleEditor />
      </CenteredContainer>
      <ParticlesBackground />
    </div>
  )
}

export default CreateArticle
