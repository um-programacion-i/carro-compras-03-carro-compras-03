import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import {useHistory} from "react-router-dom"


export const Productos = () => {

    const urlPROD = process.env.REACT_APP_PROD

    const history = useHistory()

    const cookies = new Cookies()

    const [productos, setProductos] = useState({
        nombre : "",
        descripcion: "",
        precio: "",
        cantidadVendida: ""
    })

    const [listaProd, setlistaProd] = useState([])

    const [editar, setEditar] = useState("")

    const [id, setId] = useState('')

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

    const borrarProd = async(id) => {
        const borrar = window.confirm('Borrar?')
        if (borrar){
        await axios.delete(urlPROD+'/producto/tomar_uno_prod/'+id+'/')
        }
        await getProductos()
    }

    const editarProd = async(id) => {
        await axios.get(urlPROD+'/producto/tomar_uno_prod/'+id+'/')
        .then(response => {
            setEditar(true)
            setId(response.data.id)
            setProductos({
                nombre: response.data.nombre,
                descripcion: response.data.descripcion,
                precio: response.data.precio,
                cantidadVendido: response.data.cantidadVendida
            })
        })
    }

    const getProductos = async() => {
        await axios.get(urlPROD+'/producto/productos/')
        .then(response => {
            setlistaProd(response.data.sort((a, b) => a.id - b.id))
        })
    }

    useEffect(() => {
        getProductos()
    }, [])

    const botonCrear = async(e) => {
        e.preventDefault()
        console.log(productos)
        if (!editar){
            await axios.post(urlPROD+'/producto/postProducto/', 
                   {nombre: productos.nombre, 
                   descripcion: productos.descripcion,
                   precio: productos.precio,
                   cantidadVendido: productos.cantidadVendida 
                   }
            ).then(response => {
            console.log(response.data)
            })
        }else{
            console.log('ACAAAAAAAAAAAAAAAAAAAA')
            await axios.put(urlPROD+'/producto/tomar_uno_prod/'+id+'/',
            {
                nombre: productos.nombre, 
                descripcion: productos.descripcion,
                precio: productos.precio,
                cantidadVendido: productos.cantidadVendida
            })
            setEditar(false)
            setId("")
        }
        console.log(productos)
        await getProductos()
        setProductos({cantidadVendida: 0,
                      nombre: "",
                      precio: 0,
                      descripcion: ""
                    })
    }

    const cambiarEstado = async(id) => {
        await axios.put(urlPROD+'/producto/cambiarestadoProd/'+id+'/')
        await getProductos()
    }

    return (
        <div className="row">
            <div className="col-md-3">
                <form className="card card-body" action='/producto/productos/'>
                    <div className="form-group">
                        <input
                        type="text"
                        placeholder="Nombre"
                        className="form-control"
                        onChange={e => setProductos({...productos, nombre: e.target.value})}
                        value={productos.nombre}
                        autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <input
                        type="text"
                        placeholder="Descripcion"
                        className="form-control"
                        onChange={e => setProductos({...productos, descripcion: e.target.value})}
                        value={productos.descripcion}
                        />
                    </div>
                    <div className="form-group">
                        <input
                        type="number"
                        placeholder="Precio"
                        className="form-control"
                        onChange={e => setProductos({...productos, precio: e.target.value})}
                        value={productos.precio}
                        />
                    </div>
                    <div className="form-group">
                        <input
                        type="number"
                        placeholder="Cantidad Vendida"
                        className="form-control"
                        onChange={e => setProductos({...productos, cantidadVendida: e.target.value})}
                        value={productos.cantidadVendida}
                        />
                    </div>
                    <button 
                    className="btn btn-primary btn-block"
                    type="submit"
                    onClick={botonCrear}>
                        Crear
                    </button>
                </form>
            </div>
            <div className="col-md-4">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Descripcion</th>
                                <th>Precio</th>
                                <th>ID Distribuidor</th>
                                <th>Cantidad Vendida</th>
                                <th>Estado</th>
                                <th>Operaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaProd.map(prod => (
                                <tr key={prod.id}>
                                    <td>{prod.id}</td>
                                    <td>{prod.nombre}</td>
                                    <td>{prod.descripcion}</td>
                                    <td>{prod.precio}</td>
                                    <td>{prod.idDistribuidor_id}</td>
                                    <td>{prod.cantidadVendido}</td>
                                    <td>{prod.disponible.toString()}</td>
                                    <td>
                                        <div className="btn-group-vertical">
                                        <button
                                        className="btn btn-secondary btn-sm btn-block"
                                        onClick={e => editarProd(prod.id)}>
                                            Editar
                                        </button>
                                        <button 
                                        className="btn btn-danger btn-sm btn-block"
                                        onClick={e => borrarProd(prod.id)}
                                        >
                                            Eliminar
                                        </button>
                                        <button 
                                        className="btn btn-warning btn-sm btn-block"
                                        onClick={e => cambiarEstado(prod.id)}
                                        >
                                            Habilitar/Deshabilitar
                                        </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>
        </div>
        )
}