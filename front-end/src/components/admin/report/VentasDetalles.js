import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



export const VentasDetalles = () => {

    const urlCDC = process.env.REACT_APP_CDC

    const [ventasDetalles, setventasDetalles] = useState([])
    
    const [inputValue, setInputValue] = useState([]);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleInputChange = (e) => {
        setInputValue(e.target.value);

    }

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
            setventasDetalles(res.data)
        })
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


    return (
        <>
        <h1>Ventas</h1>
        <DatePicker
        type="text"
        selected={startDate}
        onChange={data=>handleChangeStart(data)}
        value={startDate}
        dateFormat="yyyy/MM/dd"/>
        <DatePicker
        type="text"
        selected={endDate}
        onChange={data=>handleChangeEnd(data)}
        value={endDate}
        dateFormat="yyyy/MM/dd"/>
        <br/>
        <button onClick={getVentasRango}>Por rango de fechas</button>
        <br/>
        <button onClick={getventasUltimosTreintaDias}>Ultimos 30 dias</button>
        <br/>
        <button onClick={getVentasMesCorriente}>Mes corriente</button>
        <br/>
        <button onClick={getVentasAño}>Ventas del año</button>
        {<ul>
            {ventasDetalles.map((ventas) => {
                <li>{ventas.nombre}</li>
            })}
        </ul>}
    </>
    )
}

