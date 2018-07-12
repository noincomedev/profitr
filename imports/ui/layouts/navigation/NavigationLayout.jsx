import React, { Component } from "react";
import classNames from "classnames";

import PublicToolbar from "../../components/navigation/PublicToolbar";
import PrivateToolbar from "../../components/navigation/PrivateToolbar";

import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  root: {
    backgroundColor: theme.palette.primary.dark
  }
});

class NavigationLayout extends Component {
  render() {
    const { classes } = this.props;
    const open = false;
    return (
      <nav>
        <AppBar
          classes={{ root: classes.root }}
          position="fixed"
          className={classNames(classes.appBar, open && classes.appBarShift)}
        >
          {!Meteor.userId() ? <PublicToolbar /> : <PrivateToolbar />}
        </AppBar>
      </nav>
    );
  }
}

export default withStyles(styles)(NavigationLayout);
