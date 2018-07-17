import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Operations = new Mongo.Collection("operations");

Operations.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Operations.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Operations.schema = new SimpleSchema({
  owner: {
    type: String,
    label: "The _id of portfolio generated this operation"
  },
  created: {
    type: String,
    label: "The date this profit was created.",
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  },
  stockIds: { type: Array },
  "stockIds.$": {
    type: String
  },
  from: {
    type: String,
    optional: false
  },
  to: {
    type: String,
    optional: false
  }
});

Operations.attachSchema(Operations.schema);

export default Operations;
