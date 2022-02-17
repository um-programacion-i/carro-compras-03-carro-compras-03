import React, {useState, useEffect} from 'react'
import {useHistory} from "react-router-dom"
import axios from 'axios'
import Cookies from 'universal-cookie'

// import {Link} from 'react-router-dom'

export const Usuarios = () => {

    const cookies = new Cookies()

    const history = useHistory()

    const urlCDC = process.env.REACT_APP_CDC

    const [usuarios, setUsuarios] = useState({
        nombre : "",
        apellido: "",
        email : "",
        clave: "",
        tipo : ""
    })

    const [listaUser, setlistaUser] = useState([])

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

    const borrarUser = async(id) => {
        const borrar = window.confirm('Borrar?')
        if (borrar){
        await axios.delete(urlCDC+'/carro/singleuser/'+id+'/')
        }
        await getUsuarios()
    }

    const editarUser = async(id) => {
        await axios.get(urlCDC+'/carro/singleuser/'+id+'/')
        .then(response => {
            setEditar(true)
            setId(response.data.id)
            console.log(response.data)
            setUsuarios({
                nombre : response.data.nombre,
                apellido: response.data.apellido,
                email : response.data.email,
                clave: response.data.clave,
                tipo : response.data.tipo
            })
        })
    }

    const getUsuarios = async() => {
        await axios.get(urlCDC+'/carro/users/')
        .then(response => {
            setlistaUser(response.data.sort((a, b) => a.id - b.id))
        })
        console.log(listaUser)
    }

    useEffect(() => {
        getUsuarios()
    }, [])

    const botonCrear = async(e) => {
        e.preventDefault()

        if (usuarios.tipo !== "true" && usuarios.tipo !== "false") {
            alert('El tipo solo puede ser "true" o "false".')
        } else {

        if (!editar){
            await axios.post(urlCDC+'/carro/users/', 
                   {nombre : usuarios.nombre,
                    apellido: usuarios.apellido,
                    email : usuarios.email,
                    clave: usuarios.clave,
                    tipo : usuarios.tipo,
                   },
            ).then(response => {
            console.log(response.data)
            })
        }else{
            await axios.put(urlCDC+'/carro/singleuser/'+id+'/',
                            {nombre : usuarios.nombre,
                            apellido: usuarios.apellido,
                            email : usuarios.email,
                            clave: usuarios.clave,
                            tipo : usuarios.tipo,
                            }
                            )
            setEditar(false)
            setId("")
        }
        console.log(usuarios)
        await getUsuarios()
        setUsuarios({nombre : "",
                     apellido: "",
                     email : "",
                     clave: "",
                     tipo : "",
            })
    }
    } 

    const cambiarEstado = async(id) => {
        await axios.put(urlCDC+'/carro/cambiarEstadoUsuario/'+id+'/')
        await getUsuarios()
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
                        onChange={e => setUsuarios({...usuarios, nombre: e.target.value})}
                        value={usuarios.nombre}
                        autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <input
                        type="text"
                        placeholder="Apellido"
                        className="form-control"
                        onChange={e => setUsuarios({...usuarios, apellido: e.target.value})}
                        value={usuarios.apellido}
                        autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <input
                        type="text"
                        placeholder="Email"
                        className="form-control"
                        onChange={e => setUsuarios({...usuarios, email: e.target.value})}
                        value={usuarios.email}
                        autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <input
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        onChange={e => setUsuarios({...usuarios, clave: e.target.value})}
                        value={usuarios.clave}
                        autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <input
                        type="text"
                        placeholder="Tipo"
                        className="form-control"
                        onChange={e => setUsuarios({...usuarios, tipo: e.target.value})}
                        value={usuarios.tipo}
                        autoFocus
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
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Clave</th>
                                <th>Tipo</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaUser.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.nombre}</td>
                                    <td>{user.apellido}</td>
                                    <td>{user.email}</td>
                                    <td>{user.clave}</td>
                                    <td>{user.tipo.toString()}</td>
                                    <td>{user.disponible.toString()}</td>
                                    <td>
                                        <div className="btn-group-vertical">
                                        <button
                                        className="btn btn-secondary btn-sm btn-block"
                                        onClick={e => editarUser(user.id)}>
                                            Editar
                                        </button>
                                        <button 
                                        className="btn btn-danger btn-sm btn-block"
                                        onClick={e => borrarUser(user.id)}
                                        >
                                            Eliminar
                                        </button>
                                        <button 
                                        className="btn btn-warning btn-sm btn-block"
                                        onClick={e => cambiarEstado(user.id)}
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