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
import NotificationTabForm from './NotificationTabForm';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import LinearProgress from '@material-ui/core/LinearProgress';
import Avatar from '@material-ui/core';
import SubscriptionListItem from './SubscriptionListItem'
import CircularProgress from '@material-ui/core/CircularProgress';
import SvgIcon from '@material-ui/core/SvgIcon';




class NotificationTab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formOpen: false,
            subscriptions: [],

        }
    }

    handleSubscribe = (newSub) => {
        const newSubs = [{ ...newSub, finished: false }, ...this.state.subscriptions]
        localStorage.setItem('subscriptions', JSON.stringify(newSubs));
        this.setState({ subscriptions: newSubs, formOpen: false })
    }

    componentDidMount() {
        //TODO: fine tune this.
        const subs = localStorage.getItem('subscriptions');
        if (subs) {
            this.setState({ subscriptions: JSON.parse(subs) });
        } else {
            localStorage.setItem('subscriptions', JSON.stringify([]));
        }
        this.intervalId = setInterval(() => {
            this.setState({ subscriptions: JSON.parse(localStorage.getItem('subscriptions')) })
        }, 10000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    handleFormClose = () => {
        this.setState({ formOpen: false })
    }

    handleFormOpen = () => {
        this.setState({ formOpen: true })

    }

    // type: 'search',
    // jobUrl: '',
    // sessionId: '',
    // deployment: '',
    // <Avatar/>

    renderSubscriptions() {
        return (
            <List component="ul">
                {this.state.subscriptions.map(({ type, jobUrl, sessionId, deployment }) => (


                    <ListItem >
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={type === "search" ? sessionId : jobUrl}
                            secondary={type === "search" ? deployment : null} />
                        <ListItemIcon>

                            <CircularProgress style={{ color: 'gray' }} size={30} />
                        </ListItemIcon>

                        <SvgIcon nativeColor="#458B00">
                        <path d="M5.48 10.089l1.583-1.464c1.854.896 3.028 1.578 5.11 3.063 3.916-4.442 6.503-6.696 11.311-9.688l.516 1.186c-3.965 3.46-6.87 7.314-11.051 14.814-2.579-3.038-4.301-4.974-7.469-7.911zm14.407.557c.067.443.113.893.113 1.354 0 4.962-4.038 9-9 9s-9-4.038-9-9 4.038-9 9-9c1.971 0 3.79.644 5.274 1.723.521-.446 1.052-.881 1.6-1.303-1.884-1.511-4.271-2.42-6.874-2.42-6.075 0-11 4.925-11 11s4.925 11 11 11 11-4.925 11-11c0-1.179-.19-2.313-.534-3.378-.528.633-1.052 1.305-1.579 2.024z"/>
    </SvgIcon>
                        <Icon color="primary" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"></svg>
                        </Icon>
                    </ListItem>




                ))}
            </List>
        )
    }

    render() {
        const { formOpen } = this.state;
        return (
            <div>
                <NotificationTabForm open={formOpen} handleSubscribe={this.handleSubscribe} close={this.handleFormClose} />
                <Typography variant="headline" gutterBottom>
                    Add New
                 </Typography>
                {this.renderSubscriptions()}
                <div className={styles.addButton}>
                    <Button variant="fab" color="primary" aria-label="Add" onClick={this.handleFormOpen} style={{
                        position: "absolute",
                        bottom: "20px",
                        right: "20px",
                    }}>
                        <AddIcon />
                    </Button>
                </div>
            </div>
        );
    }
}

export default NotificationTab;