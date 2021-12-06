import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Collapse} from 'react-collapse';


export const ClientesDetalles = () => {

    const urlPROD = process.env.REACT_APP_PROD
    const urlCDC = process.env.REACT_APP_CDC
    const [usuarios, setUsuarios] = useState([])
    const [ventasDetalles, setVentasDetalles] = useState([])
    const [productosA, setProductos] = useState([])
    const [productosId, setProductosId] = useState([])
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

    const getUsuarios = () =>{
        axios.get(urlCDC+'/carro/users/')
        .then(res => {
            setUsuarios(res.data.sort((a, b) => a.id - b.id))
        })
    }

    useEffect(()=>{
        getUsuarios()
    },[])

    const getVentasById = async (id) => {
        setId('')
        await axios.get(urlCDC+'/carro/ventasByUsuario/' + id + '/')
        .then(res => {
            setVentasDetalles(res.data)
            setProductosId(res.data.map(id=>id.productosId))
            })
        .catch('Error')
        console.log(ventasDetalles)
        getProductosById()
        setId(id)
        console.log(productosId)
    }

    const formatList = (list) => {
        let text = ''
        for (let item of list) {
            text += item + ', '
        }
        text = text.slice(0, -2)
        return text
    }

    const getProductosById = () => {
        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        
        const productos = []
        productosId.map(id =>{
            for(let ids of id){
                console.log(ids)
            axios.get(urlPROD+'/producto/tomar_uno_prod/' + ids + '/')
            .then(res => {
                productos.push(res.data)
            })}})
        setProductos(productos)
        console.log(productosA, 'productos')
        setState(true)
        /*
        setProductos(productos)
        setId(listId)*/
        }
    
    const handleChange = () =>{
        setState(false)
    }

    const getVentasRango = async () => {
        const fechaInicial = (startDate.getFullYear() + '-' + (startDate.getMonth()+1) + '-' + startDate.getDate()).toString()
        const fechaFinal = (endDate.getFullYear() + '-' + (endDate.getMonth()+1) + '-' + endDate.getDate()).toString()
        if(fechaInicial>fechaFinal){
            alert('La fecha inicial no puede ser mayor a la final!')
        }else{
            await axios.get(urlCDC+'/carro/ventasRangoFecha/'+ fechaInicial + '/' + fechaFinal + '/')
            .then(res => {
                setVentasDetalles(res.data)
        })}
        if(!ventasDetalles){
            getUsuarios()
        }
    }

    const getVentasAño = async () => {
        await axios.get(urlCDC+'/carro/ventasAño/')
        .then(res => {
            setVentasDetalles(res.data)
        })
        if(!ventasDetalles){
            getUsuarios()
        }
    }

    const getVentasMesCorriente = async () => {
        await axios.get(urlCDC+'/carro/ventasMesCorriente/')
        .then(res => {
            setVentasDetalles(res.data)
        })
        if(!ventasDetalles){
            getUsuarios()
        }
    }

    const getventasUltimosTreintaDias = async () => {
        await axios.get(urlCDC+'/carro/ventasUltimosTreintaDias/')
        .then(res => {
            setVentasDetalles(res.data)
        })
        if(!ventasDetalles){
            getUsuarios()
        }
    }


    return (
        <>
        <h1>Ventas</h1>
        <div className="row">
            Fecha Inicial
        <DatePicker
        className="col-md-2"
        type="text"
        selected={startDate}
        onChange={data=>handleChangeStart(data)}
        value={startDate}
        dateFormat="yyyy/MM/dd"/>
        Fecha Final
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
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Clave</th>
                        <th>Tipo</th>
                        <th>Disponible</th>
                        <th>Detalles Ventas</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.apellido}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.clave}</td>
                            <td>{usuario.tipo.toString()}</td>
                            <td>{usuario.disponible.toString()}</td>
                            <td>
                                <div className="btn-group-vertical">
                                    <button className="btn btn-secondary col-md-4"
                                    onClick={e=>getVentasById(usuario.id)}>Expandir</button>
                                        { id === usuario.id &&
                                        <Collapse isOpened={state}>
                                    <ol>
                                        <p>  
                                        {ventasDetalles.map(ventas => (
                                            <li key={ventas.id}>
                                                Cantidad comprada: {formatList(ventas.cantidad)}
                                                <br />
                                                Fecha de compra: {ventas.fechaDeVenta}
                                                <br />
                                                Precio total: {ventas.precioTotal}
                                                <br />
                                            </li>
                                            
                                        ))}
                                        </p>
                                    </ol>
                                    <ul>
                                        Productos: 
                                        {productosA.map(prd=>(
                                            <li key={prd.id}>
                                                    Nombre: {prd.nombre}
                                                    <br />
                                                    Descripcion: {prd.descripcion}
                                                    <br />
                                                    Precio: {prd.precio}
                                                    <br />
                                            </li>
                                        ))}
                                    </ul>
                                         </Collapse>
                                        }
                                    <button className="btn btn-danger col-md-4"
                                    onClick={handleChange}>Colapsar</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
    )
}
