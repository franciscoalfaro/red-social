import React, { useEffect, useState } from 'react'
import avatar from '../../assets/img/user.png'
import { GetProfile } from '../../helpers/GetProfile'
import { Link, useParams } from 'react-router-dom'
import { Global } from '../../helpers/Global'
import useAuth from '../../hooks/useAuth'
import { PublicationList } from '../publication/PublicationList'

export const Profile = () => {

    const { auth } = useAuth()
    const [user, setUser] = useState({})
    const [counters, setCounters] = useState({})
    const [iFollows, setIFollows] = useState(false)
    const [publications, setPublications] = useState([])
    const [more, setMore] = useState(true)
    const [page, setPage] = useState(1)
    const [saved, setSaved] = useState('not_saved')

    const params = useParams()


    const [mostrarAlertaWarning, setMostrarAlertaWarning] = useState(true);

    useEffect(() => {
        if (user.eliminado === true && mostrarAlertaWarning) {
            Swal.fire({
                icon: 'warning',
                title: 'Error',
                text: 'Cuenta se encuentra inactiva'
            }).then(() => {
                setMostrarAlertaWarning(false);
                location.href = "/social/gente";
            });
        }
    }, [user, mostrarAlertaWarning]);

    useEffect(() => {
        getDataUser()
        getCounter()
        getPublications(1, true)
    }, [])


    useEffect(() => {
        getDataUser()
        getCounter()
        setMore(true)
        getPublications(1, true)

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
        } else if (data.status == "error") {
            setSaved("error")


        }

    }


    const getPublications = async (nextPage = 1, newProfile = false) => {
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


            if (!newProfile && publications.length >= 1) {
                newPublication = [...publications, ...data.publications]
            }
            if (newProfile) {
                newPublication = data.publications
                setMore(true)
                setPage(1)
            }
            setPublications(newPublication)

            if (!newProfile && publications.length >= (data.total - data.publications.length)) {
                setMore(false)



            }
            if (data.page <= 0) {
                setMore(false)

            }

        } else if (data.status == "error") {
            setSaved("error")
            setMore(false)

        }
    }

    //eliminar cuenta
    const deleteAcount = async () => {
        const request = await fetch(Global.url + "user/delete/" + auth._id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }

        })
        //si datos estan correctos se borra el local storage y redirige al login
        const data = await request.json()
        if (data.status == "success") {
            location.href = "/login"
            localStorage.clear();

        } else {
            setSaved("error")
        }

    }



    return (
        <>

            <div className="card">
                <div className="card-body publication">
                    <h5 className="card-title">Mis Publicaciones</h5>
                    <p className="card-text">Contenido central</p>
                </div>
            </div>


            <div className="col-md-12">
                <div className="card">
                    {user.image == 'default.png' && <img src={avatar} className="card-img-top img-fluid" alt="Foto de perfil"></img>}
                    {user.image != 'default.png' && <img src={Global.url + "user/avatar/" + user.image} className="card-img-top img-fluid" alt="Foto de perfil"></img>}
                    <div className="card-body">
                        <h1 className="card-title">{user.name} {user.surname}</h1>
                        <p className="card-text">{user.nick}</p>
                        <p className="card-text">{user.bio}</p>
                        {user._id != auth._id &&
                            (iFollows ?
                                <button onClick={() => unfollow(user._id)} className="btn btn-danger">Dejar de seguir</button>
                                : <button onClick={() => follow(user._id)} className="btn btn-success">Seguir</button>
                            )}
                        <div className="d-flex justify-content-between">
                            <div className="section">
                                <h6>Siguiendo</h6>
                                <Link to={"/social/siguiendo/" + user._id} className="following__link">
                                    <span className="">{counters.following >= 1 ? counters.following : 0}</span>
                                </Link>
                            </div>
                            <div className="section">
                                <h6>Seguidores</h6>
                                <Link to={"/social/seguidores/" + user._id} className="following__link">
                                    <span className="">{counters.followed >= 1 ? counters.followed : 0}</span>
                                </Link>
                            </div>
                            <div className="section">
                                <h6>Publicaciones</h6>
                                <Link to={"/social/perfil/" + user._id} className="following__link">
                                    <span className="following__number">{counters.publications >= 1 ? counters.publications : 0}</span>
                                </Link>
                            </div>
                            <div className="section">
                                <h6></h6>
                                {user._id == auth._id && (
                                    <div className="following__link">
                                        <span className="following__title"></span>
                                        <button onClick={deleteAcount} className='btn btn-danger'>desactivar cuenta</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {saved == "error" ? <strong className='alert alert-success'>No existen mas publicaciones</strong> : ""
            }
            <PublicationList
                publications={publications}
                page={page}
                setPage={setPage}
                more={more}
                setMore={setMore}
                getPublications={getPublications}

            ></PublicationList>

        </>
    )
}