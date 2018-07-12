import React from "react";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import PrivatePortfolioList from "../components/portfolio/list/Private";

const styles = theme => ({ container: { height: "100%" } });

const DashboardPage = ({ classes }) => (
  <Grid
    container
    justify="center"
    alignItems="center"
    classes={{ container: classes.container }}
  >
    <PrivatePortfolioList />
  </Grid>
);

export default withStyles(styles)(DashboardPage);
