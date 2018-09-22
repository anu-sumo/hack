import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from './NotificationTabForm.css';

import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';


import Select from '@material-ui/core/Select';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import LinearProgress from '@material-ui/core/LinearProgress';




export default class NotificationTabForm extends React.Component {
    state = {
        type: 'search',
        jobUrl: '',
        sessionId: '',
        deployment: '',
    };

    handleClickOpen = () => {
        this.onChange({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    renderRadio() {
        return (
            <FormControl component="fieldset">
                <FormLabel component="legend">Type</FormLabel>
                <RadioGroup
                    aria-label="formType"
                    name="fromType"
                    value={this.state.type}
                    style={{ "flexDirection": "row", "marginLeft": "15px" }}
                    onChange={(e) => { this.setState({ type: e.target.value }) }}
                >
                    <FormControlLabel
                        value="search"
                        control={<Radio color="primary" />}
                        label="Search"
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        value="build"
                        control={<Radio color="primary" />}
                        label="build"
                        labelPlacement="start"
                    />
                </RadioGroup>
            </FormControl>
        );
    }

    renderSearchForm() {
        const classes = {}
        const opacity = { opacity: 0 };
        return (
            <div>
                {this.state.type === "search" ?
                    <TextField
                        id="sessionId"
                        label="Session Id"
                        fullWidth
                        margin="dense"
                        value={this.state.sessionId}
                        onChange={(e) => this.setState({ sessionId: e.target.value })}
                    />
                    :
                    <TextField
                        autoFocus
                        margin="dense"
                        id="jobUrl"
                        fullWidth
                        label="Jenkins Job URL"
                        value={this.state.jobUrl}
                        onChange={(e) => this.setState({ jobUrl: e.target.value })}
                    />
                }
                <FormControl className={classes.formControl} style={this.state.type === 'search'? {opacity: 1} : {opacity: 0}}>
                    <InputLabel htmlFor="age-helper">Deployment</InputLabel>
                    <Select
                        value={this.state.deployment}
                        fullWidth
                        style={{ minWidth: "356px" }}
                        onChange={(e) => this.setState({ deployment: e.target.value })}
                        input={<Input name="deployment" id="deployment" />}
                    >
                        <MenuItem value={"nite-www"}>nite</MenuItem>
                        <MenuItem value={"stag"}>stag-www</MenuItem>
                        <MenuItem value={"US1"}>service</MenuItem>
                        <MenuItem value={"long-prod "}> long-prod </MenuItem>
                        <MenuItem value={"long-us2 "}> long-us2 </MenuItem>
                        <MenuItem value={"long-syd "}> long-syd </MenuItem>
                        <MenuItem value={"long-dub "}> long-dub </MenuItem>
                    </Select>
                    <FormHelperText>PLease select the deployment this search is running on</FormHelperText>
                </FormControl>
            </div>
        );
    }

    render() {
        return (


            <Dialog
                style={{ minHeight: '356px' }}
                open={this.props.open}
                onClose={this.handleClose}
            >
                <LinearProgress color="orange" mode="determinate" value={false} />
                <DialogTitle id="form-dialog-title">Add Alert</DialogTitle>
                <DialogContent>
                    <br />
                    {this.renderRadio()}
                    {this.renderSearchForm()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.close} color="primary">
                        Cancel
            </Button>
                    <Button onClick={() => this.props.handleSubscribe(this.state)} color="primary">
                        Subscribe
            </Button>
                </DialogActions>
            </Dialog>

        );
    }
}
