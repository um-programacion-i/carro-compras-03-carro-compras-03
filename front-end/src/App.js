import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Login} from './components/Login'
import {Admin} from './components/admin/Admin'
import {Productos} from './components/admin/Productos'
import {Usuarios} from './components/admin/Usuarios'
import {Reportes} from './components/admin/Reportes'
import {Distribuidores} from './components/admin/Distribuidores'
import {User} from './components/user/User'
import {DistribuidorDetalles} from './components/admin/report/DistribuidorDetalles'
import {VentasDetalles} from './components/admin/report/VentasDetalles'
import {UsuarioDetalles} from './components/admin/report/UsuarioDetalles'


function App() {

  return (
    <div className="App">
      <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <div>
              <Admin />
              <Route path="/Distribuidores" component={Distribuidores} />
              <Route path="/Productos" component={Productos} />
              <Route path="/Usuarios" component={Usuarios} />
              <Route path="/Reportes" component={Reportes} />
              <Route path="/DistribuidorDetalles" component={DistribuidorDetalles} />
              <Route path="/UsuarioDetalles" component={UsuarioDetalles} />
              <Route path="/VentasDetalles" component={VentasDetalles} />
              <Route path="/User" component={User} />
            </div>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
