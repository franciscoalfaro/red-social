import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Header } from './Header'
import useAuth from '../../../hooks/useAuth'

export const PublicLayout = () => {

    const { auth } = useAuth()

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
