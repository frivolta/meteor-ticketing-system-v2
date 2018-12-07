import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Tickets = new Mongo.Collection('Tickets');

/** Create a schema to constrain the structure of documents associated with this collection. */
const TicketSchema = new SimpleSchema({
  title: String,
  website: String,
  message: String,
  owner: String,
  status: {
    type: String,
    allowedValues: ['aperto', 'in lavorazione', 'chiuso'],
    defaultValue: 'aperto',
  },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Tickets.attachSchema(TicketSchema);

/** Make the collection and schema available to other code. */
export { Tickets, TicketSchema };
