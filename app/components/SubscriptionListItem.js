import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SubscriptionListItem extends Component {
    render() {
        const { type, jobUrl, sessionId, deployment } = this.props;
        return (
            <ListItem >
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={type === "search" ? sessionId : jobUrl}
                    secondary={type === "search" ? deployment : null} />
            </ListItem>
        );
    }
}

SubscriptionListItem.propTypes = {

};

export default SubscriptionListItem;