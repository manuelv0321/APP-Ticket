import React, { useEffect, useState, useContext, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';
import nextId from "react-id-generator";

function Report(props) {

    const[datos, guardarDatos] = useState({      
        start : '',
        dateend: ''
    });

    const [estado, setestado] = useState(0);
    const [resultado, setResultado] = useState(0);

    const actualizarState = e => {
        // Almacenar lo que el usuario escribe en el state
        guardarDatos({
            // obtener una copia del state actual
            ...datos, 
            [e.target.name] : e.target.value
        })

    }

        // Añade en la REST API un cliente nuevo
        const GererarReporte = e => {
            e.preventDefault();
    
          //  console.log(datos);
            if(datos.dateend=='' || datos.start==''){

                Swal.fire({
                    type: 'error',
                    title: 'Hubo un error',
                    text: 'debes seleccionar una fecha valida'
                })

                return;

            }else{
                
                var report = {};
                report.fechas = datos;
                report.estado = estado;
                //console.log(report)

                clienteAxios.post('/Report', report,{
                    headers: {
                        Authorization : `Bearer ${localStorage.getItem('token')}`
                    }
                }).then(res => {
                    // validar si hay errores de mongo 
                    if(res.data ==='No Autenticado, no hay JWT') {
                        Swal.fire({
                            type: 'error',
                            title: 'Hubo un error',
                            text: 'Token expirado o no existe'
                        })
                        props.history.push('/iniciar-sesion');
                    } else {
                        setResultado(res.data)
                    }
                    // Redireccionar
                   // props.history.push('/');
                });
                

                //setResultado
                

            }
        
        }


        const columna = [
            {
             name: 'id',
             selector: 'id',
             sortable: true
            },
            {
             name: 'DATE',
             selector: 'date',
             sortable: true
            },
            {
                name: 'HOURS',
                selector: 'hours',
                sortable: true
            },
            {
                name: 'END DATE',
                selector: 'enddate',
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
                name: 'USER ID',
                selector: 'user_id',
                sortable: true
            },
            {
                name: 'USERNAME',
                selector: 'name',
                sortable: true
            }
         
          
           
        ] 
    


    return (
        <Fragment>

       

            <h2>Report</h2>

            <form
                onSubmit={GererarReporte}
            >
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
                        <label>Estado:</label>
                        <select
                            className="campo"
                            name="user"
                            value={estado}
                            onChange={(e) => {
                            const estado = e.target.value;
                            setestado(estado);
                            }}
                        >
                            <option value="0">Seleccionar</option> 
                            <option value="1">Activo</option>  
                            <option value="2">Cerrado</option>     
                        </select>
                    </div>

                    <div className="enviar">
                    <input 
                        type="submit" 
                        className="btn btn-azul" 
                        value="Generar Reporte" 
                       
                    />
                </div>
            </form>

            <DataTable
                columns={columna}
                data={resultado}
                title='Listado De Tickets'
                key={nextId()}
            />

        </Fragment>
       
     )

}

export default withRouter(Report);