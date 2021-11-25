import React from 'react'
import {Link} from 'react-router-dom'

export const Admin = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to='/Admin'>
                Admin Site
                </Link>
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
                    <Link className="nav-link active" aria-current="page" to="/Productos">
                        Productos
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/Distribuidores">
                        Distribuidores
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/Usuarios">
                        Usuarios
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/Reportes">
                        Reportes
                    </Link>
                    </li>
                </ul>
                </div>
            </div>
            </nav>

        )
}
