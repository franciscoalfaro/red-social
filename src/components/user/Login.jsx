import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { Global } from '../../helpers/Global'
import useAuth from '../../hooks/useAuth'

export const Login = () => {

    const { form, changed } = useForm({})
    const [saved, setSaved] = useState('not_sended')

    const { setAuth } = useAuth()

    const loginUser = async (e) => {
        e.preventDefault();

        //datos del formulario
        let userLogin = form
        console.log(userLogin)

        //peticion al back
        const request = await fetch(Global.url + "user/login", {
            method: "POST",
            body: JSON.stringify(userLogin),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await request.json()



        if (data.status == "success") {
            //persistir datos en el nav -- guardar datos de inicio de sesion
            localStorage.setItem("token", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))
            setSaved("login")
            //Set Datos en el auth
            setAuth(data.user)
            //redireccion
            setTimeout(() => { window.location.reload() }, 0)

        } else if (data.status == "error_404") {
            setSaved("error_404")
        } else if (data.status == "Not Found") {
            setSaved("warning")
        } else {
            setSaved("error")
        }


    }

    return (
        <>

            <h1 className="content__title">Login</h1>
            {saved == "login" ? <strong className='alert alert-success'>Te has identificado de forma correcta</strong> : ""}
            {saved == "warning" ? <strong className='alert alert-warning'>Usuario no registrado</strong> : ""}
            {saved == "error" ? <strong className='alert alert-danger'>usuario o clave incorrecto</strong> : ""}
            {saved == "error_404" ? <strong className='alert alert-warning'>Falta usuario o clave</strong> : ""}

            <form onSubmit={loginUser}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={changed}></input>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="exampleInputPassword1" onChange={changed}></input>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </>
    )
}