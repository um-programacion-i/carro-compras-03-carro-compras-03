import React, {useState, useEffect} from 'react'
import Cookies from 'universal-cookie'
import {Link, useHistory} from "react-router-dom"
import axios from 'axios'


export const User = () => {

    const urlPROD = process.env.REACT_APP_PROD
    const cookies = new Cookies()
    const history = useHistory()
    const [productos, setProductos] = useState([])
    const [inputValue, setInputValue] = useState([])
    const [value, setValue] = useState({})

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
      
    const sumarValor = (id) => {
      if (!(id in value)) {
        let newId = id
        let newValue = 1
        value[newId] = newValue
      } else {
        let newValue = value[id]
        value[id] = newValue + 1
      }
      document.getElementById("readOnlyInput").placeholder = value[id]
      console.log(value)
    }

    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <h1 className="navbar-brand" >Marketplace</h1>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <form className="d-flex">
              <input className="form-control me-sm-2" type="text" placeholder="Buscar productos" value={inputValue} onChange={handleInputChange}/>
              <button className="btn btn-secondary my-2 my-sm-0" type="submit" onClick={e => filterProductos(e)}>Search</button>
            </form>
          </div>
        </div>
      </nav>
      <div className="col-md-8">
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Agregar al carrito</th>
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
                          <div style={{ display: "flex", textAlign: "center"}}>
                            <button type="button" className="btn btn-dark btn-sm" style={{ marginLeft: "auto" }}
                            value={value}
                            onClick={e => sumarValor(prod.id)}>
                              +
                            </button>

                            <form className="form-group col-md-3" style={{ marginRight: "auto" }}>
                              <fieldset>
                                <input className="form-control"
                                id="readOnlyInput" 
                                type="text" 
                                placeholder={0}
                                readOnly />
                              </fieldset>
                            </form>
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