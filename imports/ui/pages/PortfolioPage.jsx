import React, { Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";

import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import PrivateStockItem from "../components/stock/list/PrivateItem";
import ProfitCalculator from "../components/portfolio/ProfitCalculator";

import Spinner from "../components/utils/Spinner";

const styles = theme => ({
  topContainer: {
    padding: theme.spacing.unit * 3
  },
  bottomContainer: {
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing.unit * 3,
    height: "100%"
  }
});

const PortfolioPage = ({ classes, match }) => {
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
          const { stockIds } = portfolio;
          return stockIds.includes(_id);
        };
        return (
          <div style={{ height: "100%" }}>
            <Grid container classes={{ container: classes.topContainer }}>
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
            <Grid
              container
              direction="column"
              alignItems="center"
              classes={{ container: classes.bottomContainer }}
            >
              <Typography variant="headline" color="secondary">
                PROFITR
              </Typography>
              <Typography variant="subheading" color="inherit">
                Calculate your portfolio's performance between
              </Typography>
              <ProfitCalculator portfolio={portfolio} />
            </Grid>
          </div>
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
      stockIds
    }
    stocks {
      _id
      name
      code
      symbol
    }
  }
`;

export default withStyles(styles)(withRouter(PortfolioPage));
