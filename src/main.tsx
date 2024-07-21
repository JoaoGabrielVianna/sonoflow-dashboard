import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Paginas
import LoginPage from './pages/login/index.tsx'
import DashboardPage from './pages/dashboard/index.tsx'

// Rotas
import App from './routers/app/App.tsx'
import { PrivateRouter } from './routers/private/PrivateRouter.tsx'

import './index.css'
import { AuthProvider } from './providers/AuthProvider.js'
import StudentsPage from './pages/students/index.tsx'
import StudentPage from './pages/student/index.tsx'
// import SandBoxPage from './pages/sandbox/index.tsx'
// import { DateProvider } from './providers/DateProvider.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: (
      <div className='h-screen flex items-center justify-center'>
        <h1>404 Error</h1>
      </div>
    ),
    children: [
      {
        path: '/',
        element:
          <AuthProvider>
            <LoginPage />
          </AuthProvider>
      },
      {
        path: '/dashboard',
        element:
          <AuthProvider>
            <PrivateRouter>
              <DashboardPage />
            </PrivateRouter>
          </AuthProvider>
      },
      {
        path: '/students',
        element:
          <AuthProvider>
            <PrivateRouter>
              <StudentsPage />
            </PrivateRouter>
          </AuthProvider>
      },
      {
        path: '/student/:id',
        element:
          <AuthProvider>
            <PrivateRouter>
              <StudentPage />
            </PrivateRouter>
          </AuthProvider>
      },
      {
        path: '/notification',
        element:
          <AuthProvider>
            <PrivateRouter>
              <h1>Notification</h1>
            </PrivateRouter>
          </AuthProvider>
      },
      {
        path: '/settings',
        element:
          <AuthProvider>
            <PrivateRouter>
              <h1>Settings</h1>
            </PrivateRouter>
          </AuthProvider>
      },
      // {
      //   path: '/sandbox',
      //   element:
      //     <AuthProvider>
      //       <PrivateRouter>
      //         <DateProvider>
      //           <SandBoxPage />
      //         </DateProvider>
      //       </PrivateRouter>
      //     </AuthProvider>
      // }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
