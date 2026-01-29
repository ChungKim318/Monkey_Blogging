import { Routes, Route } from 'react-router'
import { AuthProvider } from '~contexts/AuthContext'
import React, { Suspense } from 'react'

const HomePage = React.lazy(() => import('~pages/home/HomePage'))
const SignUpPage = React.lazy(() => import('~pages/SignUp/SignUpPage'))
const SignInPage = React.lazy(() => import('~pages/SignIn/SignInPage'))
const NotFoundPage = React.lazy(() => import('~pages/notFound/NotFoundPage'))
const CategoryPage = React.lazy(() => import('~pages/category/CategoryPage'))
const PostDetailPage = React.lazy(
  () => import('~pages/postDetail/PostDetailPage')
)
const DashBoardLayout = React.lazy(
  () => import('~modules/dashboard/DashBoardLayout')
)
const DashBoardPage = React.lazy(() => import('~pages/dashBoard/DashBoardPage'))
const PostManage = React.lazy(() => import('~modules/post/PostManage'))
const PostAddNew = React.lazy(() => import('~modules/post/PostAddNew'))
const PostUpdate = React.lazy(() => import('~modules/post/PostUpdate'))
const CategoryManage = React.lazy(
  () => import('~modules/category/CategoryManage')
)
const CategoryAddNew = React.lazy(
  () => import('~modules/category/CategoryAddNew')
)
const CategoryUpdate = React.lazy(
  () => import('~modules/category/CategoryUpdate')
)
const UserManage = React.lazy(() => import('~modules/user/UserManage'))
const UserAddNew = React.lazy(() => import('~modules/user/UserAddNew'))
const UserUpdate = React.lazy(() => import('~modules/user/UserUpdate'))
const UserProfile = React.lazy(() => import('~modules/user/UserProfile'))

function App() {
  return (
    <div>
      <AuthProvider>
        <Suspense>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/:slug" element={<PostDetailPage />} />
            <Route element={<DashBoardLayout />}>
              <Route path="/dashboard" element={<DashBoardPage />} />
              <Route path="/manage/post" element={<PostManage />} />
              <Route path="/manage/add-post" element={<PostAddNew />} />
              <Route path="manage/update-post" element={<PostUpdate />} />
              <Route path="/manage/category" element={<CategoryManage />} />
              <Route path="/manage/add-category" element={<CategoryAddNew />} />
              <Route
                path="/manage/update-category"
                element={<CategoryUpdate />}
              />
              <Route path="/manage/user" element={<UserManage />} />
              <Route path="/manage/add-user" element={<UserAddNew />} />
              <Route path="manage/update-user" element={<UserUpdate />} />
              <Route path="/profile" element={<UserProfile />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </div>
  )
}

export default App
