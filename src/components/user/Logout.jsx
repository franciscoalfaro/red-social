import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

export const Logout = () => {
    const{setAuth, setCounters} = useAuth()

    const navigate = useNavigate()

    useEffect(()=>{

        //vaciar localStorage
        localStorage.clear()

        //Setear estados globales a vacio
        setAuth({})
        setCounters({})

        //navigate(redireccion) a login
        navigate("/login")

    })

  return (
    <h1>Cerrando Sesion</h1>
  )
}
