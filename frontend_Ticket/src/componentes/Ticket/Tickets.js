import React, { useEffect, useState, Fragment } from 'react';

// importar cliente axios
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { Link, withRouter } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import nextId from "react-id-generator";


function Tickets(props) {

    // Trabajar con el state
    // clientes = state,  guardarClientes = funcion para guardar el state
    const [clientes, guardarClientes] = useState([]);

    

    // use effect es similar a componentdidmount y willmount
    useEffect( () => {

        consultarAPI();
            
           
       
    }, [] );

   const columna = [
       {
        name: 'ID',
        selector: 'id',
        sortable: true
       },
       {
        name: 'DATE',
        selector: 'date',
        sortable: true
       },
       {
        name: 'SUBJECT',
        selector: 'subject',
        sortable: true
       },
       {
        name: 'description',
        selector: 'description',
        sortable: true
       },
    
       {
        name: 'action',
        cell: (id ) => (
            <>
          <Link to={`/Ticket/editar/${id.id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                     E
                </Link>&nbsp;&nbsp;

            <span onClick={() => Finish(id)} className='btn btn-verde'>F</span>
          </>
        ),
       }
      
   ] 

/*const EditTicket = (id) => {
    props.history.push('/iniciar-sesion');
};*/

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
                    consultarAPI();
                }else{
                    props.history.push('/iniciar-sesion');
                }
            })
        }
    })
};
// Query a la API
const consultarAPI = async () => {
    try {
        const clientesConsulta = await clienteAxios.get('/Ticket', {
            headers: {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        });

        // colocar el resultado en el state
        guardarClientes(clientesConsulta.data);

    } catch (error) {
        // Error con authorizacion
        if(error.response.status = 500) {
            props.history.push('/iniciar-sesion');
        }
    }
}
    // Si el state esta como false
 

   

    
    return (
        <Fragment>
        
            <h2>Tickets</h2>


            <DataTable
                columns={columna}
                data={clientes}
                title='Listado De Tickets'
                pagination
                key={nextId()}
            />
           

        </Fragment>
    )
}
export default withRouter(Tickets);