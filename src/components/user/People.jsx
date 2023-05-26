import React, { useEffect, useState } from 'react'
import avatar from '../../../src/assets/img/user.png'
import { Global } from '../../helpers/Global'
import useAuth from '../../hooks/useAuth'
import { UserList } from './UserList'

export const People = () => {

  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [more, setMore] = useState(true)
  const [following, setFollowing] = useState([])
  const [loading, setLoading] = useState(true)
  const { auth } = useAuth()

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
        <h1 className="content__title">Gente</h1>
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
