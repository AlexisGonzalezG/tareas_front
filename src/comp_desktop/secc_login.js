import React, { Component } from "react";
import "./desktop.css";
import Swal from 'sweetalert2';

class Secc_login extends Component {

    constructor() {
        super();

        this.state = {
            
        };
    }

    login = () => {

        var name = document.getElementById("name").value;
        var password = document.getElementById("password").value;

        if(!name && !password){
            Swal.fire("Error", "Llene todos los campos para continuar", "warning");
            return false;
        }
          
        let data = {
            "name": name,
            "password": password
            }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        fetch("http://localhost:8000/api/v1/auth/login", requestOptions)
        .then(response => response.json())
        .then((response) => {
            console.log(response);
            if(response.access_token){
                this.props.cambiaSeccion('home');
            }
            else{
                Swal.fire("Error", "Error", "warning");
            }
        })
        .catch(e => console.log(e));
     
    };

    render() {

        return (
            <div>
                <div className="container">
                    <div className="row row_ ">
                        <div className="col-sm-12 col-12">
                            <div className="row" style={{ padding:'30px' }}>
                                <div className="col-sm-4 col-12"></div>
                                <div className="col-sm-4 col-12 text-center bg-light rounded border" style={{ padding:'30px' }}>
                                 <img width={120} src="/img/tareas_logo.png" style={{ padding:'15px' }}/>
                                 <input id="name" type="text" className="form-control" placeholder="Ingrese usuario" style={{textAlign:'center' }}/>
                                 <br/>
                                 <input id="password" type="password" className="form-control" placeholder="Ingrese contraseña" style={{textAlign:'center' }}/>
                                 <br/>
                                 <button type="button" className="btn btn-warning text-light fw-bold" onClick={this.login.bind(this)}>INICIAR SESIÓN</button>
                                 <br/>
                                 <button type="button" className="btn btn-link" onClick={this.props.cambiaSeccion.bind(this,'registrar')}>Click aquí para registrarse</button>
                                </div>
                                <div className="col-sm-4 col-12"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Secc_login;
