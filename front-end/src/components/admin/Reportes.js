import React , {useEffect} from 'react'
import {Link, useHistory} from "react-router-dom"
import Cookies from 'universal-cookie'
import 'bootswatch/dist/lux/bootstrap.min.css'  


export const Reportes = () => {

    const cookies = new Cookies()

    const history = useHistory()

    const checkLogin = () => {

        // Este primer if chequea si el usuario logeado con exito es un admin o un user,
        // de ser este ultimo se lo redirige hacia su url correspondiente, si no se queda
        // en la que esta situado

        if(cookies.get('nombre')){
            if(cookies.get('tipo') === 'false'){
                history.push('/User');
            }
        }
        if(!cookies.get('nombre')){
            history.push('./');
            }
        }
    
    useEffect(() => {
        checkLogin()
    })


    return (
    <React.Fragment>
    <h1>Reportes</h1>
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '50vh'}}>
    <Link to='/Admin/Reportes/VentasDetalles'>
    <button className="btn btn-primary me-md-10"
    type="button">
        Ventas
    </button>
    </Link>
    <Link to='/Admin/Reportes/ClientesDetalles'>
    <button className="btn btn-primary"
    type="button">
        Clientes
    </button>
    </Link>
    <Link to='/Admin/Reportes/DistribuidorDetalles'>
    <button className="btn btn-primary"
    type="button">
        Distribuidor
    </button>
    </Link>
    </div>
    </React.Fragment>
        )
}