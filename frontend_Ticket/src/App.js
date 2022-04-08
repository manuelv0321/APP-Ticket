import React, {Fragment, useContext} from 'react';

// Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/*** Layout */
import Header from './componentes/layout/Header';
import Navegacion from './componentes/layout/Navegacion';

/** Componentes */

import NuevoTicket from './componentes/Ticket/NuevoTicket';
import Tickets from './componentes/Ticket/Tickets';
import Report from './componentes/Ticket/Report';
import EditarTicket from './componentes/Ticket/EditarTicket';
import Login from './componentes/auth/Login';
import NuevoUsuario from './componentes/auth/NuevoUsuario';

import { CRMContext, CRMProvider } from './context/CRMContext';

function App() {

    // utilizar context en el componente
    const [ auth, guardarAuth ] = useContext(CRMContext);


    return (
      <Router>
          <Fragment>
           
              <Header />

              <div className="grid contenedor contenido-principal">
                  <Navegacion />

                  <main className="caja-contenido col-9">
                        <Switch>
                            <Route exact path="/" component={Tickets} />
                            <Route exact path="/ticket/nuevo" component={NuevoTicket} />
                            <Route exact path="/ticket/Report" component={Report} />
                            <Route exact path="/ticket/Editar/:id" component={EditarTicket} />
                            <Route exact path="/usuario/nuevo" component={NuevoUsuario} />                            
                            <Route exact path="/iniciar-sesion" component={Login} />
                        </Switch>
                  </main>
              </div>
           
          </Fragment>
      </Router>
    )
}

export default App;