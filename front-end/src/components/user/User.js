import React, {useState, useEffect} from 'react'
import Cookies from 'universal-cookie'
import {Link, useHistory} from "react-router-dom"
import axios from 'axios'
import { useLocation } from 'react-router'


export const User = () => {

    const urlPROD = process.env.REACT_APP_PROD
    const urlCDC  = process.env.REACT_APP_CDC
    const location = useLocation()
    var values2 = location.state
    const cookies = new Cookies()
    const history = useHistory()
    const [productosListar, setProductosListar] = useState([])
    const [inputValue, setInputValue] = useState([])
    var values = []
    const [carrito, setCarrito] = useState({
      productos: "",
      cantidad_de_producto: "",
      precioTotal: ""
    })
    // enviar este hook a carrito para hacer un post en la view de carrito y luego
    // hacer un post en productos para indicar la cantidad vendida. Ya que inicialmente esta 
    // es cero ya que recien se encuentra en la fase de compra
    const [productoTemporal, setProductoTemporal] = useState([])
    const [cantidad, setCantidad] = useState(0)

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
      console.log('este es el estado', values2)
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
      let comprobacion = ((values2 === undefined) === false)
      console.log(comprobacion)
      if((comprobacion)===true){
        if(values2.length !== 0){
           values = values2
          }
      }
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
      console.log('este es el values ',values)
    }

  

    const formatList = (list) => {
      let text = ''
      for (let item of list) {
          text += item + ', '
      }
      text = text.slice(0, -2)
      return text
  }
    
    const postProductoOnCarro = async () => {
      let ids = ''
      values.map(loc => {
          ids += loc.id.toString()
          console.log(ids)
      })
      ids = formatList(ids)
      await axios.get(urlPROD+'/producto/getVariosProductos/'+ids+'/')
      .then(res => {
        setProductoTemporal(res.data)
      })
      console.log(productoTemporal, 'producto temporal')
      productoTemporal.map(prd => {
        values.map(val => {
        setCarrito({
          productos : prd.nombre,
          precioTotal : val.value * prd.precio,
  
        })
      })})

      let precio_total = 0

      console.log(carrito, 'qworjqwkrjkqwljrklqwjr')
      
    //   
    //   console.log(precio, 'precio')
    //   setCarrito({precioTotal: precio_total})
    //   console.log('carrito', carrito, 'sklgk')
    //   values.map(val => {
    //     axios.post(urlCDC+'/carro/carrito/',
    //     {
    //       usuario_id: parseInt(cookies.get('id')),
    //       productos: carrito.productos,
    //       cantidad_de_producto: val.value,
    //       precioTotal: carrito.precioTotal
    //     })
    //     .then(res => {
    //       console.log(res.data, 'datos')
    //     })
    // })
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
                <Link class="nav-link active" to="/User">Home
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
                >COMPRAR
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