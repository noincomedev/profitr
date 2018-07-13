import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";

import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import Typography from "@material-ui/core/Typography";

import PrivateStockItem from "../components/stock/list/PrivateItem";

import Spinner from "../components/utils/Spinner";

const PortfolioPage = ({ match }) => {
  const { params } = match;
  const { _id } = params;
  return (
    <Query
      query={GET_PORTFOLIO_AND_STOCKS}
      variables={{ _id }}
      pollInterval={500}
    >
      {({ loading, error, data }) => {
        if (loading) return <Spinner />;
        if (error) return `Error!: ${error}`;
        const { portfolio, stocks } = data;
        const getChecked = _id => {
          const { stocks } = portfolio;
          return stocks.includes(_id);
        };
        return (
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="headline" color="primary">
                {`Portfolio: ${portfolio.name}`}
              </Typography>
              <Divider />
              <List
                component="nav"
                subheader={
                  <ListSubheader component="div">
                    Available Stocks
                  </ListSubheader>
                }
              >
                {stocks.map(stock => (
                  <PrivateStockItem
                    checked={getChecked(stock._id)}
                    portfolioId={portfolio._id}
                    stock={stock}
                    key={stock._id}
                  />
                ))}
              </List>
            </Grid>
          </Grid>
        );
      }}
    </Query>
  );
};

const GET_PORTFOLIO_AND_STOCKS = gql`
  query portfolio($_id: String!) {
    portfolio(_id: $_id) {
      _id
      name
      stocks
    }
    stocks {
      _id
      name
      code
      symbol
    }
  }
`;

export default withRouter(PortfolioPage);
