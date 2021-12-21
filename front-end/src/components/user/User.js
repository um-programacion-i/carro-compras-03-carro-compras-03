import React, {useState, useEffect} from 'react'
import Cookies from 'universal-cookie'
import {Link, useHistory} from "react-router-dom"
import axios from 'axios'
import { useLocation } from 'react-router'


export const User = () => {

    const urlPROD = process.env.REACT_APP_PROD
    const urlCDC  = process.env.REACT_APP_CDC
    const cookies = new Cookies()
    const history = useHistory()
    const [productosListar, setProductosListar] = useState([])
    const [inputValue, setInputValue] = useState([])
    var values = []


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
          setProductosListar(res.data)
        })
    }

    useEffect(() => {
        getProductos()
    }, [])

    const filterProductos = (e) => {
        e.preventDefault();
        const inputval = inputValue
        const inputval2 = inputValue.charAt(0).toUpperCase() + inputValue.slice(1)
        let nombre = productosListar.filter((marca) =>{
            if(marca.nombre.includes(inputval) || marca.nombre.includes(inputval2)){
                return marca
            }
        })
        setProductosListar(nombre)
        setInputValue('')
        }
    
    const sumarValor = (idItem, e) => {
      let valorCant = e.target.value

      // Si values esta vacio,crea e ingresa el primer json
      if (values <= []) {
        let data = {
          'id' : idItem,
          'value': valorCant
        }
        values.push(data)
      }

      //bucle for revisa si existe un json con el id == idItem
      for (let json of values) {
        if (json.id === idItem){
          // Si la cantidad elegida es 0, borra el json de la lista para evitar datos basura
          if (valorCant === "0") {
            values.splice(values.indexOf(json), 1)
            var flag = true
            break
          } else {
            json.value = valorCant //si existe, actualiza la cantidad
            var flag = true //flag sirve para indicar que si existe ese indice en values
            break
          }
          
        } else {
          var flag = false //si no existe ese id en values, flag indica que no
        }
      }

      //si flag a indicado que no existe ese id, se crea un json con los datos y se agrega a values
      if (!flag) { 
        let data = {
          'id' : idItem,
          'value': valorCant
        }
        values.push(data)
      }
    }

    const formatList = (list) => {
      let text = ''
      for (let item of list) {
          if(item.slice(-1) !== 0){
            text += item + ','
          }
      }
      console.log(text)
      text = text.slice(0, -1)
      return text
    }
    
    const refresh = () => {
      window.location.reload()
    }

    const postProductoOnCarro = async () => {
      let productoTemporal = []
      let cantidades = []
      let ids = []
      values.map(loc => {
          ids.push(loc.id.toString())
          cantidades.push(loc.value)
      })
      ids = formatList(ids)
      await axios.get(urlPROD+'/producto/getVariosProductos/'+ids+'/')
      .then(res => {
        productoTemporal = res.data
      })
      for (let producto of productoTemporal) {
        let cantidad = cantidades.shift()
        let data = {
          usuario: parseInt(cookies.get('id')),
          productos: producto.nombre,
          cantidad_de_producto: cantidad,
          precioTotal: parseFloat(producto.precio) * parseInt(cantidad)
        }
        await axios.post(urlCDC+'/carro/carrito/', data)
      }
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
            <ul class="navbar-nav me-auto">
            <li class="nav-item">
                <Link class="nav-link active" to="/User" onClick={e => getProductos()} >Home
                  <span class="visually-hidden">(current)</span>
                </Link>
              </li>
              {window.location.href === 'http://localhost:3000/User' &&
              <li class="nav-item">
                <Link class="nav-link active"
                to = {{
                  pathname: "/Carrito",
                  state: values
                }}
                onClick={postProductoOnCarro}
                onAuxClick={e => refresh()}
                >COMPRAR
                <span class="visually-hidden">(current)</span>
                </Link>
              </li>
              }
              {window.location.href === 'http://localhost:3000/User' && /*Tuve que volver a poner este href porque si lo coloco en el de arriba, 
                                                                         el boton aparece debajo del boton comprar */
              <li class="nav-item">
              <Link class="nav-link active" to="/ComprasDetalles" onClick={e => getProductos()} >
                TUS COMPRAS 
                <span class="visually-hidden">(current)</span>
              </Link>
              </li>
              }
            </ul>
            <form className="d-flex">
              <input className="form-control me-sm-2" type="text" placeholder="Buscar productos" value={inputValue} onChange={handleInputChange}/>
              <button className="btn btn-secondary my-2 my-sm-0" type="submit" onClick={e => filterProductos(e)}>Search</button>
            </form>
          </div>
        </div>
      </nav>
      { window.location.href === 'http://localhost:3000/User' &&
      <div className="col-md-12">
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad a agregar</th>
                </tr>
            </thead>
            <tbody>
                {productosListar.map((prod, index) => (
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
                            <option>0</option>
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
    }
</React.Fragment>
        )
}