import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import useAuth from '../../../hooks/useAuth'
import { Spiner } from './Spiner'

export const PrivateLayout = () => {
    const { auth, loading } = useAuth()
    const navigate = useNavigate()
    if (typeof auth === 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login')
    }
    
    if (loading) {
        return <Spiner></Spiner>

    } else {
        return (
            <>
                {/*Layout*/}
                <Header></Header>
                <div className="container mt-2">
                    <div className="row">
                        <Sidebar></Sidebar>


                        {/*cabecera y navegacion*/}

                        {/*contenido principal*/}
                        <div className="col-md-8">

                            {auth._id ? <Outlet></Outlet> : <Navigate to="/login"></Navigate>}


                            {/*barra lateral*/}
                        </div>
                    </div>

                </div>

            </>
        )
    }
}
