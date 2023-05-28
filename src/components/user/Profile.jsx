import React, { useEffect, useState } from 'react'
import avatar from '../../assets/img/user.png'
import { GetProfile } from '../../helpers/GetProfile'
import { Link, useParams } from 'react-router-dom'
import { Global } from '../../helpers/Global'
import useAuth from '../../hooks/useAuth'

export const Profile = () => {

    const { auth } = useAuth()
    const [user, setUser] = useState({})
    const [counters, setCounters] = useState({})
    const [iFollows, setIFollows] = useState(false)
    const [publications, setPublications] = useState([])
    const [page, setPage] = useState(1)

    const params = useParams()

    useEffect(() => {
        getDataUser()
        getCounter()
        getPublications()
    }, [])


    useEffect(() => {
        getDataUser()
        getCounter()
        getPublications()

    }, [params])

    const getDataUser = async () => {
        let dataUser = await GetProfile(params.userId, setUser)
        if (dataUser.following && dataUser.following._id)
            setIFollows(true)

    }

    const getCounter = async () => {
        const request = await fetch(Global.url + "user/counters/" + params.userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        })
        const data = await request.json()
        if (data.following) {
            setCounters(data)

        }

    }

    //seguir y dejar de seguir
    const follow = async (userId) => {
        //peticion al ajax para guardar el follow
        const request = await fetch(Global.url + "follow/save", {
            method: "POST",
            body: JSON.stringify({ followed: userId }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }

        })

        const data = await request.json()
        if (data.status == "success") {
            //actualizar el estado de following
            setIFollows(true)

        }
    }

    const unfollow = async (userId) => {
        //peticion al ajax para borrar el follow
        const request = await fetch(Global.url + "follow/unfollow/" + userId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }

        })
        const data = await request.json()
        if (data.status == "success") {
            setIFollows(false)
        }

    }


    const getPublications = async (nextPage = 1) => {
        const request = await fetch(Global.url + "publication/user/" + params.userId + "/" + nextPage, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }

        })

        const data = await request.json()

        if (data.status == "success") {
            let newPublication = data.publications

            if(publications.length >=1){
                newPublication =[...publications, ...data.publications]
            }
            setPublications(newPublication)
        }
    }

    const nextPage = ()=>{
        let next = page + 1
        setPage(next)
        getPublications(next)

    }


    return (
        <>

            <header className="aside__profile-info">
                <div className="profile-info__general-info">
                    <div className="general-info__container-avatar">
                        {user.image == 'default.png' && <img src={avatar} className="container-avatar__img" alt="Foto de perfil"></img>}
                        {user.image != 'default.png' && <img src={Global.url + "user/avatar/" + user.image} className="container-avatar__img" alt="Foto de perfil"></img>}
                    </div>

                    <div className="general-info__container-names">
                        <div className="container-names__name">
                            <h1>{user.name} {user.surname}</h1>
                        </div>
                        <h2 className="container-names__nickname"> {user.nick}</h2>
                        <p>{user.bio}</p>
                        {user._id != auth._id &&
                            (iFollows ?
                                <button onClick={() => unfollow(user._id)} className="content__button content__button--rigth post__button">Dejar de seguir</button>
                                : <button onClick={() => follow(user._id)} className="content__button content__button--rigth">Seguir</button>
                            )}
                    </div>
                </div>

                <div className="profile-info__stats">

                    <div className="stats__following">
                        <Link to={"/social/siguiendo/" + user._id} className="following__link">
                            <span className="following__title">Siguiendo</span>
                            <span className="following__number">{counters.following >= 1 ? counters.following : 0}</span>
                        </Link>
                    </div>
                    <div className="stats__following">
                        <Link to={"/social/seguidores/" + user._id} className="following__link">
                            <span className="following__title">Seguidores</span>
                            <span className="following__number">{counters.followed >= 1 ? counters.followed : 0}</span>
                        </Link>
                    </div>


                    <div className="stats__following">
                        <Link to={"/social/perfil/" + user._id} className="following__link">
                            <span className="following__title">Publicaciones</span>
                            <span className="following__number">{counters.publications >= 1 ? counters.publications : 0}</span>
                        </Link>
                    </div>
                </div>
            </header>




            <div className="content__posts">
                {publications.map(publication => {
                    return (

                        <article className="posts__post" key={publication.user._id}>

                            <div className="post__container">

                                <div className="post__image-user">
                                <Link to={"/social/perfil/" + publication.user._id} className="post__image-link">
                                        {publication.user.image == 'default.png' && <img src={avatar} className="post__user-img" alt="Foto de perfil"></img>}
                                        {publication.user.image != 'default.png' && <img src={Global.url + "user/avatar/" + publication.user.image} className="post__user-img" alt="Foto de perfil"></img>}
                                    </Link>
                                </div>

                                <div className="post__body">

                                    <div className="post__user-info">
                                        <a href="#" className="user-info__name">{publication.user.name}  {publication.user.surname}</a>
                                        <span className="user-info__divider"> | </span>
                                        <a href="#" className="user-info__create-date">{publication.create_at}</a>
                                    </div>

                                    <h4 className="post__content">{publication.text}</h4>

                                </div>

                            </div>

                            <div className="post__buttons">
                                <a href="#" className="post__button">
                                    <i className="fa-solid fa-trash-can"></i>
                                </a>
                            </div>
                        </article>)
                })}

            </div>
            <div className="content__container-btn">
                <button className="content__btn-more-post" onClick={nextPage}>
                    Ver mas publicaciones
                </button>
            </div>
        </>
    )
}
