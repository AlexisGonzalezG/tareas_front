import React, { Component } from "react";
import Secc_login from "./secc_login";
import Secc_registrar from "./secc_registrar";
import Secc_home from "./secc_home";

class MainDesktop extends Component {

    constructor() {
        super();

        this.state = {
            servurlbase: 'http://localhost:8000',
            cursecc: "home"
        };

    }

    cambiaSeccion = (sec,) => {
        this.setState({ cursecc: sec });
    };

    componentDidMount() {
    };

    render() {


        return (
            <div>
                {/* ------------------------------- SECCIONES -------------------------------------*/}
                 <div className="container-fluid"  style={{ backgroundColor:'#306bff' }}>
                    <br/><br/><br/>
                    {
                    this.state.cursecc === "main" ? 
                        <Secc_login cambiaSeccion = {this.cambiaSeccion} />
                    :this.state.cursecc === "registrar" ? 
                        <Secc_registrar cambiaSeccion = {this.cambiaSeccion}/>
                    :this.state.cursecc === "home" ? 
                        <Secc_home cambiaSeccion = {this.cambiaSeccion}/>
                     : 
                     ""
                    }
                 </div>
            </div>
        );
    }
}
export default MainDesktop;
