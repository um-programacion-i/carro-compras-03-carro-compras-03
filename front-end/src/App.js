import React from "react";
import {BrowserRouter as Router, Switch, Route, useLocation, BrowserRouter} from 'react-router-dom'
import {Login} from './components/Login'
import {Admin} from './components/admin/Admin'
import {Productos} from './components/admin/Productos'
import {Usuarios} from './components/admin/Usuarios'
import {Reportes} from './components/admin/Reportes'
import {Distribuidores} from './components/admin/Distribuidores'
import {User} from './components/user/User'




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
              <Route path="/User" component={User} />
            </div>
          </Switch>
      </Router>
    </div>
  );


  // POSIBLE FIX A OCULTAR NAVBAR
  /*  return(

      <div className="App">
        <BrowserRouter>
          <div className="container">
            <Switch>
            <Route exact path="/" component={Login} />
              <Route exact path="/Admin" component={Admin}>
                <Admin />
              </Route>
              <Route exact path="/Distribuidores" component={Distribuidores}>
                <Admin />
                <Distribuidores />
              </Route>
              <Route exact path="/Productos" component={Productos}>
                <Admin/>
                <Productos/>
              </Route>
              <Route exact path="/Reportes" component={Reportes}>
                <Admin/>
                <Reportes/>
              </Route>
              <Route exact path="/Usuarios" component={Usuarios}>
                <Admin />
                <Usuarios />
              </Route>
              <Route exact path="/User" component={User}>
                <User />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </div>



    ); */





}

export default App;
