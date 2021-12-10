import React, {useState, useEffect} from 'react'
import Cookies from 'universal-cookie'
import { useLocation } from 'react-router'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'

export const Carrito = () => {
    const location = useLocation()
    const urlCDC = process.env.REACT_APP_CDC
    const urlPROD = process.env.REACT_APP_PROD
    const [listaProd, setlistaProd] = useState([])
    const [cantidad, setCantidad] = useState(0)
    const cookies = new Cookies()
    const history = useHistory()



    

    const getProductosAndPost = () => {
    }

    useEffect(()=>{
        getProductosAndPost()
    }, [])


    const volver = () => {
        history.push('/User')
    }


    return (
        <>
        <div className="col-md-8">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad seleccionada</th>
                        <th>Volver</th>
                    </tr>
                </thead>
                <tbody>
                {listaProd.map(prod=>(
                    <tr key={prod.id}>
                        <td>{prod.nombre}</td>
                        <td>{prod.precio}</td>
                        <td>{cantidad}</td>
                        <td>
                            <Link to={{
                                pathname: '/User',
                                state: location.state
                            }}>
                            <button>
                            </button>
                            </Link>
                        </td>
                    </tr>    
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}

