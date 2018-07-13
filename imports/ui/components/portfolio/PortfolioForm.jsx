import React, { Component } from "react";
import gql from "graphql-tag";
import { compose, graphql } from "react-apollo";
import { PropTypes } from "prop-types";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

import ValidatedForm from "../utils/ValidatedForm";

const styles = theme => ({
  card: {
    backgroundColor: theme.palette.primary.light
  },
  cardContent: {
    paddingTop: 0
  },
  cardTitle: {
    color: theme.palette.primary.dark,
    fontSize: "1rem"
  },
  submitButton: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white
  }
});

class PortfolioForm extends Component {
  constructor(props) {
    super(props);
    const { portfolio } = props;
    this.state = {
      name: portfolio ? portfolio.name : "",
      id: portfolio ? portfolio._id : ""
    };
  }

  handleChange = event => {
    const name = event.target.id,
      value = event.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    const { _id, name } = this.state;
    if (_id) {
      console.log("editPortfolio");
    } else {
      this.props
        .createPortfolio({ variables: { name } })
        .then(
          Bert.alert({
            title: "Success",
            message: "Portfolio created.",
            type: "success",
            style: "growl-top-right",
            icon: "fa-check"
          })
        )
        .catch(error =>
          Bert.alert({
            title: error ? "Error!" : "Success",
            message: error ? error.message : "Project saved",
            type: error ? "danger" : "success",
            style: "growl-top-right",
            icon: error ? "fa-remove" : "fa-check"
          })
        );
    }
    this.props.toggleControls();
  };

  render() {
    const { classes, portfolio } = this.props;
    const { name } = this.state;
    return (
      <Grid container justify="center">
        <Grid item xs={12} sm={8} md={6}>
          <Card classes={{ root: classes.card }}>
            <CardHeader
              title={`${portfolio ? "Edit" : "Create"} Portfolio`}
              classes={{ title: classes.cardTitle }}
            />
            <CardContent classes={{ root: classes.cardContent }}>
              <ValidatedForm onHandleSubmit={this.handleSubmit}>
                <TextField
                  id="name"
                  name="name"
                  label="Name"
                  value={name}
                  onChange={this.handleChange}
                  margin="normal"
                  fullWidth
                  required
                  InputLabelProps={{ style: { color: "#1DE9B6" } }}
                  inputProps={{ style: { color: "white" } }}
                />
                <Grid container justify="center">
                  {portfolio && (
                    <Grid item xs={12}>
                      <Button
                        type="button"
                        variant="contained"
                        color="inherit"
                        fullWidth
                        onClick={this.handleCancel}
                      >
                        Back
                      </Button>
                    </Grid>
                  )}
                  {portfolio && (
                    <Grid item xs={12}>
                      <Button
                        type="button"
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={this.handleDelete}
                      >
                        Delete
                      </Button>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      classes={{ containedSecondary: classes.submitButton }}
                      fullWidth
                    >
                      {portfolio ? "Save" : "Add"}
                    </Button>
                  </Grid>
                </Grid>
              </ValidatedForm>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

PortfolioForm.propTypes = {
  portfolio: PropTypes.object,
  toggleControls: PropTypes.func.isRequired
};

const CREATE_PORTFOLIO = gql`
  mutation createPortfolio($name: String!) {
    createPortfolio(name: $name) {
      _id
    }
  }
`;

export default compose(
  graphql(CREATE_PORTFOLIO, {
    name: "createPortfolio",
    options: {
      refetchQueries: ["portfolios"],
      variables: { owner: Meteor.userId() }
    }
  })
)(withStyles(styles)(PortfolioForm));
