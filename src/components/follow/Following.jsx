import React, { useEffect, useState } from 'react'
import { Global } from '../../helpers/Global'
import { UserList } from '../user/UserList'
import { useParams } from 'react-router-dom'

export const Following = () => {

  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [more, setMore] = useState(true)
  const [following, setFollowing] = useState([])
  const [loading, setLoading] = useState(true)
  
  const params = useParams()


  useEffect(() => {
    getUsers(1)
  }, [])

  const getUsers = async (nextPage = 1) => {
    setLoading(true)

    //obtener userId
    const userId = params.userId

    //Peticion para obtener usuarios
    const request = await fetch(Global.url + "follow/following/"+ userId+"/"+nextPage, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }

    })
    //Crear un estado para poder listar
    const data = await request.json()
    
    let cleanUser = []

    data.follow.forEach(follow => {
        cleanUser = [...cleanUser, follow.followed]
    })
    data.users = cleanUser

    if (data.users && data.status == "success") {

      let newUsers = data.users

      if (users.length >= 1) {
        newUsers = [...users, ...data.users]
      }

      // seteare estados
      setUsers(newUsers)
      setFollowing(data.user_following)
      setLoading(false)

      //Paginacion
      if (users.length >= (data.totalDocs - data.users.length)) {
        setMore(false)
      }

    }
  }



  //seguir y dejar de seguir



  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Usuarios que sigue "nombre usuario"</h1>
      </header>
    <UserList users={users} 
              getUsers={getUsers} 
              following={following} 
              setFollowing={setFollowing}
              page={page}
              setPage={setPage}
              more={more}  
              loading={loading}>
              </UserList>
    </>
  )
}
