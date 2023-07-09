import avatar from '../../assets/img/user.png';
import { useEffect, useState } from 'react';
import { Global } from '../../helpers/Global';
import ReactTimeAgo from 'react-time-ago';
import { Link, NavLink } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import useAuth from '../../hooks/useAuth';

export const CommentList = ({ publicationId, publicationUser }) => {
    const [comments, setComments] = useState([]);
    const [more, setMore] = useState(true);
    const [page, setPage] = useState(1);
    const [saved, setSaved] = useState('not_saved');
    const [linkClicked, setLinkClicked] = useState(false);
    const { form, changed } = useForm();
    const { auth, counters } = useAuth();

    useEffect(() => {
        ListComment(publicationId);
    }, [publicationId, linkClicked]);

    useEffect(() => {
        ListComment(publicationId);
    }, [publicationId], setSaved);

    const nextPage = () => {
        let next = page + 1;
        ListComment(publicationId, next);
        setPage(next);
    };

    const handleLinkClick = () => {
        setLinkClicked(true);
    };

    const ListComment = async (publicationId, nextPage = 1, showNew = false) => {
        if (showNew) {
            setComments([]);
            setPage(1);
        }

        try {
            const response = await fetch(Global.url + 'publication/comment/' + publicationId + '/' + nextPage, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            });

            const data = await response.json();

            if (data.status === 'success') {
                let newComment = data.comments;

                if (!showNew && comments.length >= 1) {
                    newComment = [...comments, ...data.comments];
                }

                setComments(newComment);

                if (!showNew && comments.length >= (data.total - data.comments.length)) {
                    setMore(false);
                }
                if (data.page <= 0) {
                    setMore(false);
                }
            }
            if (data.status === 'error') {
                setSaved('error');
                setMore(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteComment = async (commentId) => {
        try {
            const request = await fetch(Global.url + 'publication/deletecomment/' + commentId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            });

            const data = await request.json();

            if (data.status === 'success') {
                setComments((prevComments) =>
                    prevComments.filter((comment) => comment._id !== commentId)
                );
            } else {
                // handle error case if necessary
            }
        } catch (error) {
            console.error(error);
        }
    };

    const saveComment = async (e) => {
        e.preventDefault();

        let newComment = form;
        newComment.user = auth._id;

        try {
            const response = await fetch(Global.url + 'publication/savecomment/' + publicationId, {
                method: 'POST',
                body: JSON.stringify(newComment),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            });

            const data = await response.json();

            if (data.status === 'success') {
                ListComment(publicationId, 1, true);
                setSaved('stored');
            } else {
                setSaved('error');
            }


        } catch (error) {
            console.error(error);
        }

        const myForm = document.querySelector("#coment-form")
        myForm.reset()


    }




    return (
        <div className="container mt-4">
            <h2>Comentarios</h2>
            {comments.length > 0 ? (
                <div>
                    {comments.map((comment) => (
                        <div key={comment._id} className="comment-box mb-4">
                            <div className="media">
                                {comment.user.image === 'default.png' && <img src={avatar} className="mr-3 img-fluid img-thumbnail rounded-circle profile-image-nav" alt="Foto de perfil" />}
                                {comment.user.image !== 'default.png' && <img src={Global.url + 'user/avatar/' + comment.user.image} className="mr-3 img-fluid img-thumbnail rounded-circle profile-image-nav" alt="Foto de perfil" />}
                                <div className="media-body">
                                    <div className="d-flex justify-content-between">
                                        <h6 className="mt-0">{comment.user.nick} | <NavLink to={'/social/perfil/' + comment.user._id} onClick={handleLinkClick} className="user-info__create-date"><ReactTimeAgo date={new Date(comment.create_at).getTime()} /></NavLink></h6>
                                        {(auth._id === publicationUser || auth._id === comment.user._id) && (
                                            <button type="button" className="btn-remove btn btn-danger" onClick={() => deleteComment(comment._id)}><i className="bi bi-x-circle-fill"></i></button>
                                        )}
                                    </div>
                                    <p className="comment-text">{comment.comentario}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No hay comentarios.</p>
            )}

            {more && (
                <div className="">
                    <span className="pointer" onClick={nextPage}>Ver más comentarios</span>
                </div>
            )}

            <form id="coment-form" onSubmit={saveComment}>
                <textarea name="text" className="form-control" rows="3" placeholder="Escribe un comentario" onChange={changed} required onInvalid={(e) => e.target.setCustomValidity('Debes ingresar el comentario')}></textarea>
                <button type="submit" className="custom-btn btn btn-primary">Comentar</button>
            </form>
        </div>
    );
};
