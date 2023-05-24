import React, { useEffect, useState } from 'react'
import avatar from '../../../src/assets/img/user.png'
import { Global } from '../../helpers/Global'

export const People = () => {

  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [more, setMore] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUsers(1)
  }, [])

  const getUsers = async (nextPage = 1) => {
    setLoading(true)
    //Peticion para obtener usuarios

    const request = await fetch(Global.url + "user/list/" + nextPage, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }

    })
    //Crear un estado para poder listar
    const data = await request.json()
   

    console.log(data.users)
    if (data.users && data.status == "success") {

      let newUsers = data.users
      setLoading(false)

      if(users.length >=1){
        newUsers = [...users, ...data.users]
      }
      setUsers(newUsers)

      //Paginacion
      if(users.length>=data.totalDocs ){
        setMore(false)
      }

    }
  }

  const nextPage=()=>{
    let next = page +1
    setPage(next)
    getUsers(next)
    console.log(page,users)
  }


  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Gente</h1>
      </header>
      <div className="content__posts">

     



        {users.map(user => {
          return(
            <article className="posts__post" key={user._id}>

              <div className="post__container">

                <div className="post__image-user">
                  <a href="#" className="post__image-link">
                  {user.image =='default.png' && <img src={avatar} className="post__user-img" alt="Foto de perfil"></img>}
                  {user.image !='default.png' && <img src={Global.url+"user/avatar/"+user.image} className="post__user-img" alt="Foto de perfil"></img>}
                  </a>
                </div>

                <div className="post__body">

                  <div className="post__user-info">
                    <a href="#" className="user-info__name">{user.name} {user.username}</a>
                    <span className="user-info__divider"> | </span>
                    <a href="#" className="user-info__create-date">{user.create_at}</a>
                  </div>

                  <h4 className="post__content">{user.bio}</h4>

                </div>

              </div>
              <div className="post__buttons">
                <a href="#" className="post__button post__button--green">
                  Seguir
                </a>
                {/*
            <a href="#" className="post__button">
              Dejar de Seguir
            </a>
*/}
              </div>

            </article>
          )

        })}



      </div>
      <br></br>
      {loading ? "Cargando":""}
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
