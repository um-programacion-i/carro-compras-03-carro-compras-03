import React from "react";
import {BrowserRouter as Router, Switch, Route, useLocation} from 'react-router-dom'
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
}

export default App;
