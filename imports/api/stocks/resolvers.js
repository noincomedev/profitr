import Stocks from "./Stocks";

export default {
  Query: {
    stocks(obj, args, { userId }) {
      return Stocks.find({}).fetch();
    }
  }
};
