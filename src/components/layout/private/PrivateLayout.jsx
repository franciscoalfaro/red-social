import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import useAuth from '../../../hooks/useAuth'
import { Spiner } from './Spiner'

export const PrivateLayout = () => {
    const { auth, loading } = useAuth()

    if (typeof auth === 'undefined') {
        localStorage.clear()



    } if (loading) {
         return<Spiner></Spiner>

    } else {
        return (
            <>
                {/*Layout*/}
                <Header></Header>

                {/*cabecera y navegacion*/}

                {/*contenido principal*/}


                <section className="layout__content">
                    
                    <header className="content__header">
                        <h1 className="content__title"></h1>
                    </header>
                    {auth._id ? <Outlet></Outlet> : <Navigate to="/login"></Navigate>}
                </section>

                {/*barra lateral*/}
                <Sidebar></Sidebar>


            </>
        )
    }
}
