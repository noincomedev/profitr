import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Stocks = new Mongo.Collection("stocks");

Stocks.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Stocks.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Stocks.schema = new SimpleSchema({
  created: {
    type: String,
    label: "The date this portfolio was created.",
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  },
  name: {
    type: String,
    label: "The name of this stock.",
    optional: false
  },
  code: {
    type: String,
    label: "The code of this stock.",
    optional: false
  },
  symbol: {
    type: String,
    label: "The symbol of this stock.",
    optional: false
  }
});

Stocks.attachSchema(Stocks.schema);

export default Stocks;
