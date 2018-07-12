import React, { Fragment } from "react";
import classNames from "classnames";
import { Route, Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import NavigationLayout from "../../layouts/navigation/NavigationLayout";
import PublicFooter from "../navigation/PublicFooter";

const styles = theme => ({
  landingPageMain: {
    flex: 1,
    paddingTop: 56,
    [theme.breakpoints.up("sm")]: {
      paddingTop: 64
    },
    background: `linear-gradient(rgba(0, 0, 0, .6),rgba(0, 0, 0, .1)),
      url("https://static-news.moneycontrol.com/static-mcnews/2018/01/BSE_Sensex_Budget_2017_volatile1-770x433.jpg")`,
    backgroundSize: "cover"
  },
  main: {
    flex: 1,
    backgroundColor: theme.palette.background.default,
    paddingTop: 56,
    [theme.breakpoints.up("sm")]: {
      paddingTop: 64
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
            <NavigationLayout location={location} />
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
