import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from "react-router-dom"
import Cookies from 'universal-cookie'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProductosVentas from './popup/ProductosVentas'


export const VentasDetalles = () => {

    const urlCDC = process.env.REACT_APP_CDC
    const urlPROD = process.env.REACT_APP_PROD

    const [ventasDetalles, setventasDetalles] = useState([])
    
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


    const handleChangeStart = (date) => {
        setStartDate(date)
        console.log(startDate.getDate(), 'dia')
    }

    const handleChangeEnd = (date) => {
        setEndDate(date)
        console.log(endDate.getFullYear(), 'dia fin')
    }

    const getVentas = () => {
        axios.get(urlCDC+'/carro/ventas/')
        .then(res => {
            setventasDetalles(res.data.sort((a, b) => a.id - b.id))
        })
        
    }

    const formatList = (list) => {
        let text = ''
        for (let item of list) {
            text += item + ', '
        }
        text = text.slice(0, -2)
        console.log(text)
        return text
    }

    useEffect(()=>{
        getVentas()
    },[])

    const getVentasRango = async () => {
        const fechaInicial = (startDate.getFullYear() + '-' + (startDate.getMonth()+1) + '-' + startDate.getDate()).toString()
        const fechaFinal = (endDate.getFullYear() + '-' + (endDate.getMonth()+1) + '-' + endDate.getDate()).toString()
        await axios.get(urlCDC+'/carro/ventasRangoFecha/'+ fechaInicial + '/' + fechaFinal + '/')
        .then(res => {
            console.log(res.data)
            setventasDetalles(res.data)
        })
    }

    const getVentasAño = async () => {
        await axios.get(urlCDC+'/carro/ventasAño/')
        .then(res => {
            console.log(res.data)
            setventasDetalles(res.data)
        })
    }

    const getVentasMesCorriente = async () => {
        await axios.get(urlCDC+'/carro/ventasMesCorriente/')
        .then(res => {
            console.log(res.data)
            setventasDetalles(res.data)
        })
    }

    const getventasUltimosTreintaDias = async () => {
        await axios.get(urlCDC+'/carro/ventasUltimosTreintaDias/')
        .then(res => {
            console.log(res.data)
            setventasDetalles(res.data)
        })
    }

    const getProdcutosById = async (listId) => {
        let productos = []
        //console.log(listId)
        for (let id of listId) {
            axios.get(urlPROD+'/producto/tomar_uno_prod/' + id + '/')
            .then(res => {
                productos.push(res.data)
            })
        }
        console.log(productos)
        alert(productos)
    }


    return (
        <>
        <h1>Ventas</h1>
        <div className="row">
        <DatePicker
        className="col-md-2"
        type="text"
        selected={startDate}
        onChange={data=>handleChangeStart(data)}
        value={startDate}
        dateFormat="yyyy/MM/dd"/>
        <DatePicker
        className="col-md-2"
        type="text"
        selected={endDate}
        onChange={data=>handleChangeEnd(data)}
        value={endDate}
        dateFormat="yyyy/MM/dd"/>

        <br/>
        <button type="button" class="btn btn-outline-info col-md-2" onClick={getVentasRango}>Rango de fechas</button>
        <br/>
        <button type="button" class="btn btn-outline-info col-md-2" onClick={getventasUltimosTreintaDias}>Ultimos 30 dias</button>
        <br/>
        <button type="button" class="btn btn-outline-info col-md-2" onClick={getVentasMesCorriente}>Mes corriente</button>
        <br/>
        <button type="button" class="btn btn-outline-info col-md-2" onClick={getVentasAño}>Ventas del año</button>
        </div>
        <div className="col-md-15">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>ID Usuario</th>
                                <th>ID Productos</th>
                                <th>Cantidades</th>
                                <th>Precio Total</th>
                                <th>Fecha Venta</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ventasDetalles.map(venta => (
                                <tr key={venta.id}>
                                    <td>{venta.id}</td>
                                    <td>{venta.usuario_id}</td>
                                    <td>
                                        <button onClick={e => window.open('https://javascript.info','popUpWindow','height=600,width=800,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes')}>
                                            Productos
                               
                                        
                                        </button>
                                    </td>
                                    <td>{formatList(venta.cantidad)}</td>
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

