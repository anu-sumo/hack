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
import sumoLogo from '../../chrome/assets/img/sumo.png'
import jiraLogo from '../../chrome/assets/img/jira.png';
import confluenceLogo from '../../chrome/assets/img/confluence.png';
import githubLogo from '../../chrome/assets/img/github.png';
import jenkinsLogo from '../../chrome/assets/img/jenkins.png';

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
      "Sumo Nite UI": { icon: sumoLogo, url: "https://nite-www.sumologic.net/ui/index.html?customerId=0000000131" },
      "Sumo Stag UI": { icon: sumoLogo, url: "https://stag-www.sumologic.net/ui/index.html?customerId=0000000475" },
      "Sumo Long-Prod UI": { icon: sumoLogo, url: "https://long-prod.sumologic.net/ui/index.html?customerId=0000000005" },
      "Sumo Long-Us2 UI": { icon: sumoLogo, url: "https://long-us2.sumologic.net" },
      "Sumo Long-Dub UI": { icon: sumoLogo, url: "https://long-dub.sumologic.net" },
      "Sumo Long-Syd UI": { icon: sumoLogo, url: "https://long-syd.sumologic.net" },
      "Sumo Prod UI": { icon: sumoLogo, url: "https://service.sumologic.com/ui" },
      "Wiki": { icon: confluenceLogo, url: "https://wiki.kumoroku.com/confluence/display/" },
      "Jira": { icon: jiraLogo, url: "https://jira.kumoroku.com" },
      "Jenkins": { icon: jenkinsLogo, url: "https://jenkins.kumoroku.com" },
      "Codelabs": { icon: githubLogo, url: "https://github.com/Sanyaku/codelabs" },
    };
  }

  render() {
    const { classes } = this.props;
    return (

      <List>
        {Object.keys(this.bookmarks).map((bm) => {
          return (
            <ListItem button onClick={() => {

              chrome.tabs.create({ url: this.bookmarks[bm].url })
            }}>
              <img src={this.bookmarks[bm].icon} alt="" height="42" width="42" />
              <ListItemText inset primary={bm} secondary={this.bookmarks[bm].url} />
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
