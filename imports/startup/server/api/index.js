import { createApolloServer } from "meteor/apollo";
import { makeExecutableSchema } from "graphql-tools";
import merge from "lodash/merge";

import UserSchema from "../../../api/users/User.graphql";
import UserResolvers from "../../../api/users/resolvers";

import PortfolioSchema from "../../../api/portfolios/Portfolio.graphql";
import PortfolioResolvers from "../../../api/portfolios/resolvers";

import StockSchema from "../../../api/stocks/Stock.graphql";
import StockResolvers from "../../../api/stocks/resolvers";

const typeDefs = [UserSchema, PortfolioSchema, StockSchema];

const resolvers = merge(UserResolvers, PortfolioResolvers, StockResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

createApolloServer({ schema });
