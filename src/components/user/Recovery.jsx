import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { Global } from '../../helpers/Global';
import { Spiner } from '../../hooks/Spiner';
import { useNavigate } from 'react-router-dom'


export const Recovery = () => {
  const { form, changed } = useForm({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const recoverUser = async (e) => {
    e.preventDefault();
    setLoading(true); // Iniciamos el indicador de carga

    try {
      let userRecovery = form;

      const request = await fetch(Global.url + "recovery/newpass", {
        method: "POST",
        body: JSON.stringify(userRecovery),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await request.json();

      if (data.status === "success") {
        // Mostramos un mensaje de éxito usando SweetAlert2
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'En caso de existir se enviará correo con clave provisional',
          showConfirmButton: false,
          timer: 1150
        });

        setTimeout(() => { window.location.reload() }, 1200);
        navigate('/login')
      } else {
        // Mostramos un mensaje de error si la solicitud no fue exitosa
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Existe un error, intenta más tarde',
        });
      }
    } catch (error) {
      console.error("Error:", error);
      // Manejo de errores
    } finally {
      setLoading(false); // Desactivamos el indicador de carga después de la solicitud
    }
  };

  return (
    <>
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 login-container">
          <div className="login-form text-center">
            <h2>Recuperar Clave</h2>
            <form onSubmit={recoverUser}>
              <div className="form-group">
                <label htmlFor="email" className="">Dirección de correo</label>
                <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={changed} required />
              </div>
              {loading ? ( // Mostrar el spinner si loading es true
                <Spiner />
              ) : (
                <button type="submit" className="btn btn-primary">Recuperar Clave</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
