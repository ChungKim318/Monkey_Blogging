import { Routes, Route } from 'react-router'
import { AuthProvider } from '~contexts/AuthContext'
import SignUpPage from '~pages/SignUp/SignUpPage'
import SignInPage from '~pages/SignIn/SignInPage'
import HomePage from '~/pages/home/HomePage'
import NotFoundPage from '~pages/notFound/NotFoundPage'
import PostDetailPage from '~pages/postDetail/PostDetailPage'
import DashBoardPage from '~pages/dashBoard/DashBoardPage'
import PostManage from '~modules/post/PostManage'
import DashBoardLayout from '~modules/dashboard/DashBoardLayout'
import PostAddNew from '~modules/post/PostAddNew'

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/:slug" element={<PostDetailPage />} />
          <Route element={<DashBoardLayout />}>
            <Route path="/dashboard" element={<DashBoardPage />} />
            <Route path="/manage/post" element={<PostManage />} />
            <Route path="/manage/add-post" element={<PostAddNew />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
