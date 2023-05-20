import React from 'react'
import { Routes, Route, BrowserRouter, Navigate, Link } from 'react-router-dom'
import { PublicLayout } from '../components/layout/public/PublicLayout'
import { Login } from '../components/user/Login'
import { Register } from '../components/user/Register'
import { PrivatecLayout } from '../components/layout/private/PrivateLayout'
import { Feed } from '../components/publication/Feed'
import { AuthProvider } from '../context/AuthProvider'


export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<PublicLayout></PublicLayout>}>
            <Route index element={<Login></Login>}></Route>
            <Route path='login' element={<Login></Login>}></Route>
            <Route path='registro' element={<Register></Register>}></Route>
          </Route>

          <Route path='/social' element={<PrivatecLayout></PrivatecLayout>}>
            <Route index element={<Feed></Feed>}></Route>
            <Route path='feed' element={<Feed></Feed>}></Route>
          </Route>


          <Route path='*' element={<><p><h1>Error 404 <Link to="/">Volver Al inicio</Link></h1></p></>}></Route>



        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
