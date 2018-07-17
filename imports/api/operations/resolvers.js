import Stocks from "../stocks/Stocks";
import Details from "../details/Details";

export default {
  Query: {},
  Operation: {
    result: operation => {
      const stocks = [];
      const detail = [];
      const fromDateArray = operation.from.split("-");
      const toDateArray = operation.to.split("-");

      operation.stockIds.map(_id => {
        const stock = Stocks.findOne({ _id });
        stocks.push(stock);
      });

      stocks.map(stock => {
        const resultFrom = HTTP.call(
          "GET",
          `https://api.sbif.cl/api-sbifv3/recursos_api/${stock.code}/${
            fromDateArray[0]
          }/${fromDateArray[1]}/dias/${
            fromDateArray[2]
          }?apikey=58716b4d28e0bccc6ece237cd34999f65a7f46f9&formato=json`
        );
        const resultTo = HTTP.call(
          "GET",
          `https://api.sbif.cl/api-sbifv3/recursos_api/${stock.code}/${
            toDateArray[0]
          }/${toDateArray[1]}/dias/${
            toDateArray[2]
          }?apikey=58716b4d28e0bccc6ece237cd34999f65a7f46f9&formato=json`
        );
        let priceFrom = null,
          priceTo = null;
        JSON.parse(resultFrom.content, (key, value) => {
          if (key == "Valor") priceFrom = parseInt(value.split(".").join(""));
        });
        JSON.parse(resultTo.content, (key, value) => {
          if (key == "Valor") priceTo = parseInt(value.split(".").join(""));
        });
        detail.push({
          stock: stock.name,
          profit: ((priceTo - priceFrom) / priceFrom) * 100
        });
      });

      Details.insert({
        owner: operation._id,
        description: JSON.stringify(detail)
      });

      let result = 0;
      detail.map(({ stock, profit }) => (result += profit));
      return (result / detail.length).toFixed(2);
    },
    detail: operation => {
      const detail = Details.findOne({ owner: operation._id });
      return detail.description;
    }
  },
  Mutation: {}
};
