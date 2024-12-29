import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Login from './pages/login/Login.jsx'
import Home from './pages/home/Home.jsx'
import Register from './pages/register/Register.jsx'
import Profile from './pages/profile/Profile.jsx'

let router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/profile/:username' element={<Profile/>}/>
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
<RouterProvider router={router}/>

)
