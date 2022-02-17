import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {UnmountClosed, Collapse} from 'react-collapse';


export const VentasDetalles = () => {

    const urlCDC = process.env.REACT_APP_CDC
    const urlPROD = process.env.REACT_APP_PROD

    const [ventasDetalles, setventasDetalles] = useState([])
    const [productosA, setProductos] = useState([])
    const [state, setState] = useState(false)
    
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [id, setId] = useState("");


    const handleChangeStart = (date) => {
        setStartDate(date)
        console.log(startDate.getDate(), 'dia')
    }

    const handleChangeEnd = (date) => {
        setEndDate(date)
        console.log(endDate.getFullYear(), 'dia fin')
    }

    const getVentas = async () => {
        await axios.get(urlCDC+'/carro/ventas/')
        .then(res => {
            setventasDetalles(res.data.sort((a, b) => a.id - b.id))
        })
        console.log(ventasDetalles, 'estas son las ventas')
    }

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

    useEffect(()=>{
        getVentas()
    },[])

    const getVentasRango = async () => {
        const fechaInicial = (startDate.getFullYear() + '-' + (startDate.getMonth()+1) + '-' + startDate.getDate()).toString()
        const fechaFinal = (endDate.getFullYear() + '-' + (endDate.getMonth()+1) + '-' + endDate.getDate()).toString()
        if(fechaInicial>fechaFinal){
            alert('La fecha inicial no puede ser mayor a la final!')
        }else{
            await axios.get(urlCDC+'/carro/ventasRangoFecha/'+ fechaInicial + '/' + fechaFinal + '/')
            .then(res => {
                setventasDetalles(res.data)
        })}
    }

    const getVentasAño = async () => {
        await axios.get(urlCDC+'/carro/ventasAño/')
        .then(res => {
            setventasDetalles(res.data)
        })
    }

    const getVentasMesCorriente = async () => {
        await axios.get(urlCDC+'/carro/ventasMesCorriente/')
        .then(res => {
            setventasDetalles(res.data)
        })
    }

    const getventasUltimosTreintaDias = async () => {
        await axios.get(urlCDC+'/carro/ventasUltimosTreintaDias/')
        .then(res => {
            setventasDetalles(res.data)
        })
    }

    const getProductosById = async (listId) => {
        let productos = []
        setId('')
        for (let id of listId){
            await axios.get(urlPROD+'/producto/tomar_uno_prod/' + id + '/')
            .then(res => {
                productos.push(res.data)
            })
        }
        setState(true)
        setProductos(productos)
        setId(listId)
    }


    return (
        <>
        
        <br/>
        <h1>Ventas</h1>
        <div className="card border-primary mb-20" style={{ alignSelf: "center" }}>
            <div className="card-header">Filtro</div>
                <div className="card-body col-md-40">
                    <p>
                    <div className="form-group row">
                        Fecha Inicial
                        <DatePicker
                        className="col-md-5"
                        type="text"
                        selected={startDate}
                        onChange={data=>handleChangeStart(data)}
                        value={startDate}
                        dateFormat="yyyy/MM/dd"/>
                    </div>
                    <div className="form-group row">
                        Fecha Final
                        <DatePicker
                        className="col-md-5"
                        type="text"
                        selected={endDate}
                        onChange={data=>handleChangeEnd(data)}
                        value={endDate}
                        dateFormat="yyyy/MM/dd"/>
                    </div>
                        <div className="btn-group-vertical col-md-5">
                        <br/>

                            <button type="button" class="btn btn-outline-primary" onClick={getVentasRango}>Rango de fechas</button>
                            <button type="button" class="btn btn-primary" onClick={getventasUltimosTreintaDias}>Ultimos 30 dias</button>
                            <button type="button" class="btn btn-primary" onClick={getVentasMesCorriente}>Mes corriente</button>
                            <button type="button" class="btn btn-primary" onClick={getVentasAño}>Ventas del año</button>
                        </div>
                </p>
            </div>
            </div>
        <div className="col-md-15">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ID Usuario</th>
                        <th>Productos</th>
                        <th>Precio Total</th>
                        <th>Fecha Venta</th>
                    </tr>
                </thead>
                <tbody>
                    {ventasDetalles.map((venta) => (
                        <tr key={venta.id}>
                            <td>{venta.id}</td>
                            <td>{venta.usuario_id}</td>
                            <td>
                                <div className="btn-group-vertical">
                                    <button className="btn btn-secondary col-md-4"
                                    onClick={e=>getProductosById(venta.productosId)}>Expandir</button>
                                    <ol>
                                        {id === venta.productosId &&
                                        <Collapse isOpened={state}>
                                        <p>  
                                        {productosA.map((prd, index) => (
                                            <li key={prd.id}>
                                                Nombre : {prd.nombre}
                                                <br />
                                                Precio c/u: {prd.precio}
                                                <br/>
                                                Cantidad: {venta.cantidad[index]}
                                            </li>
                                        ))}
                                        </p>
                                         </Collapse>
                                        }
                                    </ol>
                                    <button className="btn btn-danger col-md-4"
                                    onClick={e=>setState(false)}>Colapsar</button>
                                </div>
                            </td>
                            <td>{venta.precioTotal}</td>
                            <td>{venta.fechaDeVenta}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
    )
}
