import React, { Component, Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import NavigationLayout from "../../layouts/navigation/NavigationLayout";

const styles = theme => ({
  main: {
    backgroundColor: "#E0F2F1",
    paddingTop: 56,
    height: "100%"
  }
});

class PrivateRoute extends Component {
  render() {
    const { classes, component, exact, path } = this.props;
    if (!Meteor.userId()) return <h1>forbidden</h1>;
    return (
      <Route
        exact={exact}
        path={path}
        render={props => (
          <Fragment>
            <NavigationLayout />
            <main className={classes.main}>
              {React.createElement(component)}
            </main>
          </Fragment>
        )}
      />
    );
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool,
  name: PropTypes.string,
  path: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(PrivateRoute);
