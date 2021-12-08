import React, {useState, useEffect} from 'react'
import Cookies from 'universal-cookie'
import {Link, useHistory} from "react-router-dom"
import axios from 'axios'

export const Home = () => {
    const urlPROD = process.env.REACT_APP_PROD
    const cookies = new Cookies()
    const history = useHistory()
    const [productos, setProductos] = useState([])
    const [inputValue, setInputValue] = useState([])
    const value = {}
    const [valor, setValor] = useState("")

    const [id, setId] = useState('')

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        console.log(inputValue)
    }

    const checkLogin = () => {
        if(!cookies.get('nombre')){
            history.push('./');
            }
        }
    
    useEffect(() => {
        checkLogin()
    })

    const getProductos = async () => {
      await axios.get(urlPROD+'/producto/getDisponibles/')
        .then(res =>{
          setProductos(res.data)
        })
    }

    useEffect(() => {
        getProductos()
    }, [])

    const filterProductos = (e) => {
        e.preventDefault();
        const inputval = inputValue
        const inputval2 = inputValue.charAt(0).toUpperCase() + inputValue.slice(1)
        let nombre = productos.filter((marca) =>{
            if(marca.nombre.includes(inputval) || marca.nombre.includes(inputval2)){
                return marca
            }
        })
        setProductos(nombre)
        setInputValue('')
        }
      
    const sumarValor = (id, e) => {
      let valor = e.target.value
      if (!(id in value)) {
        value[id] = valor
      } else {
        value[id] = valor
      }
      // document.getElementById("readOnlyInput").placeholder = value[id]
      // setValor(value[id])
      // setId(id)
      console.log(value)
    }
    return (
        <React.Fragment>
            <div className="col-md-8">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad a agregar</th>
                        </tr>
                    </thead>
                    <tbody>
                    {productos.map((prod, index) => (
                        <tr key={prod.id}>
                            <td><h3>{prod.nombre}</h3>
                            <small className="text-muted">{prod.descripcion}</small>
                            </td>
                            <td>{prod.precio}</td>
                            <td>
                            <div className="form-group" style={{display: "flex"}}>
                            <label htmlFor="Select" className="form-label mt-4">
                            </label>
                            <select className="form-select"
                            id="Select"
                            style = {{alignSelf: "top"}}
                            onChange={e => sumarValor(prod.id, e)}
                            >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                            </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </React.Fragment>
    )
}

