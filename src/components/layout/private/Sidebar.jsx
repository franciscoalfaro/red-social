import React from 'react'
import avatar from '../../../assets/img/user.png'
import useAuth from '../../../hooks/useAuth'
import { Global } from '../../../helpers/Global'


export const Sidebar = () => {
    const {auth, counters} = useAuth()
    console.log(auth,counters)

    return (
        <aside className="layout__aside">

            <header className="aside__header">
                <h1 className="aside__title">Hola, {auth.name}</h1>
            </header>

            <div className="aside__container">

                <div className="aside__profile-info">

                    <div className="profile-info__general-info">
                        <div className="general-info__container-avatar">
                            {auth.imagen =='default.png' && <img src={avatar} className="container-avatar__img" alt="Foto de perfil"></img>}
                            {auth.imagen !='default.png' && <img src={Global.url+"user/avatar/"+auth.imagen} className="container-avatar__img" alt="Foto de perfil"></img>}

                        </div>

                        <div className="general-info__container-names">
                            <a href="#" className="container-names__name">{auth.name} {auth.surname}</a>
                            <p className="container-names__nickname">{auth.nick}</p>
                            <p className="container-names__bio">{auth.bio}</p>
                        </div>
                    </div>

                    <div className="profile-info__stats">
                        <div className="stats__following">
                            <a href="#" className="following__link">
                                <span className="following__title">Siguiendo</span>
                                <span className="following__number">{counters.following}</span>
                            </a>
                        </div>
                        <div className="stats__following">
                            <a href="#" className="following__link">
                                <span className="following__title">Seguidores</span>
                                <span className="following__number">{counters.followed}</span>
                            </a>
                        </div>
                        <div className="stats__following">
                            <a href="#" className="following__link">
                                <span className="following__title">Publicaciones</span>
                                <span className="following__number">{counters.publications}</span>
                            </a>
                        </div>
                    </div>
                </div>


                <div className="aside__container-form">

                    <form className="container-form__form-post">

                        <div className="form-post__inputs">
                            <label htmlFor="post" className="form-post__label">¿Que estas pesando hoy?</label>
                            <textarea name="post" className="form-post__textarea"></textarea>
                        </div>

                        <div className="form-post__inputs">
                            <label htmlFor="image" className="form-post__label">Sube tu foto</label>
                            <input type="file" name="image" className="form-post__image"></input>
                        </div>

                        <input type="submit" value="Enviar" className="form-post__btn-submit" disabled></input>

                    </form>

                </div>

            </div>

        </aside>
    )
}
