import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import {Collapse} from 'react-collapse';


export const DistribuidorDetalles = () => {

    const urlPROD = process.env.REACT_APP_PROD
    const [distribuidorDetalles, setDistribuidorDetalles] = useState([])
    const [productosA, setProductos] = useState([])
    const [state, setState] = useState(false)
    const [id, setId] = useState("")

    
    const getDistribuidor = () => {
        axios.get(urlPROD+'/producto/distribuidores/')
        .then(res => {
            setDistribuidorDetalles(res.data.sort((a, b) => a.id - b.id))
        })
    }

    useEffect(()=>{
        getDistribuidor()
    },[])

    const getProductosById = async (id) => {
        console.log(id, 'id de distribuidor')
        setId('')
        await axios.get(urlPROD+'/producto/distribuidorById/' + id + '/')
        .then(res => {
            setProductos(res.data)
        })
        .catch('Error')
        setState(true)
        setId(id)
        console.log(productosA, 'B')
    }

    const collapse = (distId) => {
        if(id === distId){
            setState(false)
        }
    }

    return (
        <>
        <br/>
        <h1>Distribuidor Detalles</h1>
        
        <div className="col-md-15">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Disponible</th>
                        <th>Producto</th>
                    </tr>
                </thead>
                <tbody>
                    {distribuidorDetalles.map(dist => (
                        <tr key={dist.id}>
                            <td>{dist.id}</td>
                            <td>{dist.nombre}</td>
                            <td>{dist.descripcion}</td>
                            <td>{dist.disponible.toString()}</td>
                            <td>
                                <div className="btn-group-vertical">
                                    <button className="btn btn-secondary col-md-4"
                                    onClick={e=>getProductosById(dist.id)}>Expandir</button>
                                    <ol>
                                        { id === dist.id &&
                                        <Collapse isOpened={state}>
                                        <p>  
                                        {productosA.map(prd => (
                                            <li key={prd.id}>
                                                {prd.nombre}
                                            </li>
                                        ))}
                                        </p>
                                         </Collapse>
                                        }
                                    </ol>
                                    
                                    <button className="btn btn-danger col-md-4"
                                    onClick={e=>collapse(dist.id)}>Colapsar</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
    )
}
