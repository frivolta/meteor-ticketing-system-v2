import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Snackbar from '@material-ui/core/Snackbar';
import {Message} from 'semantic-ui-react';
import { styles } from '../jss/logForm';

class SignIn extends React.Component {
    /** Initialize component state with properties for login and redirection. */
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', error: '', redirectToReferer: false, snackbar:true };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    /** Update the form controls each time the user interacts with them. */
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    /** Handle Signin submission using Meteor's account mechanism. */
    handleSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        Meteor.loginWithPassword(email, password, (err) => {
            if (err) {
                this.setState({ error: err.reason });
            } else {
                this.setState({ error: '', redirectToReferer: true });
            }
        });
    }
    handleCloseSnackBar = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        const { from } = this.props.location.state || { from: { pathname: '/' } };
         // if correct authentication, redirect to page instead of login screen
        if (this.state.redirectToReferer) {
            return <Redirect to={from}/>;
        }
        // Otherwise return the Login form.
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Indirizzo email</InputLabel>
                            <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.handleChange}/>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChange}/>
                        </FormControl>
                        <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit}>
                            ESEGUI IL LOGIN
                        </Button>
                        {this.state.error === '' ? (
                  ''
              ) : (
                  <Message
                      error
                      header="Errore durante il login"
                      content={this.state.error}
                  />
              )}
                    </form>
                </Paper>
            </main>
        );
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.object,
};

export default withStyles(styles)(SignIn);