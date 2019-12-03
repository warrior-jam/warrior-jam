import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Musicians } from '../../api/musician/Musician';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.insert(data);
}

/** Initialize the collection if empty. */
if (Stuffs.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

/** Initialize the collection if empty. */
if (Musicians.find().count() === 0) {
  if (Meteor.settings.defaultMusicians) {
    console.log('Creating musician data.');
    Meteor.settings.defaultMusicians.map(data => addMusician(data));
  }
}

/** Initialize the database with a default data document. */
function addMusician(data) {
  console.log(`  Adding: ${data.lastName} (${data.owner})`);
  Musicians.insert(data);
}
