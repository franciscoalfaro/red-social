import React from 'react'
import avatar from '../../../assets/img/user.png'
import { NavLink } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import { Global } from '../../../helpers/Global'

export const Nav = () => {
    const { auth } = useAuth()

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="#"></NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarScroll">
                        <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                            <li className="nav-item">
                                <NavLink to="/social/feed" className="menu-list__link">
                                    <i className="fa-solid fa-list"></i>
                                    <span className="menu-list__title">Timeline</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/social/gente" className="menu-list__link">
                                    <i className="fa-solid fa-user"></i>
                                    <span className="menu-list__title">Gente</span>
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to={"/social/perfil/" + auth._id} className="list-end__link">
                                    <span className="list-end__name">{auth.nick}</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/social/ajustes" className="list-end__link">
                                    <i className='fa-solid fa-gear'></i>
                                    <span className="list-end__name">Ajustes</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/social/logout" className="list-end__link">
                                    <i className='fa-solid fa-right-from-bracket'></i>
                                    <span className="list-end__name">Cerrar sesion</span>
                                </NavLink>

                            </li>
                            <li className="nav-item">
                                <NavLink to={"/social/perfil/" + auth._id} className="list-end__link-image">
                                    {auth.image == 'default.png' && <img src={avatar} className="list-end__img" alt="Foto de perfil"></img>}
                                    {auth.image != 'default.png' && <img src={Global.url + "user/avatar/" + auth.image} className="list-end__img" alt="Foto de perfil"></img>}
                                </NavLink>
                            </li>
                        </ul>

      {/*              <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>*/}    
                    </div>
                </div>
            </nav>
        </>

    )
}