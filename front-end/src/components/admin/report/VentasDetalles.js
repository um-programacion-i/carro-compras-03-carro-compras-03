import axios from 'axios'
import React, {useState, useEffect} from 'react'



export const VentasDetalles = () => {

    const [inputValue, setInputValue] = useState([]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const [isOpen, setIsOpen] = useState(false)
    const urlCDC = process.env.REACT_APP_CDC
    const [productosComprados, setProductosComprados] = useState({
        nombre : "",
        descripcion : "",
        precioVenta : "",
        precioTotal : "",
        cantidad : "",
        fechaDeVenta : "",
    })
    
    const [ventasDetalles, setVentasDetalles] = useState([])

    const getProductosComprados = () => {
        axios.get(urlCDC+'/carro/products/')
        .then(res => {
            setProductosComprados({
                nombre : res.data.nombre,
                descripcion : res.data.descripcion,
                precioVenta : res.data.precioVenta,
                cantidad : res.data.cantidad
            })
            setVentas(res.data.id)
        })
    }

    const setVentas = (idProd) => {
        axios.get(urlCDC+'/carro/getdetalleventa/'+idProd+'/')
        .then(res => {
            setProductosComprados({
                fechaDeVenta : res.data.fechaDeVenta,
                precioTotal : res.data.precioTotal
            })
        })
    }

    useEffect(() => {
        getProductosComprados()
    }, [])

    const carsModels = (e) => {
        e.preventDefault();
        const inputval = inputValue
        const listaventas = productosComprados
        setInputValue(() => {
            setVentasDetalles( listaventas.filter((marca) => {
                                    if (marca.includes(inputval)){
                                        return marca
                                    }
                                    return 0
                                }))})}

    return (
        <React.Fragment>
        <h1>
            Ventas Detalles
        </h1>
        <form onSubmit={carsModels}>
            Filter<input
                type='text'
                value={inputValue}
                onChange={handleInputChange}
            />
        </form>
        <div className="col-md-20">
            <table className="table table-striped" width="1200px">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Precio de Venta</th>
                        <th>Cantidad</th>
                        <th>Operaciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productosComprados().map(prodComp => (
                        <tr key={prodComp.id}>
                            <td>{prodComp.id}</td>
                            <td>{prodComp.nombre}</td>
                            <td>{prodComp.descripcion}</td>
                            <td>{prodComp.precioVenta}</td>
                            <td>{prodComp.cantidad}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
    </React.Fragment>
    )
    
}
