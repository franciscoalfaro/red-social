import React, { useState, useEffect, createContext } from 'react'
import { Global } from '../helpers/Global'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({})

    //se ejecuta la primera ves del provider
    useEffect(()=>{
        autUser()

    },[])

    //metodo de autenticar el usuario
    const autUser=async()=>{
        //obtener datos del usuario del localStorage
        const token = localStorage.getItem("token")
        const user = localStorage.getItem("user")

        //comprobar token
        if(!token || !user){
            return false
        }

        //tranformar datos a obj JS
        const userObj = JSON.parse(user)
        const userId= userObj.id

        //peticion ajax al back-end
        const request = await fetch(Global.url+"user/profile/"+userId,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json',
                "Authorization":token
            }

        })

        //que se devuelvan los datos del usuario

        const data = await request.json()
        //set el estado auth
        setAuth(data.user)

    }

    return (
        <AuthContext.Provider value={{
            auth,
            setAuth
            
        }}>{children}</AuthContext.Provider>
    )
}
export default AuthContext
