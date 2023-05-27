import React from 'react'
import avatar from '../../../src/assets/img/user.png'
import { Global } from '../../helpers/Global'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'


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
            <div className="content__posts">
                {users.map(user => {
                    if ((user._id !== auth._id)) {
                        return (
                            <article className="posts__post" key={user._id}>
                                <div className="post__container">
                                    <div className="post__image-user">
                                        <Link to={"/social/perfil/"+user._id} className="post__image-link">
                                            {user.image == 'default.png' && <img src={avatar} className="post__user-img" alt="Foto de perfil"></img>}
                                            {user.image != 'default.png' && <img src={Global.url + "user/avatar/" + user.image} className="post__user-img" alt="Foto de perfil"></img>}
                                        </Link>
                                    </div>
                                    <div className="post__body">
                                        <div className="post__user-info">
                                            <Link to={"/social/perfil/"+user._id} className="user-info__name">{user.name} {user.surname}</Link>
                                            <span className="user-info__divider"> | </span>
                                            <Link to={"/social/perfil/"+user._id} className="user-info__create-date">{user.create_at}</Link>
                                        </div>
                                        <h4 className="post__content">{user.bio}</h4>
                                    </div>
                                </div>
                                <div className="post__buttons">
                                    {!following.includes(user._id) &&
                                        <button className="post__button post__button--green" onClick={() => follow(user._id)}>
                                            Seguir
                                        </button>
                                    }
                                    {following.includes(user._id) &&
                                        <button className="post__button" onClick={() => unfollow(user._id)}>
                                            Dejar de Seguir
                                        </button>
                                    }
                                </div>
                            </article>
                        )
                    }
                })}



            </div>
            <br></br>
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
