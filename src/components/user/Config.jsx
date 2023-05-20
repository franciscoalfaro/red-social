import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { Global } from '../../helpers/Global'
import avatar from '../../../src/assets/img/user.png'
import { SerializeForm } from '../../helpers/SerializeForm'

export const Config = () => {
  const { auth } = useAuth()

  const [saved, setSaved] = useState("not_saved")

  const updateUser = async(e) => {
    e.preventDefault()
    //recoger datos del formulario
    let newDataUser = SerializeForm(e.target)
    //eliminar datos innecesarios
    delete newDataUser.file0

    //actualizar usuario en la BD
    const request = await fetch(Global.url + "user/update",{
      method:"PUT",
      body:JSON.stringify(newDataUser),
      headers:{
        "Content-Type":"application/json",
        "Authorization":localStorage.getItem("token")
      }
    })
    const data = await request.json()

    if(data.status == "success"){
      setSaved("saved")
    }else{
      setSaved("error")
    }
  }
  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Ajustes</h1>
      </header>

      <div className="content__posts">
        {saved == "saved" ? <strong className='alert alert-success'>Datos actualizados de forma correcta</strong> : ""}

        {saved == "error" ? <strong className='alert alert-danger'>Error al actualizar el usuario</strong> : ""}

        <form className='config-form' onSubmit={updateUser}>
          <div className='form-group'>
            <label htmlFor='name'>Nombre</label>
            <input type='text' name='name' defaultValue={auth.name}></input>
          </div>

          <div className='form-group'>
            <label htmlFor='surname'>Apellidos</label>
            <input type='text' name='surname' defaultValue={auth.surname}></input>
          </div>

          <div className='form-group'>
            <label htmlFor='nick'>Nick o apodo</label>
            <input type='text' name='nick' defaultValue={auth.nick}></input>
          </div>

          <div className='form-group'>
            <label htmlFor='bio'>Biografia</label>
            <textarea name='bio' defaultValue={auth.bio}></textarea>

          </div>

          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' defaultValue={auth.email}></input>
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Contraseña</label>
            <input type='password' name='password'></input>
          </div>

          <div className='form-group'>
            <label htmlFor='file0'>Avatar</label>
            <div className='avatar'>
              <div className="general-info__container-avatar">
                {auth.imagen == 'default.png' && <img src={avatar} className="container-avatar__img" alt="Foto de perfil"></img>}
                {auth.imagen != 'default.png' && <img src={Global.url + "user/avatar/" + auth.imagen} className="container-avatar__img" alt="Foto de perfil"></img>}

              </div>
            </div>
            <br></br>
            <input type='file' name='file0' id="file"></input>
          </div>
          <br></br>

          <input type="submit" value="Actualizar" className="btn btn-success"></input>
        </form>


      </div>
    </>
  )
}
