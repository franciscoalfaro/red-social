import avatar from '../../assets/img/user.png'
import { Link } from 'react-router-dom'
import { Global } from '../../helpers/Global'
import useAuth from '../../hooks/useAuth'
import ReactTimeAgo from 'react-time-ago'

export const PublicationList = ({ publications, page, setPage, more, setMore, getPublications }) => {

    const { auth } = useAuth()

    const nextPage = () => {
        let next = page + 1
        setPage(next)
        getPublications(next)

    }

    const deletePublication = async (publicationId) => {
        const request = await fetch(Global.url + "publication/delete/" + publicationId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }

        })
        const data = await request.json()
        getPublications(1, true)
        setPage(1)
        setMore(true)
    }

    //cuando se efectue la publicacion de un enlace de youtube y se detecte en el cuerpo se

    const getYouTubeVideoId = (url) => {
        const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})(?:\S+)?$/;
        const matches = url.match(youtubeRegex);
        if (matches && matches.length >= 2) {
          return matches[1];
        }
        return null;
      };
      

    return (
        <>
            <div className="row justify-content-center custom-content">
                {publications.map(publication => {
                    const youtubeVideoId = getYouTubeVideoId(publication.text);
                    return (
                        <div className="col-md-10" key={publication._id}>
                            <div className="row mb-4">
                                <div className="col-md-12">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <Link to={"/social/perfil/" + publication.user._id} className="post__image-link">
                                                    {publication.user.image === 'default.png' && <img src={avatar} className="img-fluid img-thumbnail rounded-circle profile-image" alt="Foto de perfil" />}
                                                    {publication.user.image !== 'default.png' && <img src={Global.url + "user/avatar/" + publication.user.image} className="img-fluid img-thumbnail rounded-circle profile-image" alt="Foto de perfil" />}
                                                </Link>

                                                <div className="ml-3">
                                                    <Link to={"/social/perfil/" + publication.user._id} className="mb-0">{publication.user.name}  {publication.user.surname}</Link>
                                                    <span className="user-info__divider"> | </span>
                                                    <a href="#" className="user-info__create-date"><ReactTimeAgo date={new Date(publication.create_at).getTime()}></ReactTimeAgo></a>
                                                </div>
                                            </div>
                                            <p className="card-text publication-text">{publication.text}</p>
                                            {youtubeVideoId && (
                                                <div className="youtube-video">
                                                    <iframe
                                                        width="560"
                                                        height="315"
                                                        src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                                                        frameborder="0"
                                                        allowfullscreen
                                                    ></iframe>
                                                </div>
                                            )}
                                            <div className="custom-image">
                                                {publication.file && <img src={Global.url + "publication/media/" + publication.file} alt="Imagen de la publicación" className="img-fluid custom-img" />}
                                            </div>

                                            {auth._id === publication.user._id &&
                                                <button onClick={() => deletePublication(publication._id)} type="button" className="custom-btn btn btn-danger btn-sm"><i className="bi bi-trash"></i> Eliminar</button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {more &&
                <div className="">
                    <button type="button" className="btn btn-success" onClick={nextPage}>
                        Ver mas publicaciones
                    </button>
                </div>
            }


        </>
    )

}
