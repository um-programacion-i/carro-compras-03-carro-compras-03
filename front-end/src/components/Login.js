import React, {useState} from "react";
import {useHistory} from "react-router-dom"
import "../cssStyles/Login.css"
import axios from 'axios'




export const Login = () => {
    const urlCDC = process.env.REACT_APP_CDC

    const history = useHistory()

    const [user, setUser] = useState(
        {
          nombre: "",
          clave: "",
        }
      )
    
    const clickHandler = () => {
        history.push('/Admin');
    }
    
    const log = async (e) => {
        console.log('nombre',user.nombre)
        console.log('clave',user.clave)
        await axios.post(urlCDC+'/carro/log/', {params: {nombre: user.nombre, clave: user.clave}})
        .then(response => {
            if(response.data.tipo === true){
                console.log(response.data)
                history.push('/Admin');
                // clickHandler(true)
                console.log('asfasfasfasfsaf')
            }
            else if (response.data.tipo === false){
                console.log(response.data)
                clickHandler(false)
                // window.location = "http://localhost:3000/"+User+"/";
                history.push('/User')
            }
            else if(response.data === 'No existe'){
                console.log(response.data)
                alert('Usuario o contraseña incorrecta')
            }
        })
    }



    /*const log2 = async(e) => {
        const res = await fetch(`{$urlCDC}/carro/log/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user.nombre,
                user.clave
            })
        })
        const data = await res.json()
        console.log(data)
    }*/

    return(
            <React.Fragment>
                <section className="vh-100 gradient-custom">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div
                            className="card bg-dark text-white"
                            style={{ borderRadius: "1rem" }}
                            >
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                <p className="text-white-50 mb-5">
                                </p>
                                <div className="form-outline form-white mb-4">
                                    <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    name="nombre"
                                    placeholder="Nombre"
                                    formMethod='POST'
                                    onChange={e => setUser({...user, nombre: e.target.value})}
                                    />
                                </div>
                                <div className="form-outline form-white mb-4">
                                    <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    name="password"
                                    placeholder="Password"
                                    formMethod='POST'
                                    onChange={e => setUser({...user, clave: e.target.value})}
                                    />
                                </div>
                                <button
                                    className="btn btn-outline-light btn-lg px-5"
                                    type="submit"
                                    onClick={log}
                                >
                                    Login
                                </button>
                            </div>
                            </div>
                            </div>
                        </div>
                </section>
            </React.Fragment>
        )
    
}