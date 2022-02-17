import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Login} from './components/Login'
import {Admin} from './components/admin/Admin'
import {Productos} from './components/admin/Productos'
import {Usuarios} from './components/admin/Usuarios'
import {Distribuidores} from './components/admin/Distribuidores'
import {ClientesDetalles} from './components/admin/report/ClientesDetalles'
import {VentasDetalles} from './components/admin/report/VentasDetalles'
import {DistribuidorDetalles} from './components/admin/report/DistribuidorDetalles'
import {User} from './components/user/User'
import {Carrito} from './components/user/Carrito'
import {ComprasDetalles} from './components/user/ComprasDetalles'




function App() {

  /*return (
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
              <Route path="/User" component={User} />
            </div>
          </Switch>
      </Router>
    </div>
  );*/

 /* const cookies = new Cookies()

  const User = () => {
    return cookies.get('nombre')
  }

  console.log(User())*/

  // POSIBLE FIX A OCULTAR NAVBAR
    return(
      <div className="App">
        <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/Admin" component={Admin}>
                <Admin />
                </Route>
              <Route exact path="/Admin/Distribuidores" component={Distribuidores}>
                <Admin />
                <Distribuidores />
              </Route>
              <Route exact path="/Admin/Productos" component={Productos}>
                <Admin/>
                <Productos/>
              </Route>
              <Route exact path="/Admin/Usuarios" component={Usuarios}>
                <Admin />
                <Usuarios />
              </Route>
              <Route exact path="/Admin/Reportes/VentasDetalles" component={VentasDetalles}>
                <Admin />
                <VentasDetalles />
              </Route>
              <Route exact path="/Admin/Reportes/ClientesDetalles" component={ClientesDetalles}>
                <Admin />
                <ClientesDetalles />
              </Route>
              <Route exact path="/Admin/Reportes/DistribuidorDetalles" component={DistribuidorDetalles}>
                <Admin />
                <DistribuidorDetalles />
              </Route>
              <Route exact path="/User" component={User}>
                <User />
              </Route>
              <Route exact path="/Carrito" component={Carrito}>
                <User />
                <Carrito />
              </Route>
              <Route exact path="/ComprasDetalles" component={ComprasDetalles}>
                <User />
                <ComprasDetalles />
              </Route>
            </Switch>
        </BrowserRouter>
      </div>
    );
}

export default App;
