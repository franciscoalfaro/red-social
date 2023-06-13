import React from 'react'
import avatar from '../../../assets/img/user.png'
import { NavLink } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import { Global } from '../../../helpers/Global'

export const Nav = () => {
    const { auth } = useAuth()

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
                <div className="container">
                    <NavLink className="navbar-brand" to="/social/">Red Social</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/social/feed">
                                    <span>Time Line</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/social/gente" className="nav-link">Gente</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={"/social/perfil/" + auth._id}>
                                    <span className="list-end__name">{auth.nick}</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/social/ajustes">Ajustes</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/social/logout">Cerrar sesion</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={"/social/perfil/" + auth._id} className="nav-link">
                                    {auth.image == 'default.png' && <img src={avatar} className="img-fluid img-thumbnail rounded-circle profile-image-nav" alt="Foto de perfil"></img>}
                                    {auth.image != 'default.png' && <img src={Global.url + "user/avatar/" + auth.image} className="img-fluid img-thumbnail rounded-circle profile-image-nav" alt="Foto de perfil"></img>}
                                </NavLink>  
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>

    )
}