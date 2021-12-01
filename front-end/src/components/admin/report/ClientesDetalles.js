import React, {useEffect} from 'react'
import Cookies from 'universal-cookie'
import {useHistory} from "react-router-dom"


export const ClientesDetalles = () => {

    const cookies = new Cookies()

    const history = useHistory()


    const checkLogin = () => {
        if(!cookies.get('nombre')){
            history.push('./');
            }
        }
    

    useEffect(() => {
        checkLogin()
    })

    return (
    <h1>Hello World</h1>
        )
}