import React, { Fragment } from "react";
import classNames from "classnames";
import { Route, Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import PublicFooter from "../navigation/PublicFooter";
import PublicNavigation from "../navigation/PublicNavigation";

const styles = theme => ({
  landingPageMain: {
    flex: 1,
    marginTop: 64,
    [theme.breakpoints.up("sm")]: {
      marginTop: 0
    }
  },
  main: {
    flex: 1,
    backgroundColor: theme.palette.background.default,
    marginTop: 56,
    [theme.breakpoints.up("sm")]: {
      marginTop: 64
    }
  }
});

const PublicRoute = ({ classes, component, exact, location, name, path }) => {
  if (!Meteor.userId()) {
    return (
      <Route
        exact={exact}
        path={path}
        render={props => (
          <Fragment>
            <PublicNavigation />
            <main
              className={classNames(
                location.pathname == "/"
                  ? classes.landingPageMain
                  : classes.main
              )}
            >
              {React.createElement(component, { name })}
            </main>
            <PublicFooter />
          </Fragment>
        )}
      />
    );
  }
  return <Redirect to="/" />;
};

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool,
  name: PropTypes.string,
  path: PropTypes.string
};

export default withStyles(styles)(withRouter(PublicRoute));
