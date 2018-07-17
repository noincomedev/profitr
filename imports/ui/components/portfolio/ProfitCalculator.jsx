import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import Spinner from "../utils/Spinner";

const styles = theme => ({
  simulateButton: {
    backgroundColor: theme.palette.primary.dark,
    "&:hover": {
      backgroundColor: theme.palette.custom.error,
      color: theme.palette.common.black
    }
  },
  positiveProfit: {
    color: theme.palette.secondary.main
  },
  negativeProfit: {
    color: "#d45753"
  }
});

class ProfitCalculator extends Component {
  state = {
    from: moment(new Date()).format("YYYY-MM-DD"),
    to: moment(new Date()).format("YYYY-MM-DD"),
    result: null,
    detail: null
  };

  handleChange = event => {
    const name = event.target.id,
      value = event.target.value;
    this.setState({ [name]: value });
  };

  render() {
    const { classes, portfolio } = this.props;
    const { from, to } = this.state;
    const isWeekendDay = day => {
      switch (moment(day).format("dddd")) {
        case "Sunday":
          return true;
        case "Saturday":
          return true;
        default:
          return false;
      }
    };
    const renderDetail = detail =>
      detail.map((item, index) => (
        <Typography
          key={index}
          variant="subheading"
          color="primary"
          align="center"
        >
          {item.stock} : {item.profit.toFixed(2)}%
        </Typography>
      ));
    return (
      <Mutation mutation={PROFIT}>
        {(profit, { data, loading }) => (
          <form
            onSubmit={event => {
              event.preventDefault();
              const { _id, stockIds } = portfolio;
              if (isWeekendDay(from) || isWeekendDay(to)) {
                Bert.alert({
                  title: "Error",
                  message:
                    "Market is closed on weekend days! Choose another date",
                  type: "warning",
                  style: "growl-top-right",
                  icon: "fa-warning"
                });
              } else {
                profit({
                  variables: { from, to, stockIds, owner: _id }
                });
              }
            }}
          >
            <Grid container alignItems="center" direction="column">
              <div style={{ display: "inline-flex", marginTop: 16 }}>
                <TextField
                  id="from"
                  label="From"
                  type="date"
                  value={from}
                  onChange={this.handleChange}
                  className={classes.textField}
                  InputLabelProps={{ shrink: true }}
                />
                <Typography
                  style={{ margin: 16 }}
                  variant="subheading"
                  color="inherit"
                >
                  and
                </Typography>
                <TextField
                  id="to"
                  label="To"
                  type="date"
                  value={to}
                  onChange={this.handleChange}
                  className={classes.textField}
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              {loading ? (
                <Spinner />
              ) : (
                <Button
                  classes={{ containedPrimary: classes.simulateButton }}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  {data ? "Calculate Again" : "PROFIT!"}
                </Button>
              )}
              {data &&
                data.profit && (
                  <Grid container justify="center" direction="column">
                    <Typography
                      variant="title"
                      align="center"
                      style={{ marginTop: 16 }}
                    >
                      Average Profitability
                    </Typography>
                    <Typography
                      align="center"
                      variant="display3"
                      classes={{
                        display3:
                          data.profit.result > 0
                            ? classes.positiveProfit
                            : classes.negativeProfit
                      }}
                    >
                      {data.profit.result}%
                    </Typography>
                    {renderDetail(JSON.parse(data.profit.detail))}
                  </Grid>
                )}
            </Grid>
          </form>
        )}
      </Mutation>
    );
  }
}

const PROFIT = gql`
  mutation profit(
    $owner: String!
    $from: String!
    $to: String!
    $stockIds: [String]
  ) {
    profit(owner: $owner, from: $from, to: $to, stockIds: $stockIds) {
      _id
      result
      detail
    }
  }
`;

export default withStyles(styles)(ProfitCalculator);
