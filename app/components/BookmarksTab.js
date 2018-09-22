import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class NestedList extends React.Component {
  constructor(props) {
    super(props);
    this.bookmarks = {
      "nite": "https://nite-www.sumologic.net/ui/index.html?customerId=0000000131",
      "stag": "https://stag-www.sumologic.net/ui/index.html?customerId=0000000475",
      "long-prod": "https://long-prod.sumologic.net/ui/index.html?customerId=0000000005",
      "long-us2": "https://long-us2.sumologic.net",
      "long-dub": "https://long-dub.sumologic.net",
      "long-syd": "https://long-syd.sumologic.net",
      prod: "https://service.sumologic.com/ui",
      wiki: "https://wiki.kumoroku.com/confluence/display/",
      jira: "https://jira.kumoroku.com",
      jenkins: "https://jenkins.kumoroku.com",
      codelabs: "https://github.com/Sanyaku/codelabs",
    }

  }

  render() {
    const { classes } = this.props;
    return (

      <List>
        {Object.keys(this.bookmarks).map((bm) => {
          return (
            <ListItem button onClick={() => {
              chrome.tabs.create({ url: this.bookmarks[bm] })
            }}>
              <ListItemText inset primary={bm} secondary={this.bookmarks[bm]} />
            </ListItem>
          )
        })}
      </List>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);
