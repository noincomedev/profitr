import React from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const PrivateItem = ({ portfolio }) => (
  <ListItem
    dense
    button
    component={Link}
    to={`/portfolios/${portfolio._id}`}
    divider
  >
    <ListItemText primary={portfolio.name} />
  </ListItem>
);

PrivateItem.propTypes = {
  portfolio: PropTypes.object.isRequired
};

export default PrivateItem;
