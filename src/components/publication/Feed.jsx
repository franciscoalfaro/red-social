import React, { useEffect, useState } from 'react'
import avatar from '../../assets/img/user.png'

import { Link, useParams } from 'react-router-dom'
import { Global } from '../../helpers/Global'
import useAuth from '../../hooks/useAuth'
import { PublicationList } from '../publication/PublicationList'


export const Feed = () => {
    const { auth } = useAuth()
    const [publications, setPublications] = useState([])
    const [more, setMore] = useState(true)
    const [page, setPage] = useState(1)
    const [saved, setSaved] = useState('not_saved')

    useEffect(() => {
        getPublications(1, false)
    }, [])

    useEffect(() => {
        getPublications(1, false)
    }, [])

    const getPublications = async (nextPage = 1, showNew = false) => {
        if(showNew){
            setPublications([])
            setPage(1)
            nextPage = 1
        }
        const request = await fetch(Global.url + "publication/feed/" + nextPage, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }

        })

        const data = await request.json()

        if (data.status == "success") {
            let newPublication = data.publications

            if (!showNew && publications.length >= 1) {
                newPublication = [...publications, ...data.publications]
            }
            
            setPublications(newPublication)

            if (!showNew && publications.length >= (data.total - data.publications.length)) {
                setMore(false)

            }
            if (data.page <= 0) {
                setMore(false)
            }
        }if(data.status == "error"){
            setSaved("error")
            setMore(false)
        }
    }

    return (
        <>
            <header className="content__header">
                <h1 className="content__title">Timeline</h1>
                <button className="content__button" onClick={()=>getPublications(1, true)}>Mostrar nuevas</button>
            </header>

            <PublicationList 
            publications={publications}
            page={page}
            setPage={setPage}
            more={more}
            setMore={setMore}
            getPublications={getPublications}
            
            ></PublicationList>




        </>
    )
}
