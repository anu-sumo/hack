import React, { Component } from 'react';
import SimpleCard from './SimpleCard';

class UtilitesTab extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            hex: '',
            decimal: '',
        }
    }
    
    render() {
        return (
            <div>
            <SimpleCard title={"Convertor"} {...this.state} onChange={(change) => {this.setState(change)}}/>                
            </div>
        );
    }
}

export default UtilitesTab;


