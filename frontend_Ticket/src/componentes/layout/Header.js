import React, {useContext} from 'react';

import { CRMContext } from '../../context/CRMContext';
import {withRouter,Link} from 'react-router-dom';

const Header = (props) => {

    const [auth, guardarAuth] = useContext(CRMContext);

    const cerrarSesion = () => {
        // auth.auth = false y el token se remueve
        guardarAuth({
            token: '',
            auth: false
        });

        localStorage.setItem('token', '');

        // redireccionar
        props.history.push('/iniciar-sesion');
    }

    return (
        <header className="barra">
            <div className="contenedor">
                <div className="contenido-barra">
                    <h1>Aplicación de Tickets</h1>

                    <ul>
                        <Link to={"/"} className="btn btn-verde nvo-cliente">                
                        Home
                        </Link>    
                    
                    </ul>

                    <ul>
                    <Link to={"/usuario/nuevo"} className="btn btn-verde"> 
                        <i className="fas fa-plus-circle"></i>
                        Nuevo Usuarios
                    </Link>
                    
                    </ul>

                    <ul>
                    <Link to={"/ticket/nuevo"} className="btn btn-verde"> 
                        <i className="fas fa-plus-circle"></i>
                        Nuevo Ticket
                    </Link>
                    
                    </ul>

                   
                    <ul>
                    <Link to={"/ticket/Report"} className="btn btn-verde"> 
                        <i className="fas fa-receipt"></i>
                        Report
                    </Link>
                    </ul>
                    <ul>
                    <button 
                        type="button"
                        className="btn btn-rojo"
                        onClick={cerrarSesion}
                    >
                        <i className="far fa-times-circle"></i>
                        Cerrar Sesión
                    </button>
                    </ul>
                    
                
                </div>
                
            </div>
        </header>
    )

}

export default withRouter(Header);