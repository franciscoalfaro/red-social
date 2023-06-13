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
    const fileInput = document.querySelector("#file0")

    let calbite = (fileInput.files[0].size)
    let bytes = parseFloat(calbite);

    let megabytes = bytes / (1024 * 1024);

    let resultado = megabytes.toFixed(2)

    if (resultado >= 2) {
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: 'Tamaño de imagen demasiado grande, no debe superar 2MB'
      });

    } else if (data.status == "success" && fileInput.files[0]) {
      //recoger imagen a subir
      const formData = new FormData()

      console.log(formData)

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
      console.log(uploadData)

      if (uploadData.status == "success" && uploadData.user) {
        delete uploadData.password
        setAuth({ ...auth, ...uploadData.user })
        setTimeout(() => { window.location.reload() }, 0);
        setSaved("saved")
      } else {
        setSaved("error")
      }

    }

  }
  return (
    <>

      <div className="row justify-content-center custom-content">
        <div className="col-md-10">
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Ajustes</h5>
                  {saved == "saved" ? <strong className='alert alert-success'>Datos actualizados de forma correcta</strong> : ""}
                  {saved == "warning" ? <strong className='alert alert-warning'>Nick ya existe utiliza otro</strong> : ""}
                  {saved == "error" ? <strong className='alert alert-danger'>Error al actualizar el usuario</strong> : ""}

                  <form onSubmit={updateUser}>
                    <div className="mb-3">
                      <label htmlFor='name'>Nombre</label>
                      <input type='text' name='name' defaultValue={auth.name} className="form-control"></input>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="apellido">Apellido:</label>
                      <input type='text' name='surname' defaultValue={auth.surname} className="form-control"></input>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email">Email:</label>
                      <input type='email' name='email' defaultValue={auth.email} className="form-control"></input>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="contrasena">Contraseña:</label>
                      <input type='password' name='password' className="form-control"></input>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="telefono">Nick o Apodo:</label>
                      <input type='text' name='nick' defaultValue={auth.nick} className="form-control"></input>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="biografia">Biografía:</label>
                      <textarea name='bio' defaultValue={auth.bio} className="form-control"></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="file0">Subir imagen:</label>
                      <input type="file" name='file0' id="file0" className="form-control"></input>
                    </div>
                    <div className="mb-3">
                      <p className="mb-0">Actualizar Avatar</p>
                      <div className="d-flex align-items-center">
                        {auth.image == 'default.png' && <img src={avatar} className="img-fluid img-thumbnail rounded-circle profile-image" alt="Foto de perfil"></img>}
                        {auth.image != 'default.png' && <img src={Global.url + "user/avatar/" + auth.image} className="img-fluid img-thumbnail rounded-circle profile-image" alt="Foto de perfil"></img>}
                        <div className="ml-3">
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Guardar cambios</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}