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
                <div className="container-fluid">
                    <div className="d-flex align-items-center">
                        <NavLink className="navbar-brand" to="/social/">Red Social</NavLink>

                        <form className="d-flex">
                            <input type="text" name="search_field" className="form-control mr-sm-2 custom-search-input" placeholder="Busqueda de personas" />
                            <button className="btn_search" type="submit" to="/social/buscar"><i className="bi bi-search"></i></button>
                           {/* <NavLink className='btn_search' type='submit' to="/social/buscar"><i className="bi bi-search"></i></NavLink>*/}
                        </form>
                    </div>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/social/feed"><i className="bi bi-card-list"><span> Feed</span></i></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/social/gente" className="nav-link"><i className="bi bi-people-fill"><span> Gente</span></i></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/social/mensaje" className="nav-link"><i className="bi bi-envelope-exclamation"><span> Mensajes</span></i></NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to={"/social/perfil/" + auth._id}>
                                    <span className="list-end__name">{auth.nick}</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/social/ajustes">Ajustes</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/social/logout">Cerrar sesión</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={"/social/perfil/" + auth._id} className="nav-link">
                                    {auth.image == 'default.png' && <img src={avatar} className="img-fluid img-thumbnail rounded-circle profile-image-nav" alt="Foto de perfil" />}
                                    {auth.image != 'default.png' && <img src={Global.url + "user/avatar/" + auth.image} className="img-fluid img-thumbnail rounded-circle profile-image-nav" alt="Foto de perfil" />}
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>






        </>

    )
}