import avatar from '../../assets/img/user.png'
import { useEffect, useState } from 'react';
import { Global } from '../../helpers/Global';
import ReactTimeAgo from 'react-time-ago'
import { Link, NavLink } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import useAuth from '../../hooks/useAuth';


export const CommentList = ({ publicationId, publicationUser }) => {
    const [comments, setComments] = useState([]);
    const [more, setMore] = useState(true)
    const [page, setPage] = useState(1)
    const [saved, setSaved] = useState('not_saved')
    const [linkClicked, setLinkClicked] = useState(false);
    const { form, changed } = useForm()
    const { auth, counters } = useAuth()



    useEffect(() => {
        // Lógica para obtener los comentarios de la API y establecerlos en el estado "comments"
        ListComment(publicationId);
    }, [publicationId, linkClicked]);

    useEffect(() => {
        ListComment(publicationId);

    }, [publicationId], setSaved)





    const nextPage = () => {
        let next = page + 1;
        ListComment(publicationId, next);
        setPage(next);
    };
    //boton para renderizar nuevamente el perfil
    const handleLinkClick = () => {
        setLinkClicked(true);
    };



    const ListComment = async (publicationId, nextPage = 1, showNew = false) => {

        if (showNew) {
            setComments([])
            setPage(1)

        }

        try {
            const response = await fetch(Global.url + "publication/comment/" + publicationId + '/' + nextPage, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            });

            const data = await response.json();

            if (data.status == "success") {
                let newComment = data.comments

                if (!showNew && comments.length >= 1) {
                    newComment = [...comments, ...data.comments]
                }

                setComments(newComment)

                if (!showNew && comments.length >= (data.total - data.comments.length)) {
                    setMore(false)

                }
                if (data.page <= 0) {
                    setMore(false)
                }
            } if (data.status == "error") {
                setSaved("error")
                setMore(false)
            }



        } catch (error) {
            console.error(error);
        }
    }


    //eliminar comentarios

    const deleteComment = async (commentsId) => {
        try {
            const request = await fetch(Global.url + "publication/deletecomment/" + commentsId, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }

            })
            const data = await request.json()

            if (data.status === "success") {
                setComments((prevComments) =>
                    prevComments.filter((comment) => comment._id !== commentsId)
                );
            } else {
                // handle error case if necessary
            }
        } catch (error) {
            console.error(error);
        }


    }


    const saveComent = async (e) => {
        e.preventDefault();

        let newComent = form
        newComent.user = auth._id

        const request = await fetch(Global.url + "publication/savecomment/" + publicationId, {
            method: "POST",
            body: JSON.stringify(newComent),
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }

        })

        const data = await request.json()
        if (data.status == "success") {
            setComments([])
            setSaved("stored")
        } else {
            setSaved("error")
        }

        const myForm = document.querySelector("#coment-form")
        myForm.reset()


    }



    return (
        <div>
            <h2>Comentarios</h2>
            {comments.length > 0 ? (
                <ul>
                    {comments.map((comment) => (
                        <div className="comments mt-4" key={comment._id}>
                            <div className="comment">
                                <div className="d-flex align-items-start">
                                    {comment.user.image === 'default.png' && <img src={avatar} className="img-fluid img-thumbnail rounded-circle profile-image-nav" alt="Foto de perfil" />}
                                    {comment.user.image !== 'default.png' && <img src={Global.url + "user/avatar/" + comment.user.image} className="img-fluid img-thumbnail rounded-circle profile-image-nav" alt="Foto de perfil" />}
                                    <div className="comment-details ml-3">
                                        <div className="d-flex justify-content-between">
                                            <p className="comment-author">{comment.user.nick}</p>
                                            <span className="user-info__divider">|</span>
                                            <NavLink to={"/social/perfil/" + comment.user._id} onClick={handleLinkClick} className="user-info__create-date"><ReactTimeAgo date={new Date(comment.create_at).getTime()}></ReactTimeAgo></NavLink>
                                        </div>
                                        <p className="comment-text">{comment.comentario}</p>
                                        {
                                            (auth._id === publicationUser || auth._id === comment.user._id) && (
                                                <div className="mt-4">
                                                    <button type="button" className="custom-btn btn btn-primary" onClick={() => deleteComment(comment._id)} >Eliminar</button>
                                                </div>
                                            )
                                        }



                                    </div>
                                </div>
                            </div>
                        </div>

                    ))}
                </ul>
            ) : (
                <p>No hay comentarios.</p>
            )}



            {more &&
                <div className="">
                    <span className="pointer" onClick={nextPage}>Ver mas comentarios</span>
                </div>
            }




            <form className="coment-form" onSubmit={saveComent}>
                <textarea name="text" className="form-control" rows="3" placeholder="Escribe un comentario" onChange={changed} required onInvalid={(e) => e.target.setCustomValidity('Debes ingresar el comentario')}></textarea>
                <button type="submit" className="custom-btn btn btn-primary">Comentar</button>
            </form>


        </div>

    );
};
