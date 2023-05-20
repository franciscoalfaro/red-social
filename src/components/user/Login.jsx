import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { Global } from '../../helpers/Global'

export const Login = () => {

    const { form, changed } = useForm({})
    const [saved, setSaved] = useState('not_sended')

    const loginUser=async(e)=>{
        e.preventDefault();

        //datos del formulario
        let userLogin = form

        //peticion al back
        const request = await fetch(Global.url+"user/login", {
            method:"POST",
            body:JSON.stringify(userLogin),
            headers:{
                "Content-Type": "application/json"
            }
        })
        const data = await request.json()
       
        console.log(data)

        if(data.status == "success"){
        
             //persistir datos en el nav -- guardar datos de inicio de sesion
             localStorage.setItem("token", data.token)
             localStorage.setItem("user", JSON.stringify(data.user))

            setSaved("login")
        }else{
            setSaved("error")
        }


    }

    return (
        <>
            <header className="content__header content__header--public">
                <h1 className="content__title">Login</h1>
            </header>
            <div className="content__posts">
            {saved =="login"? <strong className='alert alert-success'>Te has identificado de forma correcta</strong>:""}
            {saved =="error"?   <strong className='alert alert-danger'>usuario o clave incorrecto</strong> : ""}
                <form className='form-login' onSubmit={loginUser}>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input type='email'name="email" onChange={changed}></input>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='password'>Contraseña</label>
                        <input type='password'name="password" onChange={changed}></input>
                    </div>

                    <input type='submit' value="ingresar" className="btn btn-success"></input>

                </form>

            </div>

        </>
    )
}
