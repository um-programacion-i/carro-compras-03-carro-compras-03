import React, {useState, useEffect} from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { Redirect } from "react-router-dom";

export const Carrito = () => {
    const urlCDC = process.env.REACT_APP_CDC
    const urlPROD = process.env.REACT_APP_PROD
    const [listaProd, setlistaProd] = useState([])
    const [propiedadesProd, setPropiedadesProd] = useState('')
    const cookies = new Cookies()
    var today = new Date()
    const [hasAlreadyReload, setHasAlreadyReload] = useState(false);
    

    const getCarrito = async () => {
        await axios.get(urlCDC+'/carro/carritoByUser/'+ cookies.get('id') +'/')
        .then(res => {
            setlistaProd(res.data.sort((a, b) => a.id - b.id))
        })
        console.log(listaProd, 'vacio?')
    }

    useEffect(()=>{
        getCarrito()
    }, [])

    

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
    }

    const eliminarCarrito = async (id) => {
        const borrar = window.confirm('Borrar?')
        if (borrar){
        await axios.delete(urlCDC+'/carro/singlecarrito/'+id+'/')
        }
        await getCarrito()
    }

    window.onbeforeunload = function (evt) {
        var message = 'Are you sure you want to leave?';
        if (typeof evt == 'undefined') {
          evt = window.event;
        }
        if (evt) {
          evt.returnValue = message;
        }
        return message;
      }

    const comprar = async ()=>{
        const estadoCompra = window.confirm('Desea comprar estos productos?')
        if(estadoCompra){
            let cantidad = []
            let nombres = []
            let ids = []
            let precioFinal = 0
            listaProd.map(prd => {
                nombres.push(prd.productos)
                cantidad.push(parseInt(prd.cantidad_de_producto))
                precioFinal += prd.precioTotal
            })
            for(let nombre of nombres){
                console.log(nombre)
                await axios.get(urlPROD+'/producto/productoNombre/'+nombre+'/')
                .then(res =>{
                    ids.push(parseInt(res.data))
                })
            }
            console.log(cantidad)
            for(let valor of ids){
                console.log(valor, 'valores')
            }
            axios.post(urlCDC+'/carro/ventas/', 
            {
                usuario: parseInt(cookies.get('id')),
                productosId: ids,
                cantidad: cantidad,
                precioTotal: precioFinal,
                fechaDeVenta: `${today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()}`
            })
            .then(res => {
                console.log(res.data)
            })
            for(let id of ids){
                let cantidadades = cantidad.shift()
                axios.put(urlPROD+'/producto/putCantidad/'+id+'/'+cantidadades+'/')
            }
        }
    }

    return (
        <>
        {hasAlreadyReload && <Redirect from="/Carrito" to="/Carrito" />}
        <div className="col-md-8">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad seleccionada</th>
                        <th>Precio</th>
                        <th>Ver cambios</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                {listaProd.map(prod=>(
                    <tr key={prod.id} onClick={e => infoProd(prod.productos, prod.cantidad_de_producto, prod.precioTotal)}>
                        <td>{prod.productos}</td>
                        <td>
                        <input className='col-md-12 row-md-10' type="number" id="quantity" name="quantity" min="1" max="5" defaultValue={prod.cantidad_de_producto} onChange={e => changeCantidad(e, prod)} style={{height: "50px"}}></input>
                        </td>
                        <td>{prod.precioTotal}</td>
                        <td>
                            <button className='btn btn-secondary btn-md' onClick={() => window.location.reload(false)}>Ver</button>
                        </td>
                        <td>
                            <button className="btn btn-danger btn-md btn-block" onClick={e => eliminarCarrito(prod.id)}>
                                Eliminar
                            </button>
                        </td>
                    </tr> 
                    ))}
                    <th>
                        <td>
                            <button className='btn btn-lg btn-primary btn-block' style={{alignContent : 'center'}} type='button' onClick={e => comprar()} onAuxClick={e => window.location.reload(false)}>
                                Comprar
                            </button>
                        </td>
                    </th>
                
                </tbody>
            </table>
        </div>
        </>
    )
}

