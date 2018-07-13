import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";

import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withDtyles } from "@material-ui/core/styles";

import Spinner from "../components/utils/Spinner";

const PortfolioPage = ({ match }) => {
  const { params } = match;
  const { _id } = params;
  return (
    <Query query={GET_PORTFOLIO} variables={{ _id }}>
      {({ loading, error, data }) => {
        if (loading) return <Spinner />;
        if (error) return `Error!: ${error}`;
        const { portfolio } = data;
        return (
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="headline" color="primary">
                {`Portfolio: ${portfolio.name}`}
              </Typography>
              <Divider />
            </Grid>
          </Grid>
        );
      }}
    </Query>
  );
};

const GET_PORTFOLIO = gql`
  query portfolio($_id: String!) {
    portfolio(_id: $_id) {
      name
    }
  }
`;

export default withRouter(PortfolioPage);
