import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Login} from './components/Login'
import {Admin} from './components/admin/Admin'
import {User} from './components/user/User'




function App() {


  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/Admin" component={Admin} />
          <Route path="/User" component={User} />
        </Switch>
    </Router>
  );
}

export default App;
