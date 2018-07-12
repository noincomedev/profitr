import React from "react";

import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    margin: "auto",
    minHeight: "100%"
  }
});

let Spinner = ({ classes, size, theme }) => (
  <Grid
    container
    classes={{ container: classes.container }}
    justify="center"
    alignItems="center"
  >
    <CircularProgress
      size={size ? size : 50}
      color="secondary"
      variant="indeterminate"
    />
  </Grid>
);

export default withStyles(styles, { withTheme: true })(Spinner);
