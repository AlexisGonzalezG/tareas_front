import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody,Row} from 'reactstrap';
import './desktop.css';
import Swal from 'sweetalert2';

class Modal_editar extends Component{

    constructor() {
        super();

        this.state ={
        }

    }

    editar = () => {

      let data = {
          id:this.props.objeto_editar.id,
          tarea:document.getElementById('area').value
      }

          const requestOptions = {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
          };

          fetch("http://localhost:8000/api/modifica_tarea", requestOptions)
              .then(response => response.json())
              .then((response) => {

                  if(response.ok == 100){
                    Swal.fire(
                      'Modificado',
                      'Se modificó tarea con éxito',
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

    componentDidMount() {
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
                              <p className='text-dark fw-bold'>Editar tarea</p>
                            </div>
                            <div className='col-sm-12 col-12'>
                              <textarea className="form-control" id="area" maxlength="150">{this.props.objeto_editar.tarea}</textarea> 
                            </div>
                            <div className='col-sm-12 col-12 text-center' style={{ padding:'5px' }}>
                              <button className='btn btn-warning text-light fw-bold' onClick={this.editar.bind(this)}>ACEPTAR</button>
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

export default Modal_editar