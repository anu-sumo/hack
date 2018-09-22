import React from 'react';
import PropTypes, { func } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import converter from 'hex2dec';

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = {
    card: {
        marginTop: '20px',
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

function Info(props) {
    // <CardActions>
    //             
    //         </CardActions>
    return (
        <div>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            Org Name
                </TableCell>
                        <TableCell numeric>{props.org_name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            Account Type
                </TableCell>
                        <TableCell numeric>{props.account_type}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            Katta Tier
                </TableCell>
                        <TableCell numeric>{props.katta_tier}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            Daily GB Plan
                </TableCell>
                        <TableCell numeric>{props.daily_gb_plan}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

let Form = (props) => {
    return (
        <div>
            <br/>
            <FormControl>
                <InputLabel htmlFor="age-helper">Deployment</InputLabel>
                <br/>
                <Select
                    style={{ minWidth: "420px" }}
                    value={props.deployment}
                    fullWidth
                    onChange={(e) => props.onChange({ deployment: e.target.value })}
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
                <FormHelperText></FormHelperText>
            </FormControl>
            <TextField
                id="Org ID"
                label="Org ID"
                fullWidth
                margin="dense"
                value={props.orgId}
                onChange={(e) => props.onChange({ orgId: e.target.value })}
            />
            <CardActions>
                {props.loading ? <CircularProgress  style={{display: 'absolute', alignSelf: 'center'}}/> : ''}
                <Button disabled={props.loading} variant="contained" color="primary" size="small" onClick={props.getOrgIdDetails}>Submit</Button>
            </CardActions>
        </div>
    );
}



function OrgId(props) {
    console.log(props);
    const { classes, orgDetails } = props;
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.card}>
            <CardContent>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant="headline" component="h2">
                Org Details
            <br/>
    </Typography> 
    {props.orgDetails && <Button variant="contained" color="primary" size="small" onClick={props.reset}>New Search</Button>}
        
            </div>
        
        
                {orgDetails ? Info({...props.orgDetails, reset: props.reset, loading: props.loading}) : Form(props)}
            </CardContent>
        </Card>
    );
}

OrgId.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrgId);
