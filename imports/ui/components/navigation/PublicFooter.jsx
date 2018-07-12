import React from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    minHeight: "15vh",
    backgroundColor: theme.palette.primary.dark,
    padding: theme.spacing.unit
  },
  footerLink: {
    color: `${theme.palette.secondary.light} !important`,
    "&:hover": {
      color: "white !important"
    }
  }
});

const PublicFooter = ({ classes }) => (
  <Grid
    container
    className={classes.container}
    direction="column"
    justify="center"
    alignItems="center"
  >
    <Typography variant="caption" color="secondary">
      Developed by
    </Typography>
    <Button
      variant="contained"
      color="secondary"
      href="https://www.noincomedev.me"
    >
      NOINCOMEDEV
    </Button>
  </Grid>
);

export default withStyles(styles, { withTheme: true })(PublicFooter);
