import { useParams } from 'react-router'
import { useGetPost } from '../../api/queries/Post'
import { useAuthContext } from '../../contexts/AuthContext'
import ParticlesBackground from '../molecules/Particles'
import CenteredContainer from '../organisms/CenteredContainer'

const Post = () => {
  const { authState } = useAuthContext()
  const { postId } = useParams()
  const { data, isLoading, error } = useGetPost(
    postId || '',
    authState.accessToken || '',
    {
      enabled: !!postId && !!authState.accessToken,
    }
  )

  const articleData = data?.data.data.article
  const assignmentData = data?.data.data.assignment

  return (
    <div className="w-full min-h-screen bg-primary">
      <CenteredContainer>
        {isLoading ? (
          <div className="text-center text-xl text-accent">Loading...</div>
        ) : error ? (
          <div className="text-center text-xl text-red-500">
            {`Error: ${error.message || 'Something went wrong.'}`}
          </div>
        ) : articleData ? (
          <div className="w-[48rem] p-4 bg-accent">
            <h1 className="text-3xl font-bold text-primary">
              {articleData.title}
            </h1>
            <div
              className="mt-4 text-primary"
              dangerouslySetInnerHTML={{ __html: articleData.content }}
            ></div>
          </div>
        ) : assignmentData ? (
          <div className="w-[48rem] p-4 bg-accent">
            <h1 className="text-3xl font-bold text-primary">Assignment</h1>
            <div
              className="mt-4 text-primary"
              dangerouslySetInnerHTML={{ __html: assignmentData.content }}
            ></div>
          </div>
        ) : (
          <div className="text-center text-xl text-accent">
            No data available.
          </div>
        )}
      </CenteredContainer>
      <ParticlesBackground />
    </div>
  )
}

export default Post
