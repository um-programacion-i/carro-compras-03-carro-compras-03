import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Collapse} from 'react-collapse';


export const ComprasDetalles = () => {

    const urlPROD = process.env.REACT_APP_PROD
    const urlCDC = process.env.REACT_APP_CDC
    const [ventasDetalles, setVentasDetalles] = useState([])
    const [productosA, setProductos] = useState([])
    const [stateProductos, setStateProductos] = useState(true)
    const [id, setId] = useState("");
    const cookies = new Cookies()
    
    const getVentas = async () => {
        await axios.get(urlCDC+'/carro/ventasByUsuario/'+cookies.get('id')+'/')
        .then(res => {
            setVentasDetalles(res.data.sort((a, b) => a.id - b.id))
        })
        
    }

    useEffect(()=>{
        getVentas()
    },[])


    const formatList = (list) => {
        let text = ''
        for (let item of list) {
            if(item.toString().slice(-1) !== 0){
              text += item + ','
            }
        }
        console.log(text)
        text = text.slice(0, -1)
        return text
    }

    const getProductosById = (id) => {
        console.log('Id que llega ', id)
        let ids = formatList(id)
        console.log(ids, 'id de producto')
        axios.get(urlPROD+'/producto/getVariosProductos/' + ids + '/')
        .then(res => {
            setProductos(res.data)
        })
        setStateProductos(true)
        setId(id)
        console.log('productos', productosA)
    }
    
    const collapse = (prdId) => {
        if(id === prdId){
            setStateProductos(false)
        }
    }

    return (
        <>
        <br/>
        <h1>Tus compras</h1>
        <div className='row'>
            <div className="col-md-20">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Precio Total</th>
                            <th>Fecha</th>
                            <th>Productos comprados</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventasDetalles.map((venta) => (
                            <tr key={venta.id}>
                                <td>{venta.precioTotal}</td>
                                <td>{venta.fechaDeVenta}</td>
                                <td>
                                <div className="btn-group-vertical">
                                        <button className="btn btn-secondary col-md-3"
                                        type='reset'
                                        onClick={(e)=>getProductosById(venta.productosId)}
                                        value={productosA}>Expandir</button>
                                            {id === venta.productosId &&
                                            <Collapse isOpened={stateProductos}>
                                                <ol>
                                                    {productosA.map((producto, index)=>(
                                                        
                                                        <li key={producto.id}>
                                                            Nombre: {producto.nombre}
                                                            <br/>
                                                            Precio c/u: {producto.precio}
                                                            <br/>
                                                            Cantidad: {venta.cantidad[index]}
                                                        </li>
                                                    ))}
                                                </ol>
                                            </Collapse>
                                        }
                                        <button className="btn btn-danger col-md-3"
                                        onClick={e => collapse(venta.productosId)}>Colapsar</button>
                                    </div>
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