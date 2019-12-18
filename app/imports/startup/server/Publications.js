import { Meteor } from 'meteor/meteor';
import { Musicians } from '../../api/musician/Musician';
import { Events } from '../../api/event/Event';
import { OpenMics } from '../../api/openmic/OpenMic';

/** This subscription publishes only the documents associated with the logged in user */
/** Meteor.publish('Stuff', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.find({ owner: username });
  }
  return this.ready();
}); */

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
/** Meteor.publish('StuffAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.find();
  }
  return this.ready();
}); */

Meteor.publish('Musician', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Musicians.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish('Musician2', function publish() {
  if (this.userId) {
    return Musicians.find();
  }
  return this.ready();
});

Meteor.publish('Events', function publish() {
  if (this.userId) {
    return Events.find();
  }
  return this.ready();
});

Meteor.publish('OpenMic', function publish() {
  if (this.userId) {
    return OpenMics.find();
  }
  return this.ready();
});
