import React from 'react'
import { useForm } from '../../hooks/useForm'
import { Global } from '../../helpers/Global'

export const Register = () => {
    const { form, changed } = useForm({})

    const saveUser = async (e) => {
        //prevenir actualizacion de pagina o pantalla al realizar envio del form
        e.preventDefault()

        //variable para almacenar datos del formulario
        let newUser = form

        //guardar datos en backend
        console.log(newUser)
        const request = await fetch(Global.url + "user/register", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await request.json()
        console.log(data)

    }
    return (
        <>
            <header className="content__header content__header--public">
                <h1 className="content__title">Registro</h1>
            </header>

            <div className="content__posts">
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
