import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export const PrivatecLayout = () => {
    return (
        <>
            {/*Layout*/}
            <Header></Header>

            {/*cabecera y navegacion*/}

            {/*contenido principal*/}

            <section className="layout__content">
                <Outlet></Outlet>
            </section>

            {/*barra lateral*/}
            <Sidebar></Sidebar>

        </>
    )
}
