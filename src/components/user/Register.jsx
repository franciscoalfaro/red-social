import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { Global } from '../../helpers/Global'

export const Register = () => {
    const { form, changed } = useForm({})
    const [saved, setSaved] = useState('not_sended')

    const saveUser = async (e) => {
        //prevenir actualizacion de pagina o pantalla al realizar envio del form
        e.preventDefault()

        //variable para almacenar datos del formulario
        let newUser = form

        //guardar datos en backend

        const request = await fetch(Global.url + "user/register", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await request.json()

        if(data.status == "success"){
            setSaved("saved")
        }if(data.status == "warning"){
            setSaved("warning")
        }if(data.status == "error"){
            setSaved("error")
        }

    }
    return (
        <>
            <header className="content__header content__header--public">
                <h1 className="content__title">Registro</h1>
            </header>

            <div className="content__posts">
            {saved =="saved"? <strong className='alert alert-success'>Usuario Registrado Correctamente</strong>:""}
            {saved =="warning"? <strong className='alert alert-warning'> Usuario ya existe </strong>: ""}
            {saved =="error"?   <strong className='alert alert-danger'>Error al crear el usuario</strong> : ""}
     
                <form className='register-form' onSubmit={saveUser}>
                    <div className='form-group'>
                        <label htmlFor='name'>Nombre</label>
                        <input type='text' name='name' onChange={changed}></input>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='surname'>Apellidos</label>
                        <input type='text' name='surname' onChange={changed}></input>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='nick'>Nick o apodo</label>
                        <input type='text' name='nick' onChange={changed}></input>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' onChange={changed}></input>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='password'>Contraseña</label>
                        <input type='password' name='password' onChange={changed}></input>
                    </div>
                    <input type="submit" value="Registrate" className="btn btn-success"></input>
                </form>
            </div>

        </>
    )
}
