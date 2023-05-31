import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { Global } from '../../helpers/Global'
import avatar from '../../../src/assets/img/user.png'
import { SerializeForm } from '../../helpers/SerializeForm'

export const Config = () => {
  const { auth, setAuth } = useAuth()
  const [saved, setSaved] = useState("not_saved")

  const updateUser = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem('token')


    //recoger datos del formulario
    let newDataUser = SerializeForm(e.target)
    //eliminar datos innecesarios
    delete newDataUser.file0

    //actualizar usuario en la BD
    const request = await fetch(Global.url + "user/update", {
      method: "PUT",
      body: JSON.stringify(newDataUser),
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    })
    const data = await request.json()

    if (data.status == "success") {
      delete data.user.password
      setAuth({ ...auth, ...data.user })
      setSaved("saved")
    } if (data.status == "warning") {
      setSaved("warning")
    } if (data.status == "error") {
      setSaved("error")
    }


    // subida de imagen
    const fileInput = document.querySelector("#file")


    if (data.status == "success" && fileInput.files[0]) {
      //recoger imagen a subir
      const formData = new FormData()

      formData.append('file0', fileInput.files[0])

      //peticion para enviar el fichero
      const uploadRequest = await fetch(Global.url + "user/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": token
        }
      })
      const uploadData = await uploadRequest.json()

      if (uploadData.status == "success" && uploadData.user) {
        delete uploadData.password
        setAuth({ ...auth, ...uploadData.user })
        setSaved("saved")
      } else {
        setSaved("error")
      }

    }

  }
  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Ajustes</h1>
      </header>

      <div className="content__posts">
        {saved == "saved" ? <strong className='alert alert-success'>Datos actualizados de forma correcta</strong> : ""}
        {saved == "warning" ? <strong className='alert alert-warning'>Nick ya existe utiliza otro</strong> : ""}
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

            <div className="general-info__container-avatar">
              {auth.image == 'default.png' && <img src={avatar} className="container-avatar__img" alt="Foto de perfil"></img>}
              {auth.image != 'default.png' && <img src={Global.url + "user/avatar/" + auth.image} className="container-avatar__img" alt="Foto de perfil"></img>}

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