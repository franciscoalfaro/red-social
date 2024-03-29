import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Header } from './Header'
import useAuth from '../../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export const PublicLayout = () => {

    const { auth } = useAuth()
    const navigate = useNavigate()


    if (typeof auth === 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login')
    }

    return (
        <>
            {/*Layout*/}
            <Header></Header>




            {/*contenido principal*/}
            <div className="container">

            {!auth._id ? <Outlet></Outlet> : <Navigate to="/social"></Navigate>}



            </div>




        </>
    )
}
