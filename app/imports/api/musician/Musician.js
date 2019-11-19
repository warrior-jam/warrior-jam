import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Musicians = new Mongo.Collection('Musicians');

/** Define a schema to specify the structure of each document in the collection. */
const MusicianSchema = new SimpleSchema({
  name: String,
  instrument: String,
  genre: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Musicians.attachSchema(MusicianSchema);

/** Make the collection and schema available to other code. */
export { Musicians, MusicianSchema };
