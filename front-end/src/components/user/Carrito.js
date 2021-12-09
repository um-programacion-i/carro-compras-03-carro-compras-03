import React from 'react'
import { useLocation } from 'react-router'

export const Carrito = () => {
    const location = useLocation()
    let datos = location.state //Se reciben los datos mandados desde user en su respectiva etiqueta link
    console.log('Dentro De Carrito ', location.message)
    console.log(datos)
    return (
        <h1>
            Test
        </h1>
    )
}

