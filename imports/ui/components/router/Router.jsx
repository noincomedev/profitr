import React from "react";
import gql from "graphql-tag";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { graphql } from "react-apollo";

import DashboardPage from "../../pages/DashboardPage";
import LandingPage from "../../pages/LandingPage";

const Router = ({ loading, user }) => {
  if (!loading) {
    return (
      <BrowserRouter>
        <Switch>
          {user ? (
            <Route path="/" component={DashboardPage} />
          ) : (
            <Route path="/" component={LandingPage} />
          )}
        </Switch>
      </BrowserRouter>
    );
  }
  return <h1>Loading</h1>;
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
