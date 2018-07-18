import { Meteor } from "meteor/meteor";

import "./api";

import Stocks from "../../api/stocks/Stocks";

Meteor.startup(() => {
  Accounts.createUser({
    email: "guest@noincomedev.me",
    password: "noincomedev.me"
  });
  Stocks.insert({ name: "US Dollar", symbol: "$", code: "dolar" });
  Stocks.insert({ name: "Euro", symbol: "€", code: "euro" });
  Stocks.insert({ name: "Unidad de Fomento", symbol: "cl$", code: "uf" });
});
