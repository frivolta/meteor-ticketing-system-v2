import React from 'react';
import PropTypes from 'prop-types';
import { withRouter} from 'react-router-dom';
import { Tickets } from '../../api/ticket/ticket';
import { withTracker } from 'meteor/react-meteor-data';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MessageIcon from '@material-ui/icons/Message';
import Avatar from '@material-ui/core/Avatar';
import Select from 'react-select';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

const availableStauts = [
  'aperto',
  'in lavorazione',
  'chiuso'
];
const availableStatusForm = [
  { value: 'aperto', label: 'Aperto' },
  { value: 'in lavorazione', label: 'In Lavorazione' },
  { value: 'chiuso', label: 'Chiuso' },
  { value: 'rimuovi', label: 'Rimuovi Ticket' }
]
/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class TicketItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableStatusValue: [],
      newStatusValue: '',
      selectedOption: null,
    }
  }

  componentDidMount() {
    this.initStatus(availableStauts);
  }
  initStatus = (stat) => {
    const status = stat;
    this.setState({
      ...this.state,
      availableStatusValue: status
    });
  }
  handleRemoveItem = () => {
    const deleteConfirm = confirm('Vuoi davvero eliminare questo ticket?');
    if (deleteConfirm) {
      Meteor.call('tickets.delete', { id: this.props.ticket._id }, (err, res) => {
        if (err) {
          Bert.alert({ type: 'danger', message: `Rimozione fallita: ${error.message}` });
        } else {
          Bert.alert({ type: 'success', message: "Il ticket è stato eliminato" });
        }
      })
    }
  }
  handleStatusChange = (selectedStatus) => {
    const _id = this.props.ticket._id;
    const status = selectedStatus.value;
    console.log(status)
    if (status === 'rimuovi') {
      this.handleRemoveItem();
    } else {
      this.setState({
        ...this.state,
        selectedOption: selectedStatus
      })
      Meteor.call('ticketStatus.update', {
        id: _id,
        newStatus: status
      }, (err, res) => {
        if (err)
          Bert.alert({ type: 'danger', message: `Update fallito: ${error.message}` });
        else
          Bert.alert({ type: 'success', message: 'Update eseguito' });
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <MessageIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.title} gutterBottom>
          {this.props.ticket.title}
        </Typography>
        <Typography component="h2" variant="subtitle2" color="primary">
          <a href={this.props.ticket.website} target="_blank">{this.props.ticket.website}</a>
        </Typography>
        <Typography variant="body1" className={classes.message} gutterBottom>
          <div>{this.props.ticket.message}</div>
        </Typography>
        <Chip
          avatar={
            <Avatar>
              <FaceIcon />
            </Avatar>
          }
          label={this.props.ticket.owner}
          color='primary'
          variant='outlined'
          className={classes.chipVariant}
        />
        <Chip
          className={classes.chip}
          label={this.props.ticket.status}
          color='primary'
        />
        {Roles.userIsInRole(Meteor.userId(), 'admin') &&
          <Select
            value={this.state.selectedOption}
            onChange={this.handleStatusChange}
            placeholder="Modifica stato..."
            options={availableStatusForm}
            className={classes.select}
          />
        }
      </Paper>
    );
  }
}

/** Require a document to be passed to this component. */
TicketItem.propTypes = {
  ticket: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};
/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('listTickets');
  return {
    tickets: Tickets.find({}).fetch(),
    ready: subscription.ready(),
  };
  /** Wrap this component in withRouter since we use the <Link> React Router element. */
})(withRouter(TicketItem));

