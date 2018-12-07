import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import UserItem from '../components/UserItem';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from '../jss/userItem';
import Grid from '@material-ui/core/Grid';


/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserList extends React.Component {
  
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
      const { classes } = this.props;
      return (
        <main className={classes.main}>
          <Grid container spacing={24}>
            {this.props.users.map((user)=>(<UserItem key={user._id} user={user} classes={classes}/>))}
          </Grid>
        </main>
    );
  }
}

/** Require an array of Stuff documents in the props. */
UserList.propTypes = {
  users: PropTypes.array.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('listUsers');
  return {
    users: Meteor.users.find({}, {}).fetch(),
    ready: subscription.ready(),
  };
})(withStyles(styles)(UserList));

