import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import { auth } from './services/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { initializeSocket } from './services/socket'

// Pages (placeholder imports - will be created next)
const Dashboard = () => <div className="p-8"><h1>Dashboard</h1></div>
const Login = () => <div className="p-8"><h1>Login</h1></div>
const Projects = () => <div className="p-8"><h1>Projects</h1></div>

function App() {
  const { setUser, setLoading } = useAuthStore()

  useEffect(() => {
    // Initialize socket connection
    initializeSocket()

    // Set up auth listener
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || 'User',
          photoURL: firebaseUser.photoURL || undefined,
          createdAt: new Date(firebaseUser.metadata.creationTime || ''),
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [setUser, setLoading])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </Router>
  )
}

export default App
