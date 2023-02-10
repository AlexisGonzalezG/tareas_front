import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody,Row} from 'reactstrap';
import './desktop.css';
import Swal from 'sweetalert2';

class Modal_agregar extends Component{

    constructor() {
        super();

        this.state ={
        }

    }

    agregar_tarea = () => {

        var tarea = document.getElementById('area').value; 
        tarea = tarea.trim();

        if(tarea === ''){
            Swal.fire("Error", "Tarea invalida", "warning"); 
            return false;
        }

        let data = {
            id_user:this.props.id_user,
            tarea:tarea
        }
  
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
  
            fetch("http://localhost:8000/api/agrega_tarea", requestOptions)
                .then(response => response.json())
                .then((response) => {
  
                    if(response.ok == 100){

                      Swal.fire(
                        'Agregada',
                        'Se agregó la tarea con éxito',
                        'success'
                      );

                      this.props.tareas(this.props.id_user);
                      this.props.cierra();

                    }
                    else{
                      Swal.fire("Error", "Error", "warning");
                    }
                    
                })
                .catch(e => console.log(e));
  
    };


    render(){
        
        return(
            <div>
                <Modal className='modal-dialog' isOpen={true}>
                    <ModalHeader style={{ backgroundColor:'#306bff' }} toggle={this.props.cierra}>
                    </ModalHeader>
                        <ModalBody>
                          <Row>
                            <div className='col-sm-12 col-12'>
                              <p className='text-dark fw-bold'>Agregar tarea</p>
                            </div>
                            <div className='col-sm-12 col-12'>
                              <textarea className="form-control" id="area" maxlength="150"></textarea> 
                            </div>
                            <div className='col-sm-12 col-12 text-center' style={{ padding:'5px' }}>
                              <button className='btn btn-warning text-light fw-bold' onClick={this.agregar_tarea.bind(this)}>ACEPTAR</button>
                            </div>
                          </Row>
                        </ModalBody>
                        <footer>
                            <br/>
                        </footer>
                </Modal>    
            </div>
        );
    }    
}

export default Modal_agregar