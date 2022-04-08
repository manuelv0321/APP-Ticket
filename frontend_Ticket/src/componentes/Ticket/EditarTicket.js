import React, {Fragment, useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom'; 
import clienteAxios from '../../config/axios';
import moment from 'moment';


function EditarTicket(props){

    const { id } = props.match.params;
   
    const [usuarios, guardarUsuarios ] = useState([]);

    useEffect( () => {

       

       let token = localStorage.getItem('token', token);
            // Query a la API
            const consultarAPI = async () => {
                try {
                    const clientesConsulta = await clienteAxios.get(`/Ticket/${id}`, {
                        headers: {
                            Authorization : `Bearer ${token}`
                        }
                    });
                    
                    //console.log(clientesConsulta.data[0]);
                    // colocar el resultado en el state
                    guardarCliente(clientesConsulta.data[0]);

                } catch (error) {
                    // Error con authorizacion
                    if(error.response.status = 500) {
                       props.history.push('/iniciar-sesion');
                    }
                }
            }
            consultarAPI();
        
    }, [] );

    useEffect( () => {

        let token = localStorage.getItem('token', token);
             // Query a la API
             const consultarAPICliente = async () => {
                 try {
                     const clientesConsulta = await clienteAxios.get('/clientes', {
                         headers: {
                             Authorization : `Bearer ${token}`
                         }
                     });
                     
                  //   console.log(clientesConsulta);
                     // colocar el resultado en el state
                     guardarUsuarios(clientesConsulta.data);
 
                 } catch (error) {
                     // Error con authorizacion
                     if(error.response.status = 500) {
                        props.history.push('/iniciar-sesion');
                     }
                 }
             }
             consultarAPICliente();
         
     }, [] );


   

    // cliente = state, guardarcliente = funcion para guardar el state
    const[cliente, guardarCliente] = useState({
        subject: '',
        sescription: '',
        date : '',
        dateend: '',
        hours: ''
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
    const ActualizarTicket = e => {

        e.preventDefault();


       /* var Ticket = {};
        Ticket.cliente =cliente;*/ 
        // enviar petición
        clienteAxios.post('/TicketUpdate', cliente,{
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
                    props.history.push('/iniciar-sesion');
                } else {
                    Swal.fire(
                        'Se agregó el Cliente',
                        res.data.mensaje,
                        'success'
                    )
                }
                // Redireccionar
                props.history.push('/');
            });
    }

   
  

    // verificar si el usuario esta autenticado o no
    if(localStorage.getItem('token') ===''  ) {
        props.history.push('/iniciar-sesion');
    }

    const [user, setuser] = useState(0);
    const [users,setUsers] = useState([]);
  //  const [guardaruser, setguardaruser] = useState(guardaruser);
    const asignar =(id)=>{

        setUsers([...users,id]);
       
     
    }
    //const {date, dateend, description,hours,subject } = cliente;

    const leerInformacionProducto = e => {
        guardarCliente({
            // obtener una copia del state y agregar el nuevo
            ...cliente,
            [e.target.name] : e.target.value
        })
    }
    return (


        <Fragment>
            <h2>Editar Ticket</h2>
            
            <form
                onSubmit={ActualizarTicket}
            >
                <legend>Llena todos los campos</legend>
                <div className="campo">
                    <label>Subject:</label>
                    <input  type="text" 
                            placeholder="Subject" 
                            name="subject"
                            onChange={actualizarState}
                            defaultValue={cliente['subject']}
                    />
                </div>

                <div className="campo">
                    <label>Description:</label>
                    <input type="text" 
                          placeholder="Description" 
                          name="description" 
                          onChange={actualizarState}
                          defaultValue={cliente['description']}
                    />
                </div>
            
                <div className="campo">
                    <label>date start:</label>
                    <input type="date" 
                          placeholder="Empresa Cliente" 
                          name="date" 
                          onChange={actualizarState}
                         // defaultValue={cliente['date']}
                         defaultValue={moment.utc(cliente['start']).format('YYYY-MM-DD')}
                    />
                </div>

                <div className="campo">
                    <label>date end:</label>
                    <input type="date" 
                            placeholder="Email Cliente" 
                            name="dateend" 
                            onChange={actualizarState}
                            //defaultValue={cliente['dateend']}
                            defaultValue={moment.utc(cliente['start']).format('YYYY-MM-DD')}
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
                            name="hours" 
                            onChange={actualizarState}
                            defaultValue={cliente['hours']}
                    />
                </div>

           

              
                <br/>
             

                <div className="enviar">
                    <input 
                        type="submit" 
                        className="btn btn-azul" 
                        value="Actualizar Ticket" 
                       
                    />
                </div>
            </form>
        </Fragment>
    )
}

// HOC, es una función que toma un componente y retorna un nuevo componente
export default  withRouter(EditarTicket);