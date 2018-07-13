import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import PrivateListLayout from "../../../layouts/components/portfolio/PrivateListLayout";

import Spinner from "../../utils/Spinner";

const PrivateList = props => (
  <Query query={GET_USER_PORTFOLIOS} variables={{ owner: Meteor.userId() }}>
    {({ loading, error, data }) => {
      if (loading) return <Spinner />;
      if (error) return `Error!: ${error}`;
      const { portfolios } = data;
      return <PrivateListLayout portfolios={portfolios} />;
    }}
  </Query>
);

const GET_USER_PORTFOLIOS = gql`
  query portfolios($owner: String!) {
    portfolios(owner: $owner) {
      _id
      name
    }
  }
`;

export default PrivateList;
