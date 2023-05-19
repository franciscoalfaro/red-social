import React from 'react'
import { Routes,Route,BrowserRouter,Navigate } from 'react-router-dom'
import { PublicLayout } from '../components/layout/public/PublicLayout'
import { Login } from '../components/user/Login'
import { Register } from '../components/user/Register'

export const Routing = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<PublicLayout></PublicLayout>}>
            <Route index element={<Login></Login>}></Route>
            <Route path='login' element={<Login></Login>}></Route>
            <Route path='registro' element={<Register></Register>}></Route>
        </Route>



    </Routes>
    </BrowserRouter>
  )
}
