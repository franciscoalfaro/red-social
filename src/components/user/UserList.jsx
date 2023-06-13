import React from 'react'
import avatar from '../../../src/assets/img/user.png'
import { Global } from '../../helpers/Global'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import ReactTimeAgo from 'react-time-ago'


export const UserList = ({ users, getUsers, following, setFollowing, page, setPage, more, loading }) => {

    const { auth } = useAuth()

    const nextPage = () => {
        let next = page + 1
        setPage(next)
        getUsers(next)
        console.log(page, users)
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
            setFollowing([...following, userId])

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
            //actualizar el estado de following
            let filtrado = following.filter(followingUserId => userId !== followingUserId)

            setFollowing(filtrado)

        }

    }

    return (
        <>


            <div className="row mt-4">
                {users.map(user => {
                    return (
                          <div className="col-md-4" key={user._id}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="text-center">
                                        <Link to={"/social/perfil/" + user._id} className="post__image-link">
                                            {user.image == 'default.png' && <img src={avatar} className="rounded-circle img-thumbnail profile-image" alt="Foto de perfil"></img>}
                                            {user.image != 'default.png' && <img src={Global.url + "user/avatar/" + user.image} className="rounded-circle img-thumbnail profile-image" alt="Foto de perfil"></img>}
                                        </Link>
                                    </div>
                                    <h5>{user.name}</h5>
                                    <p className="card-text">{user.bio}</p>
                                    <Link to={"/social/perfil/" + user._id} className="card-title">{user.name} {user.surname}</Link>
                                    <span className="user-info__divider"> | </span>
                                    <Link to={"/social/perfil/" + user._id} className="user-info__create-date"><ReactTimeAgo date={new Date(user.create_at).getTime()}></ReactTimeAgo></Link>
                                    {user._id != auth._id &&
                                        <div className="">
                                            {!following.includes(user._id) && user.eliminado !== true &&
                                                <button type="button" className="btn btn-primary" onClick={() => follow(user._id)}>Seguir</button>

                                            }
                                            {following.includes(user._id) && user.eliminado !== true &&
                                                <button type="button" className="btn btn-danger" onClick={() => unfollow(user._id)}>Dejar de Seguir</button>
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {loading ? "Cargando" : ""}
            {more &&
                <div className="content__container-btn">
                    <button className="content__btn-more-post" onClick={nextPage}>
                        Ver mas Personas
                    </button>
                </div>
            }

        </>

    )
}