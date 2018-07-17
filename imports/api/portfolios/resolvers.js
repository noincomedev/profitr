import Operations from "../operations/Operations";
import Portfolios from "./Portfolios";

export default {
  Query: {
    portfolio(obj, args, { userId }) {
      return Portfolios.findOne({ _id: args._id, owner: userId });
    },
    portfolios(obj, args, { userId }) {
      return Portfolios.find({ owner: userId }).fetch();
    }
  },
  Portfolio: {},
  Mutation: {
    createPortfolio(obj, { name }, { userId }) {
      if (userId) {
        const portfolioId = Portfolios.insert({
          owner: userId,
          name,
          stockIds: []
        });
        return portfolioId;
      }
      throw new Error("Unauthorized");
    },
    togglePortfolioStock(obj, args, { userId }) {
      const { _id, stockId, state } = args;
      if (userId) {
        const portfolio = Portfolios.findOne({ _id, owner: userId });
        if (state) {
          let { stockIds } = portfolio;
          stockIds.push(stockId);
          return Portfolios.update({ _id }, { $set: { stockIds } });
        } else {
          let { stockIds } = portfolio;
          let updatedStocks = stockIds.filter(stock => {
            if (stock == stockId) return false;
            else return true;
          });
          return Portfolios.update(
            { _id },
            { $set: { stockIds: updatedStocks } }
          );
        }
      }
      throw new Error("Unauthorized");
    },
    profit(obj, args, { userId }) {
      const { owner, stockIds, from, to } = args;
      if (userId) {
        const _id = Operations.insert({
          owner,
          stockIds,
          from,
          to
        });
        return Operations.findOne({ _id });
      }
      throw new Error("Unauthorized");
    }
  }
};
