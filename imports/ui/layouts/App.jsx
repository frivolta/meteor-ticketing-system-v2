import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import ListTicketAdmin from '../pages/ListTicketAdmin';
import AddTicket from '../pages/AddTicket';
import ListTicket from '../pages/ListTicket';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import UserList from '../pages/UserList';
import AppNavBar from '../components/AppNavBar';
import { theme } from '../jss/theme';
import { MuiThemeProvider, withTheme } from '@material-ui/core/styles';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <Router>
            <div>
              <AppNavBar positionSticky position="sticky"/>
              <Switch>
                <Route exact path="/" component={Landing}/>
                <Route path="/signin" component={Signin}/>
                <Route path="/signup" component={Signup}/>
                <Route exact path="/dashboard" component={Signin}/>
                <ProtectedRoute path="/ticket/add" component={AddTicket}/>
                <ProtectedRoute path="/ticket/list" component={ListTicket}/>
                <AdminProtectedRoute path="/admin/users/manage" component={UserList}/>
                <AdminProtectedRoute path="/admin/ticket/list" component={ListTicketAdmin}/>
                <ProtectedRoute path="/signout" component={Signout}/>
                <Route component={NotFound}/>
              </Switch>
              <Footer/>
            </div>
          </Router>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
          (<Component {...props} />) :
          (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
      );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
          return (isLogged && isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default withTheme()(App);
