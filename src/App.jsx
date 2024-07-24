import { useState } from 'react'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Code from './components/Code'
import Contribute from './components/Contribute'
import Hackathons from './components/Hackathons'
import Profile from './components/Profile'
import Login from './components/login'
import Portal from './components/Portal'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Viewprof from './components/Viewprof'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element:<Home/>
    },
    {
      path: '/hackathons',
      element:<Hackathons/>
    },
    {
      path: '/profile',
      element:<Profile/>
    },
    {
      path: '/code',
      element:<Code/>
    },
    {
      path: '/contribute',
      element:<Contribute/>
    },
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: '/viewprof/:userId',
      element: <Viewprof/>
    },
    
    
  ])

  return (
    <>
      <Navbar/>
      <RouterProvider router={router} />
      
    </>
  )
}

export default App
