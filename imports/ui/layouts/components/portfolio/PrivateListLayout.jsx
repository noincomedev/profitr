import React, { Component } from "react";
import { PropTypes } from "prop-types";

import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Add from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";

import PrivateItem from "../../../components/portfolio/list/PrivateItem";
import PortfolioForm from "../../../components/portfolio/PortfolioForm";

const styles = theme => ({
  header: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center"
  },
  iconButton: {
    color: theme.palette.primary.dark
  }
});

class PrivateListLayout extends Component {
  constructor(props) {
    super(props);
    const { portfolios } = props;
    this.state = { controls: portfolios.length > 0 };
  }

  toggleControls = () => {
    this.setState({ controls: !this.state.controls });
  };

  render() {
    const { classes, portfolios } = this.props;
    const { controls } = this.state;
    return (
      <Grid container justify="center">
        <Grid item xs={8} md={6}>
          <header className={classes.header}>
            <Typography variant="title" color="inherit">
              Portfolios
            </Typography>
            {controls && (
              <IconButton
                classes={{ colorInherit: classes.iconButton }}
                color="inherit"
                onClick={this.toggleControls}
              >
                <Add />
              </IconButton>
            )}
          </header>
          <Divider light style={{ marginBottom: 8 }} />
          {!controls && (
            <PortfolioForm
              toggleControls={this.toggleControls}
              showCancelButton={portfolios.length > 0}
            />
          )}
          {controls &&
            portfolios.length > 0 && (
              <List component="nav">
                {portfolios.map(portfolio => (
                  <PrivateItem key={portfolio._id} portfolio={portfolio} />
                ))}
              </List>
            )}
        </Grid>
      </Grid>
    );
  }
}

PrivateListLayout.propTypes = {
  portfolios: PropTypes.array.isRequired
};

export default withStyles(styles)(PrivateListLayout);
