import React from "react";
import gql from "graphql-tag";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { graphql } from "react-apollo";

const Router = ({ loading, user }) => {
  if (!loading) {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" render={props => <h1>Hello, world router!</h1>} />
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
