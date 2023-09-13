import React, { useState } from 'react'
import avatar from '../../../assets/img/user.png'
import useAuth from '../../../hooks/useAuth'
import { Global } from '../../../helpers/Global'
import { Link } from 'react-router-dom'
import { useForm } from '../../../hooks/useForm'
import { Footer } from '../public/Footer'


export const Sidebar = () => {
    const { auth, counters } = useAuth()
    const { form, changed } = useForm()
    const [stored, setStored] = useState("not_stored")
    const [user, setUser] = useState({})


    const savePublication = async (e) => {
        e.preventDefault()

        const token = localStorage.getItem('token')

        //recoger datos del formulario
        let newPublication = form
        newPublication.user = auth._id

        //hacer request
        const request = await fetch(Global.url + "publication/save", {
            method: "POST",
            body: JSON.stringify(newPublication),
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })

        const data = await request.json()

        //mostrar mejs
        if (data.status == "success") {
            setStored("stored")
        } else {
            setStored("error")
        }

        //subir imag
        const fileInput = document.querySelector("#file");
        if (data.status == "success" && fileInput.files[0]) {
            // Recoger imagen a subir
            const compressedFile = await compressImage(fileInput.files[0], 800, 600, 0.7);

            // Crear FormData con la imagen comprimida
            const formData = new FormData();
            formData.append('file0', compressedFile);

            // Peticion para enviar el fichero
            const uploadRequest = await fetch(Global.url + "publication/upload/" + data.publicationStored._id, {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": token
                }
            })
            const uploadData = await uploadRequest.json()
            if (uploadData.status == "success") {
            
                setStored("stored")
            } else {
                setStored("error")
            }
        }

        // Función para comprimir la imagen
        async function compressImage(file, maxWidth, maxHeight, quality) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (event) => {
                    const img = new Image();
                    img.src = event.target.result;
                    img.onload = () => {
                        // Crear un lienzo (canvas) para dibujar la imagen comprimida
                        const canvas = document.createElement('canvas');
                        let width = img.width;
                        let height = img.height;
                        if (width > maxWidth) {
                            // Redimensionar la imagen si supera el ancho máximo
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                        if (height > maxHeight) {
                            // Redimensionar la imagen si supera la altura máxima
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        // Dibujar la imagen en el lienzo con el tamaño redimensionado
                        ctx.drawImage(img, 0, 0, width, height);
                        // Convertir el lienzo a un archivo comprimido (blob)
                        canvas.toBlob((blob) => {
                            // Crear un nuevo archivo con el blob comprimido
                            const compressedFile = new File([blob], file.name, { type: file.type });
                            resolve(compressedFile);
                        }, file.type, quality);
                    };
                };
                reader.onerror = (error) => reject(error);
            });
        }

        if (data == null) {
            console.log("form vacio")
        }


        const myForm = document.querySelector("#publication-form")
        myForm.reset()


    }

    return (
        <>


            <div className="col-md-3">
                <div className="card">
                    {auth.image == 'default.png' && <img src={avatar} className="card-img-top img-fluid img-thumbnail" alt="Foto de perfil"></img>}
                    {auth.image != 'default.png' && <img src={Global.url + "user/avatar/" + auth.image} className="card-img-top img-fluid img-thumbnail" alt="Foto de perfil"></img>}
                    <div className="card-body">
                        <Link to={"/social/perfil/" + auth._id} className="card-title">{auth.name} {auth.surname}</Link>
                        <p className="card-text">{auth.nick}</p>
                        <p className="card-text">{auth.bio}</p>
                        <div className="d-flex justify-content-between">
                            <div className="section">
                                <h6>Siguiendo</h6>
                                <Link to={"/social/siguiendo/" + auth._id} className="following__link">
                                    <span className="">{counters.following}</span>
                                </Link>
                            </div>
                            <div className="section">
                                <h6>Seguidores</h6>
                                <Link to={"/social/seguidores/" + auth._id} className="following__link">
                                    <span className="">{counters.followed}</span>
                                </Link>
                            </div>
                            <div className="section">
                                <h6>Publicaciones</h6>
                                <Link to={"/social/perfil/" + auth._id} className="following__link">
                                    <span className="following__number">{counters.publications}</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mt-4">
                    {stored == "stored" ? <strong className='alert alert-success'>Publicacion realizada correctamente</strong> : ""}
                    {stored == "error" ? <strong className='alert alert-warning'>error al realizar publicacion intenta nuevamente</strong> : ""}

                    <div className="card-body">
                        <h5 className="card-title">Nueva Publicación</h5>
                        <form id="publication-form" onSubmit={savePublication}>
                            <div className="mb-3">
                                <label htmlFor="text" className="form-post__label">¿Que estas pesando hoy?</label>
                                <textarea name="text" className="form-control" placeholder="Escribe tu publicación" onChange={changed} required onInvalid={(e) => e.target.setCustomValidity('Por favor, ingresa al menos el título')}></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="file">Subir imagen:</label>
                                <input type="file" name="file0" id="file" className="form-control"></input>
                            </div>
                            <input type="submit" value="Publicar" className="btn btn-success"></input>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}
