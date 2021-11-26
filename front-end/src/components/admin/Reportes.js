import React , {useEffect} from 'react'
import {useHistory} from "react-router-dom"
import Cookies from 'universal-cookie'


export const Reportes = () => {

    const cookies = new Cookies()

    const history = useHistory()

    const checkLogin = () => {

        // Este primer if chequea si el usuario logeado con exito es un admin o un user,
        // de ser este ultimo se lo redirige hacia su url correspondiente, si no se queda
        // en la que esta situado

        if(cookies.get('nombre')){
            if(cookies.get('tipo') === 'false'){
                history.push('/User');
            }
        }
        if(!cookies.get('nombre')){
            history.push('./');
            }
        }
    

    useEffect(() => {
        checkLogin()
    })

    return (
    <h1>Reportes</h1>
        )
}