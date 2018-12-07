import React from 'react';
import { TicketSchema } from '/imports/api/ticket/ticket';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { TextField, Button } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { styles } from '../jss/logForm';
import CreateIcon from '@material-ui/icons/Create';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import MaterialUIForm from 'material-ui-form';

class AddTicket extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Ticket non inviato: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Ticket inviato' });
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { title, website, message } = data;
    const status = 'aperto';
    const owner = Meteor.user().username;
    Meteor.call('tickets.insert', { title, website, message, status, owner }, (err, res) => {
      if (err) {
        this.insertCallback(err);
      } else {
        this.insertCallback();
      }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <CreateIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Invia un nuovo ticket
          </Typography>
          <MaterialUIForm onSubmit={this.submit}>
              <TextField
                label="Titolo del ticket"
                type="text"
                name="title"
                value=""
                data-validators="isRequired"
                required
                fullWidth
                margin="normal"
              />
              <TextField
                label="www.iltuosito.it"
                type="text"
                name="website"
                value=""
                data-validators="isRequired,isURL"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Messaggio del ticket..."
                type="text"
                multiline={true}
                rows={5}
                name="message"
                value=""
                data-validators="isRequired"
                fullWidth
                margin="normal"
              />
            <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit}>
              INVIA IL TICKET
            </Button>
          </MaterialUIForm>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(AddTicket);
