import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import useAuth from '../../../hooks/useAuth'

export const PrivateLayout = () => {
    const { auth, loading} = useAuth()

    if(typeof auth === 'undefined'){
        localStorage.clear()

        
                
    }if (loading) {
        return <h1>Cargando.....</h1>

    } else {
        return (
            <>
                {/*Layout*/}
                <Header></Header>

                {/*cabecera y navegacion*/}

                {/*contenido principal*/}

                <section className="layout__content">
                    {auth._id ? <Outlet></Outlet> : <Navigate to="/login"></Navigate>}
                </section>

                {/*barra lateral*/}
                <Sidebar></Sidebar>

            </>
        )
    }
}
