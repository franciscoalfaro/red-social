import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Global } from '../../helpers/Global';

export const LikeList = ({ publicationId }) => {
    const { auth } = useAuth();
    const [likesCount, setLikesCount] = useState(0);
    const [nolikesCount, setNoLikesCount] = useState(0);
    const [gusta, setGusta] = useState([]);
    const [nomegusta, setNomeGusta] = useState([]);

    useEffect(() => {
        listgusta(publicationId);
    }, [publicationId]);

    const megusta = async (publicationId) => {
        try {
            const request = await fetch(Global.url + "like/megusta/" + publicationId, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            });
            const data = await request.json();
            if (data.status === "success") {
                listgusta(publicationId);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const nogusta = async (publicationId) => {
        try {
            const request = await fetch(Global.url + "like/nolike/" + publicationId, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            });
            const data = await request.json();
            if (data.status === "success") {
                listgusta(publicationId);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const listgusta = async (publicationId) => {
        try {
            const request = await fetch(Global.url + "like/listlikes/" + publicationId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            });
            const data = await request.json();

            if (data.likesCount) {
                setLikesCount(data.likesCount);
            }
            if (data.nolikesCount) {
                setNoLikesCount(data.nolikesCount);
            }
            if (data.likes) {
                setGusta(data.likes);
            }
            if (data.Nolikes) {
                setNomeGusta(data.Nolikes);
            }
        } catch (error) {
            console.error(error);
        }
    };

    console.log(gusta)

    //issue queda pendiente obtener el listado de los usuarios que hicieron like y no like y ser mostrado como lista o pop up 

    return (
        <>
            <div>
                <button onClick={() => megusta(publicationId)} type="button" className={`btn btn-sm ${gusta.length > 0 ? 'btn-light' : 'btn-light'}`}>
                    <i className={`bi bi-hand-thumbs-up ${gusta.length > 0 ? 'text-black' : 'text-black'}`}></i>
                    <span className={`ml-1 ${gusta.length > 0 ? 'text-black' : 'text-black'}`}>{likesCount}</span> 
                </button>
                <button onClick={() => nogusta(publicationId)} type="button" className={`btn btn-sm ${nomegusta.length > 0 ? 'btn-light' : 'btn-light'}`}>
                    <i className={`bi bi-hand-thumbs-down ${nomegusta.length > 0 ? 'text-black' : 'text-black'}`}></i>
                    <span className={`ml-1 ${nomegusta.length > 0 ? 'text-black' : 'text-black'}`}>{nolikesCount}</span>
                </button>
            </div>
        </>
    );
};
