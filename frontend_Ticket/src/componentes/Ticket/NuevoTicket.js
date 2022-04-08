import React, {Fragment, useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import { Link, withRouter } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import DataTable from 'react-data-table-component';
import nextId from "react-id-generator";

function NuevoTicket({history}){

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
        Subject: '',
        Description: '',
        start : '',
        dateend: '',
        hour: ''
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
    const agregarCliente = e => {
        e.preventDefault();


        var Ticket = {};
        Ticket.cliente =cliente;
        Ticket.Usuarios = users; 
        // enviar petición
        clienteAxios.post('/Tickets', Ticket,{
            headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
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

    // Validar el formulario
    const validarCliente = () => {
        // Destructuring
        const {Subject, Description, start, dateend, user} = cliente;

        // revisar que las propiedades del state tengan contenido
        let valido = !Subject.length || !Description.length || !start.length || !dateend.length;

        // return true o false
        return valido;
    }

    //asignar usuario
  

    // verificar si el usuario esta autenticado o no
    if(localStorage.getItem('token') ===''  ) {
        history.push('/iniciar-sesion');
    }

    const [user, setuser] = useState(0);
    const [users,setUsers] = useState([]);
  //  const [guardaruser, setguardaruser] = useState(guardaruser);
    const asignar =(id)=>{


      


        setUsers([...users,id]);
       /* if(id>=0){
            console.log(id)
        }else{
            console.log("no")
        }*/
        /*console.log(id)
        if(users.length>0){
            setUsers([...users,id]);
            
        }else{
            setUsers([id]);
           // setUsers([...users,id]);
        }*/
        console.log(users)
       
        
    }



    const Finish = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Seguro quieres Finalizar este Ticket?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Finalizar',
            cancelButtonText : 'No, Cancelar'
        }).then((result) => {
            
            if (result.value) {
             
                 clienteAxios.post('/Ticket',id, {
                    headers: {
                        Authorization : `Bearer ${localStorage.getItem('token')}`
                    }
                }).then(res => {
                    console.log(res)
                    if(res.status === 200) {
                        Swal.fire(
                            'Eliminado',
                            res.data.mensaje,
                            'success'
                        )
                       
                    }else{
                       history.push('/iniciar-sesion');
                    }
                })
            }
        })
    };

    return (


        <Fragment>

          

            <h2>Nuevo Ticket</h2>
            
            <form
                onSubmit={agregarCliente}
            >
                <legend>Llena todos los campos</legend>
                <div className="campo">
                    <label>Subject:</label>
                    <input  type="text" 
                            placeholder="Subject" 
                            name="Subject"
                            onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Description:</label>
                    <input type="text" 
                          placeholder="Description" 
                          name="Description" 
                          onChange={actualizarState}
                    />
                </div>
            
                <div className="campo">
                    <label>date start:</label>
                    <input type="date" 
                          placeholder="Empresa Cliente" 
                          name="start" 
                          onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>date end:</label>
                    <input type="date" 
                            placeholder="Email Cliente" 
                            name="dateend" 
                            onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>hour:</label>
                    <input type="text" 
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                        }}
                            placeholder="Hour" 
                            name="hour" 
                            onChange={actualizarState}
                    />
                </div>

           

                <div className="campo left">
                    
                  <label>Usuario:</label>
                    <select
                        className="campo"
                        name="user"
                        value={user}
                        onChange={(e) => {
                        const user = e.target.value;
                        setuser(user);
                           
                            if(users.length==1){
                                setUsers([...users,user]);
                                //console.log(setUsers([user]))
                            }
                        }}
                    >
                    <option value="0">Seleccionar</option>
                    {usuarios.map((usuario, index) => (
                        
                          <option key={usuario.id} value={usuario.id}>{usuario.name}</option>
                    ))}
                        
                        

                    </select>

                  

                    <button 
                        type="button" 
                        className="right "
                        onClick={() => asignar(user)}
                      >+
                       </button>
                  
                </div>
                <br/>
                
               
               

             

                <div className="enviar">
                    <input 
                        type="submit" 
                        className="btn btn-azul" 
                        value="Crear Ticket" 
                        disabled={ validarCliente() }
                    />
                </div>
            </form>
        </Fragment>
    )
}

// HOC, es una función que toma un componente y retorna un nuevo componente
export default  withRouter(NuevoTicket);