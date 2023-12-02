import React from 'react'
import { Routes, Route, BrowserRouter, Navigate, Link } from 'react-router-dom'
import { PublicLayout } from '../components/layout/public/PublicLayout'
import { Login } from '../components/user/Login'
import { Register } from '../components/user/Register'
import { PrivateLayout } from '../components/layout/private/PrivateLayout'
import { Feed } from '../components/publication/Feed'
import { AuthProvider } from '../context/AuthProvider'
import { Logout } from '../components/user/Logout'
import { People } from '../components/user/People'
import { Config } from '../components/user/Config'
import { Following } from '../components/follow/Following'
import { Followers } from '../components/follow/Followers'
import { Profile } from '../components/user/Profile'
import { Footer } from '../components/layout/public/Footer'
import { Search } from '../components/user/Search'
import { Message } from '../components/user/Message'
import { Recovery } from '../components/user/Recovery'




export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<PublicLayout></PublicLayout>}>
            <Route index element={<Login></Login>}></Route>
            <Route path='login' element={<Login></Login>}></Route>
            <Route path='registro' element={<Register></Register>}></Route>
            <Route path='recuperar' element={<Recovery></Recovery>}></Route>
          </Route>

          <Route path='/social' element={<PrivateLayout></PrivateLayout>}>
            <Route index element={<Feed></Feed>}></Route>
            <Route path='feed' element={<Feed></Feed>}></Route>
            <Route path='logout' element={<Logout></Logout>}></Route>
            <Route path='gente' element={<People></People>}></Route>
            <Route path='search/:searchpeople' element={<Search></Search>}></Route>
            <Route path='mensaje' element={<Message></Message>}></Route>
            <Route path='ajustes' element={<Config></Config>}></Route>
            <Route path='siguiendo/:userId' element={<Following></Following>}></Route>
            <Route path='seguidores/:userId' element={<Followers></Followers>}></Route>
            <Route path='perfil/:userId' element={<Profile></Profile>}></Route>
          </Route>


          <Route path='*' element={<><h1><p>Error 404 <Link to="/">Volver Al inicio</Link></p></h1></>}></Route>



        </Routes>
        
      </AuthProvider>
      <Footer></Footer>
    </BrowserRouter>
  )
}
