import React, {useState} from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Login} from './components/Login'


function App() {

  const [user, setUser] = useState({nombre: '', email:''})
  const [error, setError] = useState('')

  const Pogin = details => {
    console.log(details);
  }

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
