import React from "react";
import gql from "graphql-tag";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { graphql } from "react-apollo";
import { MuiThemeProvider } from "@material-ui/core/styles";

import PublicRoute from "./PublicRoute";

import theme from "../../../assets/theme";

import DashboardPage from "../../pages/DashboardPage";
import LandingPage from "../../pages/LandingPage";
import PortfolioPage from "../../pages/PortfolioPage";
import PrivateRoute from "./PrivateRoute";

import Spinner from "../utils/Spinner";

const Router = ({ loading, user }) => {
  if (!loading) {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <Switch>
            {user ? (
              <PrivateRoute
                name="Dashboard"
                path="/"
                component={DashboardPage}
                exact
              />
            ) : (
              <PublicRoute name="Home" path="/" component={LandingPage} exact />
            )}
            <PrivateRoute
              name="Portfolio"
              path="/portfolios/:_id"
              component={PortfolioPage}
              exact
            />
          </Switch>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
  return <Spinner />;
};

export const CURRENT_USER = gql`
  query currentUser {
    user {
      _id
      admin
    }
  }
`;

export default graphql(CURRENT_USER, {
  options: {
    fetchPolicy: "cache-and-network"
  },
  props: ({ data }) => ({ ...data })
})(Router);
