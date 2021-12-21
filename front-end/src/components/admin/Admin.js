import React, {useEffect, useState} from 'react'
import {useHistory} from "react-router-dom"
import {Link} from 'react-router-dom'
import Cookies from 'universal-cookie'

export const Admin = () => {

    const cookies = new Cookies()

    const history = useHistory()

    let divReportes = React.createRef()

    const [state, setstate] = useState(false)

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
    
    const cambiarEstado = () => {
        if(state === false) setstate(true)
        else setstate(false)
    }

    useEffect(() => {
        checkLogin()
    })

    return (
        
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <h1 className="navbar-brand">
                Admin Site
                </h1>
                <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
                >
                <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/Admin/Productos">
                        Productos
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/Admin/Distribuidores">
                        Distribuidores
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/Admin/Usuarios">
                        Usuarios
                    </Link>
                    </li>
                    
                    <li className="nav-item dropdown" onClick={e => cambiarEstado()}>
                        <Link
                            className="nav-link dropdown-toggle show"
                            data-bs-toggle="dropdown"
                            role="button"
                        >
                            Reportes
                        </Link>
                    { !state &&
                        <div className="dropdown-menu show" data-bs-popper="none">
                            <Link className="dropdown-item" to = '/Admin/Reportes/VentasDetalles'>
                            Ventas
                            </Link>
                            <Link className="dropdown-item" to = '/Admin/Reportes/DistribuidorDetalles'>
                            Detalles de distribuidor
                            </Link>
                            <Link className="dropdown-item" to = '/Admin/Reportes/ClientesDetalles'>
                            Detalles de las compras de Clientes
                            </Link>
                        </div>
                    }
                    </li>
                </ul>
                </div>
            </div>
            </nav>

        )
}
