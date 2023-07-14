import React, { useEffect, useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { Global } from '../../helpers/Global'
import useAuth from '../../hooks/useAuth'
import { NavLink } from 'react-router-dom'

export const Login = () => {

    const { form, changed } = useForm({})
    const [saved, setSaved] = useState('not_sended')

    const { setAuth } = useAuth()

    const loginUser = async (e) => {
        e.preventDefault();

        //datos del formulario
        let userLogin = form


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
            // Persistir datos en el navegador - guardar datos de inicio de sesión
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setSaved("login");
            // Establecer datos en el auth
            setAuth(data.user);
            // Redirección
          
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Login correcto',
              showConfirmButton: false,
              timer: 1500
              
            });
            setTimeout(() => { window.location.reload() }, 1200);
                      
            
          } else if (data.status == "error_404") {
            setSaved("error_404");
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Falta usuario o clave!',
                
              })
          } else if (data.status == "Not Found") {
            setSaved("warning");
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Usuario no registrado!',
                
              })


          } else {
            setSaved("error");
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'usuario o clave incorrecto!',
                
              })
          }
          


    }

    return (
        <>




            <div className="row justify-content-center mt-5">
                <div className="col-md-6 login-container">
                    <div className="login-form text-center">
                        <h2>Iniciar sesión</h2>
                        <form onSubmit={loginUser}>
                            <div className="form-group">
                                <label htmlFor="email" className="">Direccion de correo</label>
                                <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={changed} required></input>

                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="">Password</label>
                                <input type="password" name="password" className="form-control" id="exampleInputPassword1" onChange={changed} required></input>
                            </div>
                            <div className="form-group mt-3">
                                <ul className="nav justify-content-center">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login">
                                            <span>Login</span>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/registro">
                                            <span>Registro</span>
                                        </NavLink>

                                    </li>
                                </ul>
                            </div>
                            <button type="submit" className="btn btn-primary">Iniciar sesión</button>
                        </form>
                    </div>
                </div>
            </div>
            


        </>
    )
}