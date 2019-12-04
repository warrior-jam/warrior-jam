import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Musicians = new Mongo.Collection('Musicians');

/** Define a schema to specify the structure of each document in the collection. */
const MusicianSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  title: { type: String, allowedValues: ['Student', 'Faculty/Staff'] },
  bio: String,
  picture: String,
  youtube: { type: String, optional: true },
  soundcloud: { type: String, optional: true },
  owner: String,
  skills: Array,
  'skills.$': { type: String, allowedValues: ['vocals', 'guitar', 'drums', 'keyboard'] },
  genres: Array,
  'genres.$': {
    type: String, allowedValues: ['jazz', 'rock', 'country', 'r&b', 'reggae', 'pop', 'soul', 'disco', 'alternative',
      'blues'],
  },
  events: { type: Array, optional: true },
  'events.$': { type: String, allowedValues: ['meet1', 'meet2', 'meet3', 'meet4'] },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Musicians.attachSchema(MusicianSchema);

/** Make the collection and schema available to other code. */
export { Musicians, MusicianSchema };
