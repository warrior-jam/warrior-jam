import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const OpenMics = new Mongo.Collection('OpenMic');

/** Define a schema to specify the structure of each document in the collection. */
const OpenMicSchema = new SimpleSchema({
  name: String,
  location: String,
  description: String,
  website: String,
  phoneNumber: String,
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
OpenMics.attachSchema(OpenMicSchema);

/** Make the collection and schema available to other code. */
export { OpenMics, OpenMicSchema };
