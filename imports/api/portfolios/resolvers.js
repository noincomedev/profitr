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
  Mutation: {
    createPortfolio(obj, { name }, { userId }) {
      if (userId) {
        const portfolioId = Portfolios.insert({
          owner: userId,
          name,
          stocks: []
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
          let { stocks } = portfolio;
          stocks.push(stockId);
          return Portfolios.update({ _id: _id }, { $set: { stocks } });
        } else {
          let { stocks } = portfolio;
          let updatedStocks = stocks.filter(stock => {
            if (stock == stockId) return false;
            else return true;
          });
          return Portfolios.update(
            { _id: _id },
            { $set: { stocks: updatedStocks } }
          );
        }
      }
      throw new Error("Unauthorized");
    }
  }
};
