import { Meteor } from "meteor/meteor";

import "./api";

// import Stocks from "../../api/stocks/Stocks";

Meteor.startup(() => {
  console.log("server started");
  // Stocks.insert({ name: "US Dollar", symbol: "$", code: "USD" });
  // Stocks.insert({ name: "Euro", symbol: "€", code: "EUR" });
  // Stocks.insert({ name: "Unidad de Fomento", symbol: "cl$", code: "UF" });
});
