import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styles from './NotificationTab.css';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';



class NotificationTab extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    handleChange(key, value) {
        console.log(key, value);
    }

    render() {
        return (
            <div>
                <Typography variant="headline" gutterBottom>
                    Add New
                 </Typography>
                <div className={styles.addNew}>
                    <Select
                        value={'abc'}
                        onChange={this.handleChange}
                        input={<Input name="age" id="age-helper" />}
                        defaultValue='long-prod'
                    >
                        <MenuItem value={"nite-www"}>nite</MenuItem>
                        <MenuItem value={"stag-www"}>stag</MenuItem>
                        <MenuItem value={"long-prod"}> long-prod </MenuItem>
                        <MenuItem value={"long-us2 "}> long-us2 </MenuItem>
                        <MenuItem value={"long-syd "}> long-syd </MenuItem>
                        <MenuItem value={"long-dub "}> long-dub </MenuItem>
                        <MenuItem value={"US1"}>service</MenuItem>
                    </Select>
                    <TextField
                        id="sessionId"
                        label="Session Id"
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                    />
                    <div>
                    </div>

                </div>
                <div className={styles.addButton}>
                    <Button variant="fab" color="primary" aria-label="Add">
                    <AddIcon/>
                 </Button>
            </div>


                
            </div >
        );
    }
}

export default NotificationTab;