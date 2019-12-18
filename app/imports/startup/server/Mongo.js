
import { Meteor } from 'meteor/meteor';
import { Musicians } from '../../api/musician/Musician.js';
import { Events } from '../../api/event/Event.js';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
/** function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.insert(data);
} */

/** Initialize the collection if empty. */
/** if (Stuffs.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
} */

function addMusician(data) {
  console.log(`  Adding: ${data.firstName} (${data.owner})`);
  Musicians.insert(data);
}

/** Initialize the collection if empty. */
if (Musicians.find().count() === 0) {
  if (Meteor.settings.defaultMusicians) {
    console.log('Creating default musicians.');
    Meteor.settings.defaultMusicians.map(data => addMusician(data));
  }
}

function addEvent(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Events.insert(data);
}

/** Initialize the collection if empty. */
if (Events.find().count() === 0) {
  if (Meteor.settings.defaultEvents) {
    console.log('Creating default events.');
    Meteor.settings.defaultEvents.map(data => addEvent(data));
  }
}
