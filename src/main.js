import React, { Component } from 'react';
import MainDesktop from './comp_desktop/main';

class Main extends Component {
    
    constructor() {
        super();

        this.state ={
        };
    }

    render() {

        return (
            <div>
                {
                 <MainDesktop />
                }
            </div>
        )
    }

}
export default Main