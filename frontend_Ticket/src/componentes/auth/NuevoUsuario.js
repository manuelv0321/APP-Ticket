import React, {Fragment, useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import { Link, withRouter } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import DataTable from 'react-data-table-component';
import nextId from "react-id-generator";

function NuevoUsuario({history}){

    const [ usuarios, guardarUsuarios ] = useState([]);

    useEffect( () => {

       let token = localStorage.getItem('token', token);
            // Query a la API
            const consultarAPI = async () => {
               
                try {
                    const clientesConsulta = await clienteAxios.get('/clientes', {
                        headers: {
                            Authorization : `Bearer ${token}`
                        }
                    });
                    
                    console.log(clientesConsulta);
                    // colocar el resultado en el state
                    guardarUsuarios(clientesConsulta.data);
                   

                } catch (error) {
                    // Error con authorizacion
                    if(error.response.status = 500) {
                       history.push('/iniciar-sesion');
                    }
                }
            }
            consultarAPI();
        
    }, [] );




    // cliente = state, guardarcliente = funcion para guardar el state
    const[cliente, guardarCliente] = useState({
        repeatpassword: '',
        password: '',
        username : '',
        lastname: '',
        name: ''
    });
    

    // leer los datos del formulario
    const actualizarState = e => {
        // Almacenar lo que el usuario escribe en el state
        guardarCliente({
            // obtener una copia del state actual
            ...cliente, 
            [e.target.name] : e.target.value
        })

    }

    // Añade en la REST API un cliente nuevo
    const agregarCliente = async e => {
        e.preventDefault();


       if(cliente.repeatpassword != cliente.password){

        Swal.fire({
            type: 'error',
            title: 'Hubo un error',
            text: 'Password no coinciden'
        })
            return;
       }else{

        const respuesta = await clienteAxios.get(`/Usuario/${cliente.username}`);

        if(respuesta.data['cantidad']>=1){

            Swal.fire({
                type: 'error',
                title: 'Hubo un error',
                text: 'Usuario Existe en nuestra base de datos'
            })
                return;

        }else{

            clienteAxios.post('/crear-cuenta', cliente)
            .then(res => {
                // validar si hay errores de mongo 
                if(res.data ==='No Autenticado, no hay JWT') {
                    Swal.fire({
                        type: 'error',
                        title: 'Hubo un error',
                        text: 'Token expirado o no existe'
                    })
                    history.push('/iniciar-sesion');
                } else {
                    Swal.fire(
                        'Se agregó el Cliente',
                        res.data.mensaje,
                        'success'
                    )
                }
                // Redireccionar
                history.push('/');
            });

        }

       }
      
    }

    // Validar el formulario
    const validarCliente = () => {
        // Destructuring
        const {repeatpassword, password, username, lastname, name} = cliente;

        // revisar que las propiedades del state tengan contenido
        let valido = !repeatpassword.length || !password.length || !username.length || !lastname.length || !name.length;

        // return true o false
        return valido;
    }

    //asignar usuario
  

    // verificar si el usuario esta autenticado o no
    

    const [user, setuser] = useState(0);
    const [users,setUsers] = useState([]);




 

    return (


        <Fragment>

          

            <h2>Nuevo Usuario</h2>
            
            <form
                onSubmit={agregarCliente}
            >
                <legend>Llena todos los campos</legend>
                <div className="campo">
                    <label>Name:</label>
                    <input  type="text" 
                            placeholder="Name" 
                            name="name"
                            onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Lastname:</label>
                    <input type="text" 
                          placeholder="lastname" 
                          name="lastname" 
                          onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>username:</label>
                    <input type="text" 
                          placeholder="username" 
                          name="username" 
                          onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>password:</label>
                    <input type="password" 
                          placeholder="password" 
                          name="password" 
                          onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>repeat password:</label>
                    <input type="password" 
                          placeholder="repeat password" 
                          name="repeatpassword" 
                          onChange={actualizarState}
                    />
                </div>


                
            

                  

                 
                  
                
                <br/>

                <div className="enviar">
                    <input 
                        type="submit" 
                        className="btn btn-azul" 
                        value="Crear Usuario" 
                        disabled={ validarCliente() }
                    />
                </div>
            </form>
        </Fragment>
    )
}

// HOC, es una función que toma un componente y retorna un nuevo componente
export default  withRouter(NuevoUsuario);