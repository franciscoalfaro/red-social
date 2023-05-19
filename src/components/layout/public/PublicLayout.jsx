import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'

export const PublicLayout = () => {
    return (
        <>
            {/*Layout*/}
            <Header></Header>

            {/*contenido principal*/}

            <section className="layout__content">
                <Outlet></Outlet>
            </section>

        </>
    )
}
