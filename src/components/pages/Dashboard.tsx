import { useAuthContext } from '../../contexts/AuthContext'

function Dashboard() {
  const { authState, LogOut } = useAuthContext()
  return (
    <div className="bg-red-400">
      this is dashboard
      <div>
        <p>Welcome {authState?.username}</p>
        <p>email: {authState?.email}</p>
        <p>id: {authState?.userId}</p>
        <img
          src={authState?.profilePicture || 'https://placehold.co/600x400'}
        ></img>
      </div>
      <button
        onClick={() => {
          LogOut()
        }}
      >
        Log Out
      </button>
    </div>
  )
}

export default Dashboard
