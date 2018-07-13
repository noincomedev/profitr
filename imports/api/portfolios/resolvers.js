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
        const portfolioId = Portfolios.insert({ owner: userId, name });
        return portfolioId;
      }
      throw new Error("Unauthorized");
    }
  }
};
