import { Meteor } from 'meteor/meteor';
import { Tickets } from '../../api/ticket/ticket.js';

/**Expose publish */
/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('listTicket', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Tickets.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('listTicketAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Tickets.find();
  }
  return this.ready();
});




/** Expose methods */
Meteor.methods({
  'tickets.insert'({ title, website, message, status, owner }) {
    if (!this.userId) {
      throw new Meteor.Error(400, 'No user logged in');
    } else {
      Tickets.insert({ title, website, message, status, owner });
    }
  },
  'ticketsAdmin.fetch'() {
      if(!this.userId) {
        throw new Meteor.Error(400, 'No user logged in');
      } else {
        const fetchedItems = Tickets.find({}).fetch();
        return fetchedItems;
      }
  },
  'ticketsUser.fetch'() {
    if(!this.userId) {
      throw new Meteor.Error(400, 'No user logged in');
    } else {
      const username = Meteor.users.findOne(this.userId).username;
      const fetchedItems = Tickets.find({owner: username}).fetch();
      return fetchedItems;
    }
  },
  'ticketStatus.update'({id, newStatus}) {
    if(!this.userId) {
      throw new Meteor.Error(400, 'No user logged in');
    } else {
      Tickets.update({_id: id}, { $set: {status: newStatus } });
    }
  },
  'tickets.delete'({id}) {
    if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
      return Tickets.remove(id);
    }
  }
});

