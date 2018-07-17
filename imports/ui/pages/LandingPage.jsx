import React, { Component } from "react";
import { Bert } from "meteor/themeteorchef:bert";
import { withApollo } from "react-apollo";

import Spinner from "../components/utils/Spinner";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

styles = theme => ({
  container: {
    height: "100%"
  },
  item: {
    background: "rgba(0, 0, 0, 0.6)",
    border: `5px solid ${theme.palette.secondary.light}`,
    borderRadius: "25px",
    minHeight: "33vh",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  input: {
    color: "red"
  },
  logo: {
    color: theme.palette.primary.light
  },
  signinContainer: {
    background: theme.palette.secondary.main,
    borderRadius: `0px 0px 25px 25px`,
    alignItems: "center"
  },
  subheading: {
    color: theme.palette.grey[400]
  }
});

class LandingPage extends Component {
  state = {
    email: "",
    loading: false,
    password: ""
  };

  handleChange = event => {
    const name = event.target.id,
      value = event.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { client } = this.props;
    const { email, password } = this.state;
    this.toggleLoading();
    Meteor.loginWithPassword(email, password, error => {
      if (!error) {
        client.resetStore();
      }
      Bert.alert({
        title: error ? "Error!" : "Success",
        message: error ? error.reason : "You are now logged in",
        type: error ? "danger" : "success",
        style: "growl-top-right",
        icon: error ? "fa-remove" : "fa-check"
      });
      this.toggleLoading();
    });
  };

  toggleLoading = () => {
    this.setState({ loading: !this.state.loading });
  };

  render() {
    const { classes } = this.props;
    const { email, loading, password } = this.state;
    if (loading) return <Spinner />;
    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        classes={{ container: classes.container }}
      >
        <Grid item xs={12} sm={8} md={6} classes={{ item: classes.item }}>
          <Typography
            style={{ marginTop: 16 }}
            variant="headline"
            color="secondary"
            align="center"
          >
            Stock Simulator
          </Typography>
          <Typography
            variant="display4"
            color="primary"
            align="center"
            classes={{ colorPrimary: classes.logo }}
          >
            PROFITR
          </Typography>
          <Typography
            paragraph
            variant="subheading"
            classes={{ subheading: classes.subheading }}
            align="center"
          >
            Calculate your profits between two dates!
          </Typography>
          <form onSubmit={this.handleSubmit} noValidate>
            <Grid
              container
              spacing={8}
              justify="center"
              classes={{ container: classes.signinContainer }}
            >
              <Grid item xs={4}>
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={this.handleChange}
                  margin="none"
                  fullWidth
                  autoFocus
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={this.handleChange}
                  margin="none"
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Sign in!
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(withApollo(LandingPage));
