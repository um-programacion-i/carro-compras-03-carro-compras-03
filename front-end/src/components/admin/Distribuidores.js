import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import {useHistory} from "react-router-dom"


export const Distribuidores = () => {

    const cookies = new Cookies()

    const urlPROD = process.env.REACT_APP_PROD

    const history = useHistory()

    const [distribuidores, setDistribuidores] = useState({
        nombre : "",
        descripcion: "",
    })

    const [listaDist, setlistaDist] = useState([])

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

    const borrarDist = async(id) => {
        const borrar = window.confirm('Borrar?')
        if (borrar){
        await axios.delete(urlPROD+'/producto/tomar_uno_dist/'+id+'/')
        }
        await getDistribuidores()
    }

    const editarDist = async(id) => {
        await axios.get(urlPROD+'/producto/tomar_uno_dist/'+id+'/')
        .then(response => {
            setEditar(true)
            setId(response.data.id)
            console.log(response.data)
            setDistribuidores({
                nombre: response.data.nombre,
                descripcion: response.data.descripcion,
            })
        })
    }

    const getDistribuidores = async() => {
        await axios.get(urlPROD+'/producto/distribuidores/')
        .then(response => {
            setlistaDist(response.data.sort((a, b) => a.id - b.id))
        })
    }

    useEffect(() => {
        getDistribuidores()
    }, [])

    const botonCrear = async(e) => {
        e.preventDefault()

        console.log(distribuidores)

        if (!editar){
            await axios.post(urlPROD+'/producto/postDistribuidor/', 
                   {nombre: distribuidores.nombre, 
                   descripcion: distribuidores.descripcion,
                   },
            ).then(response => {
            console.log(response.data)
            })
        }else{
            await axios.put(urlPROD+'/producto/tomar_uno_dist/'+id+'/',
            {nombre: distribuidores.nombre, 
             descripcion: distribuidores.descripcion,
            })
            setEditar(false)
            setId("")
        }
        console.log(distribuidores)
        await getDistribuidores()
        setDistribuidores({nombre: "",
                           descripcion: "",
                    })
    }

    const cambiarEstado = async(id) => {
        await axios.put(urlPROD+'/producto/cambiarestadoDist/'+id+'/')
        await getDistribuidores()
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
                        onChange={e => setDistribuidores({...distribuidores, nombre: e.target.value})}
                        value={distribuidores.nombre}
                        autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <input
                        type="text"
                        placeholder="Descripcion"
                        className="form-control"
                        onChange={e => setDistribuidores({...distribuidores, descripcion: e.target.value})}
                        value={distribuidores.descripcion}
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
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaDist.map(dist => (
                                <tr key={dist.id}>
                                    <td>{dist.id}</td>
                                    <td>{dist.nombre}</td>
                                    <td>{dist.descripcion}</td>
                                    <td>{dist.disponible.toString()}</td>
                                    <td>
                                        <button
                                        className="btn btn-secondary btn-sm btn-block"
                                        onClick={e => editarDist(dist.id)}>
                                            Editar
                                        </button>
                                        <button 
                                        className="btn btn-danger btn-sm btn-block"
                                        onClick={e => borrarDist(dist.id)}
                                        >
                                            Eliminar
                                        </button>
                                        <button 
                                        className="btn btn-secondary btn-sm btn-block"
                                        onClick={e => cambiarEstado(dist.id)}
                                        >
                                            Habilitar/Deshabilitar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>
        </div>
        )
}