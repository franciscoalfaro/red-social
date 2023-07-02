import React, { useEffect, useState } from 'react'
import { Global } from '../../helpers/Global'
import { UserList } from './UserList'

export const People = () => {

  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [more, setMore] = useState(true)
  const [following, setFollowing] = useState([])
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


  return (
    <>
      <div className="card">
        <div className="card-body publication">
          <h5 className="card-title">Buscador</h5>
          <form>
          <input type="text" name='search_field' className='search-form mr-sm-2' placeholder='Busqueda de personas'></input>
          <button type='submit' className='btn btn-success my-2 my-sm-1'>Buscar</button>
        </form>
        </div>
      </div>
      
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
