import React, {useState} from 'react';
import Swal from 'sweetalert2';
import { Link, withRouter } from 'react-router-dom';
import clienteAxios from '../../config/axios';


function Login(props){

    // Auth y token
   

    // State con los datos del formulario
    const [ credenciales, guardarCredenciales] = useState({});


    // iniciar sesión en el servidor
    const iniciarSesion = async e => {
        e.preventDefault();

       // console.log("llego")

        // autenticar al usuario

        try {

            
            const respuesta = await clienteAxios.post('/iniciar-session',credenciales);

            console.log(respuesta.data);
            
            // extraer el token y colocarlo en localstorage
            const { token } = respuesta.data;
            localStorage.setItem('token', token);

            // colocarlo en el state
           

            // alerta
           Swal.fire(
                'Login Correcto',
                'Has iniciado Sesión',
                'success'
            )

            // redireccionar
            props.history.push('/');

            
        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: error.response.data.mensaje
            })
        }
    }

    // almacenar lo que el usuario escribe en el state
    const leerDatos = e => {
        //console.log(e)
        guardarCredenciales({
            ...credenciales,
            [e.target.name] : e.target.value
        })
    }

    return(

        <div className="login">
            <h2>Iniciar Sesión</h2>

            <div className="contenedor-formulario">
                <form
                    onSubmit={iniciarSesion}
                >

                    <div className="campo">
                        <label>username</label>
                        <input 
                            type="text"
                            name="username"
                            placeholder="Usuario para Iniciar Sesión"
                            required
                            onChange={leerDatos}
                        />
                    </div>

                    <div className="campo">
                        <label>Password</label>
                        <input 
                            type="password"
                            name="password"
                            placeholder="Password para Iniciar Sesión"
                            required
                            onChange={leerDatos}
                        />
                    </div>

                    <input type="submit" value="Iniciar Sesión" className="btn btn-verde btn-block" />
                </form>
                <br/>
                <div align="center">
                <Link to={"/usuario/nuevo"}> 
                      
                      Crea una Cuenta 
                  </Link>

                </div>
                
            </div>
        </div>
    )
}

export default withRouter(Login);