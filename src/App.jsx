import { Routes, Route } from 'react-router'
import { AuthProvider } from '~contexts/AuthContext'
import SignUpPage from '~pages/SignUp/SignUpPage'

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
