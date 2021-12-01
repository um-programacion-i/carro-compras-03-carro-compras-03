import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'


export const VentasDetalles = () => {

    const urlCDC = process.env.REACT_APP_CDC

    const [ventasDetalles, setventasDetalles] = useState([])
    
    const [inputValue, setInputValue] = useState([]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const getVentas = () => {
        axios.get(urlCDC+'/carro/ventas/')
        .then(res => {
            setventasDetalles(res.data)
        })
    }

    useEffect(()=>{getVentas()},[])


    const ventasFilter = () => {

    }

    return (
        <form onSubmit={ventasFilter}>
            Filter<input
                type='text'
                value={inputValue}
                onChange={handleInputChange}
            />
        </form>
    )
}

