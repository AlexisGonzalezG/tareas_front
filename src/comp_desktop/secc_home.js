import React, { Component } from "react";
import "./desktop.css";
import Swal from 'sweetalert2';
import Modal_editar from "./modal_editar";
import Modal_agregar from "./modal_agregar";

class Secc_home extends Component {

    constructor() {
        super();

        this.state = {
            id_user: "",
            name: "",
            tareas:[] ,
            modal_editar:false,
            Modal_agregar:false,
            objeto_editar:[]       
        };
    }

    sesion = () => {
          
        let data = {
            }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        fetch("http://localhost:8000/api/consulta_sesion", requestOptions)
        .then(response => response.json())
        .then((response) => {

            if(response.ok == 100){
                this.setState({id_user:response.sesion[0].id_user})
                this.setState({name:response.sesion[0].name})
                this.tareas(this.state.id_user);
            }
            else{
                this.props.cambiaSeccion('main');
            }
        })
        .catch(e => console.log(e));
     
    };

    tareas = (id_usuario) => {

        let data = {
            id_usuario:id_usuario
        }

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };

            fetch("http://localhost:8000/api/consulta_tareas", requestOptions)
                .then(response => response.json())
                .then((response) => {

                    if(response.ok == 100){
                        this.setState({tareas:response.tareas});
                    }
                    
                })
                .catch(e => console.log(e));

    };

    showModal=(objetos) => {
        this.setState({modal_editar:true});
        this.setState({objeto_editar:objetos})
    };

    showModalAgregar=() => {
        this.setState({Modal_agregar:true});
    };

    cierra = () => {
        this.setState({modal_editar:false});
    };

    cierra_agregar = () => {
        this.setState({Modal_agregar:false});
    };

    elimina = (objetos) => {

        Swal.fire({
            title: '¿Eliminar Tarea?',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
          }).then((result) => {

            if (result.isConfirmed) {//elimina_tarea

                let data = {
                    id:objetos.id
                }
          
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                };

                fetch("http://localhost:8000/api/elimina_tarea", requestOptions)
                 .then(response => response.json())
                 .then((response) => {

                  if(response.ok == 100){

                    Swal.fire('Tarea eliminada', '', 'success')

                    this.tareas(this.state.id_user);
                  }
                  else{
                    Swal.fire("Error", "Error", "warning");
                  }
                  
              })
              .catch(e => console.log(e));


            } 
          })

    };

    out = () => {

        let data = {
        }
  
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
  
            fetch("http://localhost:8000/api/out", requestOptions)
                .then(response => response.json())
                .then((response) => {
  
                    if(response.ok == 100){
                        this.sesion(); 
                    }
                    else{
                      Swal.fire("Error", "Error", "warning");
                    }
                    
                })
                .catch(e => console.log(e));
  
    };


    componentDidMount() {
       this.sesion(); 
    };

    render() {

        return (
            <div>
                
                <nav className="fixed-top bg-light shadow-lg  border-bottom box-shadow mb-3" style={{ height:'80px'}}>
                  <div className="navbar-header p-2" style={{ display:'flex', justifyContent:'flex-end' }}>
                     <button type="button" className="btn btn-link text-dark" onClick={this.out.bind(this)}>Cerrar sesión</button>
                  </div>
                </nav>
                
                
               <div className="container-fluid">
                 <div className="row row_">
                    <div className="col-sm-12 col-12 text-center">
                      <br/>
                      <h2 className="text-light fw-bold">Bienvenido al Administrador de tareas, {this.state.name} </h2>
                    </div>
                    <div className="col-sm-12 col-12 text-center table-responsive">
                        <button type="button" className="btn btn-link text-light" onClick={this.showModalAgregar.bind(this)}>Agregar tarea +</button>
                        <table className="table table-light table-striped">
                            <thead>
                                <tr>
                                    <th>Tareas</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.tareas.length>0?this.state.tareas.map((objetos) =>( 

                                <tr>
                                    <td className="border" style={{ minWidth:'300px' }}>{ objetos.tarea }</td>
                                    <td><img width={50} src="/img/pen.png" onClick={this.showModal.bind(this,objetos)} style={{ cursor:'pointer',padding:'15px' }}/></td>
                                    <td><img width={55} src="/img/trash.png" onClick={this.elimina.bind(this,objetos)} style={{ cursor:'pointer',padding:'15px' }}/></td>
                                </tr>

                                ))
                                : 
                                <tr>
                                    <td colSpan={3} className="bg-light text-center">Sin tareas registradas</td>
                                </tr>
                                }
                            </tbody>

                        </table>
                    </div>
                 </div>
                </div> 
                {
                    this.state.modal_editar === true?
                        <Modal_editar id_user = {this.state.id_user} tareas = {this.tareas} cierra = {this.cierra} objeto_editar = {this.state.objeto_editar} />
                    :''
                }
                {
                    this.state.Modal_agregar === true?
                        <Modal_agregar id_user = {this.state.id_user} tareas = {this.tareas} cierra = {this.cierra_agregar}/>
                    :''
                }
            </div>
        );
    }
}
export default Secc_home;
