import React, {useState} from "react";
import "../cssStyles/Login.css"
import axios from 'axios'



export const Login = () => {
    const urlCDC = process.env.REACT_APP_CDC

    const [user, setUser] = useState({nombre: "", clave:""})
    const [tipo, setTipo] = useState("")

    const handleChange = e => {
        setUser(e.target.value)
        console.log(user)
    }

    const log = async () => {
        await axios.get(urlCDC+'/user', {params: {nombre: user.nombre, clave: user.clave}})
        .then(response => {
            console.log(response.data)
        })
    }

    const handleChangeTipo = e => {
        setTipo({
            value: e.target.value
        })
        console.log(e.target.value)
    }

    const handleButton = () => {
        console.log(urlCDC)
    }

    return(
            <React.Fragment>
                <section className="vh-100 gradient-custom">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
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
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control form-control-lg"
                                    name="nombre"
                                    placeholder="Nombre"
                                    />
                                </div>
                                <div className="form-outline form-white mb-4">
                                    <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    />
                                </div>
                                <p>Tipo de usuario</p>
                                <form/>
                                    <div className="radio">
                                        <label defaultValue="admin">
                                            <input
                                             type="radio"
                                             value="Admin"
                                             name="Admin"
                                             checked={tipo.value === "Admin"}
                                             onChange={handleChangeTipo}
                                             />
                                             Admin
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label defaultValue="User">
                                            <input
                                             type="radio"
                                             value="User"
                                             name="User"
                                             checked={tipo.value === "User"}
                                             onChange={handleChangeTipo}
                                             />
                                             User
                                        </label>
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
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    
}