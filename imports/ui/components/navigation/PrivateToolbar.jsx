import React from "react";
import { withApollo } from "react-apollo";

import IconButton from "@material-ui/core/IconButton";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "../../../../node_modules/@material-ui/core";

const styles = theme => ({
  toolbarButtonsContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end"
  }
});

const PrivateToolbar = ({ classes, client }) => (
  <Toolbar>
    <Typography variant="title" color="inherit">
      Profitr
    </Typography>

    <div className={classes.toolbarButtonsContainer}>
      <IconButton
        color="inherit"
        className={classes.menuButton}
        onClick={event => {
          Meteor.logout(error => {
            if (!error) client.resetStore();
          });
        }}
      >
        <ExitToApp />
      </IconButton>
    </div>
  </Toolbar>
);

export default withStyles(styles)(withApollo(PrivateToolbar));
