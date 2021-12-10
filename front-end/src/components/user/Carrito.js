import React, {useState, useEffect} from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'

export const Carrito = () => {
    const urlCDC = process.env.REACT_APP_CDC
    const [listaProd, setlistaProd] = useState([])
    const [propiedadesProd, setPropiedadesProd] = useState('')
    const cookies = new Cookies()
    const history = useHistory()



    const getCarrito = () => {
        axios.get(urlCDC+'/carro/carritoByUser/'+ cookies.get('id') +'/')
        .then(res => {
            setlistaProd(res.data.sort((a, b) => a.id - b.id))
        })
    }

    useEffect(()=>{
        getCarrito()
    }, [])

    


    const volver = () => {
        history.push('/User')
    }

    const infoProd = (nombre, cantidad, precio) => {
        setPropiedadesProd([nombre, cantidad, precio])
        console.log(propiedadesProd)
    }

    const changeCantidad = (e, prod) => {
        let data = {
            usuario: prod.usuario,
            productos: prod.productos,
            cantidad_de_producto: e.target.value,
            precioTotal: (parseFloat(prod.precioTotal) / parseInt(prod.cantidad_de_producto) ) * e.target.value
          }
        axios.put(urlCDC + '/carro/singlecarrito/'+ prod.id + '/', data)
        window.location.reload(false);


    }



    return (
        <>
        <div className='row'>
        <div className="col-md-3">
                <form className="card card-body" action='/producto/productos/'>
                    <div className="form-group">
                    <fieldset>
                        <input
                            className="form-control"
                            id="readOnlyInput"
                            type="text"
                            placeholder={propiedadesProd[0]}
                            readOnly
                        />
                        </fieldset>
                    </div>
                    <div className="form-group">
                    <form >
                        <input className='col-md-12 row-md-10' type="number" id="quantity" name="quantity" min="1" max="5" defaultValue={propiedadesProd[1]} style={{height: "50px"}}></input>
                    </form>
                    </div>
                    <div className="form-group">
                    <fieldset>
                        <input
                            className="form-control"
                            id="readOnlyInput"
                            type="text"
                            placeholder={propiedadesProd[2]}
                            readOnly
                        />
                        </fieldset>
                    </div>
                    <button 
                    className="btn btn-primary btn-block"
                    type="submit">
                        Modificar
                    </button>
                </form>
            </div>
        <div className="col-md-8">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad seleccionada</th>
                        <th>Precio</th>

                    </tr>
                </thead>
                <tbody>
                {listaProd.map(prod=>(
                    <tr key={prod.id} onClick={e => infoProd(prod.productos, prod.cantidad_de_producto, prod.precioTotal)}>
                        <td>{prod.productos}</td>
                        <td>
                        <input className='col-md-12 row-md-10' type="number" id="quantity" name="quantity" min="1" max="5" defaultValue={prod.cantidad_de_producto} onChange={e => changeCantidad(e, prod)} style={{height: "50px"}}></input>
                        </td>
                        <td >{prod.precioTotal}</td>
                        <td>
                            <button className="btn btn-danger btn-md btn-block">
                                Eliminar
                            </button>
                        </td>
                        
                    </tr> 
                    ))}
                
                </tbody>
            </table>
        </div>
        </div>
        </>
    )
}

