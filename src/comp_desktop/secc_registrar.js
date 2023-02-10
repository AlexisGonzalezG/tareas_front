import React, { Component } from "react";
import "./desktop.css";
import Swal from 'sweetalert2';

class Secc_registrar extends Component {

    constructor() {
        super();

        this.state = {
            
        };
    }

    enviar = () => {

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

        fetch("http://localhost:8000/api/newUser", requestOptions)
        .then(response => response.json())
        .then((response) => {
            console.log(response);
            if(response.ok == 100){

                Swal.fire(
                    'Usuario creado',
                    'Se creó usuario exitosamente',
                    'success'
                );

                document.getElementById("name").value = "";
                document.getElementById("password").value = "";

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
                                 <input id="name" type="text" className="form-control" placeholder="Ingrese nuevo nombre de usuario" style={{textAlign:'center' }}/>
                                 <br/>
                                 <input id="password" type="password" className="form-control" placeholder="Ingrese contraseña" style={{textAlign:'center' }}/>
                                 <br/>
                                 <button type="button" className="btn btn-warning" onClick={this.enviar.bind(this)}>Aceptar</button>
                                 <br/>
                                 <button type="button" className="btn btn-link" onClick={this.props.cambiaSeccion.bind(this,'main')}>Regresar</button>
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
export default Secc_registrar;
