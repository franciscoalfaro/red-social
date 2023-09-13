import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Global } from '../../helpers/Global'
import useAuth from '../../hooks/useAuth'
import avatar from '../../../src/assets/img/user.png'
import ReactTimeAgo from 'react-time-ago'

export const Search = () => {

  const [buscado, setBuscado] = useState([]);
  const params = useParams();
  const auth = useAuth();
  const [user, setUser] = useState({})


  const nextPage = () => {
    let next = page + 1;
    setPage(next);
  };

  useEffect(() => {
    busquedaPersona();
  }, [user]);



  useEffect(() => {
    busquedaPersona();
  }, [params]);

  const busquedaPersona = async () => {
    const request = await fetch(Global.url + 'user/search/' + params.searchpeople, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });

    const data = await request.json();
    if (data.status === 'success') {
      setBuscado(data.person);
    } else {
      console.log('Error en la búsqueda');
    }

  };


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
      console.log('sss',data.status)


    }

  }

  return (
    <div>
      <div className="row mt-4">
        {Array.isArray(buscado) &&
          buscado.map((person) => {
            return (
              <div className="col-md-4" key={person._id}>
                <div className="card">
                  <div className="card-body">
                    <div className="text-center">
                      <Link to={'/social/perfil/' + person._id} className="post__image-link">
                        {person.image == 'default.png' && (
                          <img src={avatar} className="rounded-circle img-thumbnail profile-image" alt="Foto de perfil" />
                        )}
                        {person.image != 'default.png' && (
                          <img src={Global.url + 'user/avatar/' + person.image} className="rounded-circle img-thumbnail profile-image" alt="Foto de perfil" />
                        )}
                      </Link>
                    </div>
                    <h5>{person.name}</h5>
                    <p className="card-text">{person.bio}</p>
                    <Link to={'/social/perfil/' + person._id} className="card-title">
                      {person.name} {person.surname}
                    </Link>
                    <span className="user-info__divider"> | </span>
                    <Link to={'/social/perfil/' + person._id} className="user-info__create-date">
                      <ReactTimeAgo date={new Date(person.create_at).getTime()}></ReactTimeAgo>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

    </div>
  );
};
