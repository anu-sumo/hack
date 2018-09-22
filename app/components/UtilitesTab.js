import React, { Component } from 'react';
import SimpleCard from './SimpleCard';
import OrgId from './OrgId';
import {getOrgInfo} from '../api';

class UtilitesTab extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            hex: '',
            decimal: '',
            deployment: '',
            orgId: ''
        }
    }

    getOrgIdDetails =  ()  => {
        console.log('get org info');
        getOrgInfo('orgInfo',this.state.orgId, this.state.deployment);
        console.log('hellow world with const x');
        this.setState({loading: true})
        
        const searchForOrgInfo  = ( ) => {
            console.log(
                'searchForOrgInfo'
            )
            if(localStorage.getItem('orgInfo')) {
                console.error('orgInfo found')
                console.log(localStorage.getItem('orgInfo'));
                const details = JSON.parse(localStorage.getItem('orgInfo'));
                clearInterval(x)
                this.setState({orgDetails: details, loading: false});
                localStorage.removeItem('orgInfo');
            }
        }
        var x = setInterval(searchForOrgInfo, 500);        
    }

    render() {
        return (
            <div>
            <SimpleCard title={"Convertor"} {...this.state} onChange={(change) => {this.setState(change)}}/>        
            <OrgId {...this.state} onChange={(change) => this.setState(change)} getOrgIdDetails={this.getOrgIdDetails} reset= {() => this.setState({
                orgDetails: null
            })} />                
            </div>
        );
    }
}

export default UtilitesTab;


