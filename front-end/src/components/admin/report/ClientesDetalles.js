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
    const [ventasId, setVentasId] = useState([])
    const [stateProductos, setStateProductos] = useState(true)
    const [stateUsuarios, setStateUsuarios] = useState(false)
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
    
    const getUsuariosById = (id, ventaId) =>{
        console.log(id)
        setVentasId('')
        axios.get(urlCDC+'/carro/singleuser/'+id+'/')
        .then(res => {
            setUsuarios(res.data)
        })
        setVentasId(ventaId)
        setStateUsuarios(true)
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
    }

    const getVentasAño = async () => {
        await axios.get(urlCDC+'/carro/ventasAño/')
        .then(res => {
            setVentasDetalles(res.data)
        })
    }

    const getVentasMesCorriente = async () => {
        await axios.get(urlCDC+'/carro/ventasMesCorriente/')
        .then(res => {
            setVentasDetalles(res.data)
        })
    }

    const getventasUltimosTreintaDias = async () => {
        await axios.get(urlCDC+'/carro/ventasUltimosTreintaDias/')
        .then(res => {
            setVentasDetalles(res.data)
        })
    }
    
    const collapse = (prdId) => {
        if(id === prdId){
            setStateProductos(false)
        }
    }

    const collapseU = (id) => {
        if(ventasId === id){
            setStateUsuarios(false)
        }
    }

    return (
        <>
        <br/>
        <h1>Clientes</h1>
        <div className='row'>
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
            <div className="col-md-20">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Precio Total</th>
                            <th>Fecha</th>
                            <th>Productos comprados</th>
                            <th>Usuario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventasDetalles.map((venta) => (
                            <tr key={venta.id}>
                                <td>{venta.id}</td>
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
                                <td>
                                    <div className="btn-group-vertical">
                                        <button className="btn btn-secondary col-md-2"
                                        onClick={e=>getUsuariosById(venta.usuario_id, venta.id)} onPress>Expandir</button>
                                        { ventasId === venta.id &&
                                                <Collapse isOpened={stateUsuarios}>
                                                        <p>
                                                        Nombre: {usuarios.nombre}
                                                        <br/>
                                                        Apellido: {usuarios.apellido}
                                                        <br/>
                                                        Email: {usuarios.email}
                                                        </p>
                                                </Collapse>
                                        }
                                        <button className="btn btn-danger col-md-2"
                                        onClick={e => collapseU(venta.id)}>Colapsar</button>
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