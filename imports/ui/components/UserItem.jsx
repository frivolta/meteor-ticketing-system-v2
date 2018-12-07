import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import PublicIcon from '@material-ui/icons/Public';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserItem extends React.Component {
  handleRemoveUser = (e) =>{
    e.preventDefault();
    const deleteConfirm = confirm('Vuoi davvero eliminare questo utente?');
    if(deleteConfirm){
       Meteor.call('user.delete', {userId: this.props.user._id}, (err, res)=>{
         if (err){
          Bert.alert({ type: 'danger', message: `Rimozione fallita: ${error.message}` });
         }else{
          Bert.alert({ type: 'success', message: "L'utente è stato rimosso!" });
         }
       })
    }
  }

  render() {
    const {classes} = this.props;
    return ( 
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <FaceIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className={classes.title} gutterBottom>
            {this.props.user.emails[0].address}  
          </Typography>
          <Typography component="h2" variant="subtitle2" color="primary">
            <Chip
              avatar={
                <Avatar>
                  <PublicIcon/>
                </Avatar>
              }
              label={this.props.user._id}
              color='primary'
              variant='outlined'
            />
          </Typography>
          <Button variant="contained" color="primary" onClick={this.handleRemoveUser} className={classes.button}>
            Elimina
          </Button>
        </Paper>
      </Grid>
    );
  }
}
export default UserItem;
/** Require a document to be passed to this component. */
UserItem.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};
