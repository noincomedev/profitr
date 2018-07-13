import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { PropTypes } from "prop-types";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Switch from "@material-ui/core/Switch";

const PrivateItem = ({ checked, stock, portfolioId, togglePortfolioStock }) => {
  const handleChange = event => {
    togglePortfolioStock({
      variables: {
        _id: portfolioId,
        stockId: stock._id,
        state: event.target.checked
      }
    }).catch(error => console.log(error));
  };

  return (
    <ListItem dense divider key={stock._id}>
      <ListItemText primary={stock.name} />
      <Switch
        id={stock._id}
        checked={checked}
        onChange={handleChange}
        value={stock.name}
      />
    </ListItem>
  );
};

PrivateItem.propTypes = {
  portfolioId: PropTypes.string.isRequired,
  stock: PropTypes.object.isRequired
};

const TOGGLE_PORTFOLIO_STOCK = gql`
  mutation togglePortfolioStock(
    $_id: String!
    $stockId: String!
    $state: Boolean!
  ) {
    togglePortfolioStock(_id: $_id, stockId: $stockId, state: $state) {
      _id
    }
  }
`;

export default graphql(TOGGLE_PORTFOLIO_STOCK, {
  name: "togglePortfolioStock",
  options: {
    refetchQueries: ["portfolios"],
    variables: { owner: Meteor.userId() }
  }
})(PrivateItem);
