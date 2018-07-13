import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Portfolios = new Mongo.Collection("portfolios");

Portfolios.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Portfolios.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Portfolios.schema = new SimpleSchema({
  owner: {
    type: String,
    label: "ID of the User this portfolio belongs to.",
    optional: false
  },
  status: {
    type: Boolean,
    autoValue() {
      if (this.isInsert) return true;
    }
  },
  created: {
    type: String,
    label: "The date this portfolio was created.",
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  },
  updated: {
    type: String,
    label: "The date this portfolio was last updated.",
    optional: false,
    autoValue() {
      if (this.isInsert || this.isUpdate) return new Date().toISOString();
    }
  },
  name: {
    type: String,
    label: "The name of this portfolio.",
    optional: false
  }
});

Portfolios.attachSchema(Portfolios.schema);

export default Portfolios;
