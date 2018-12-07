import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Tickets } from '../../api/ticket/ticket';
import { styles } from '../jss/messageListing';
import withStyles from '@material-ui/core/styles/withStyles';
import TicketItem from '/imports/ui/components/TicketItem';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListTicket extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.tickets) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        {this.props.tickets.map((ticket) => <TicketItem key={ticket._id} ticket={ticket} classes={classes} />)}
      </main>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListTicket.propTypes = {
  tickets: PropTypes.array.isRequired,
  tickets: PropTypes.array,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('listTicket');
  return {
    tickets: Tickets.find({}, {sort: {status: 1}}).fetch(),
    ready: subscription.ready(),
  };
})(withStyles(styles)(ListTicket));

