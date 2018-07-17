import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Details = new Mongo.Collection("details");

Details.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Details.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Details.schema = new SimpleSchema({
  owner: {
    type: String,
    label: "The _id of operation generated this detail"
  },
  created: {
    type: String,
    label: "The date this detail was created.",
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    }
  },
  description: {
    type: String,
    optional: false
  }
});

Details.attachSchema(Details.schema);

export default Details;
