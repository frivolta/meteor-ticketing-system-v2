import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Roles } from 'meteor/alanning:roles';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { withRouter, NavLink } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CreateIcon from '@material-ui/icons/Create';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import IconFace from '@material-ui/icons/Face';
import { styles } from '../jss/AppNavBar';


class AppNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            left: false,
        }
    }
    handleDrawerClick = () => {
        const newDrawerState = !this.state.drawerOpen;
        this.setState({
            ...this.state,
            drawerOpen: newDrawerState,
        })
    }

    render() {
        const { classes } = this.props;
        //Navigation Sidebar List, user must be logged in
        const sideList = (
            <div className={classes.list}>
                <List>
                    <NavLink exact to="/ticket/add" key='addTicket'>
                        <ListItem button>
                            <ListItemIcon><CreateIcon /></ListItemIcon>
                            <ListItemText primary="Nuovo Ticket" />
                        </ListItem>
                    </NavLink>
                    <NavLink exact to="/ticket/list" key='listTicket'>
                        <ListItem button>
                            <ListItemIcon><ViewListIcon /></ListItemIcon>
                            <ListItemText primary="I miei ticket" />
                        </ListItem>
                    </NavLink>
                    {/* If user is administrator*/}
                    {Roles.userIsInRole(Meteor.userId(), 'admin') ? ([
                        <NavLink exact to="/admin/ticket/list" key='adminTicketList'>
                            <ListItem button>
                                <ListItemIcon><ViewModuleIcon /></ListItemIcon>
                                <ListItemText primary="Tutti i ticket" />
                            </ListItem>
                        </NavLink>,
                        <NavLink exact to="/admin/users/manage" key='manageUsers'>
                            <ListItem button>
                                <ListItemIcon><GroupWorkIcon /></ListItemIcon>
                                <ListItemText primary="Manage Users" />
                            </ListItem>
                        </NavLink>
                    ]) : ''}

                </List>
            </div>
        );

        return (
            <div className={classes.root}>
                <Drawer open={this.state.drawerOpen} onClose={this.handleDrawerClick}>
                    <div tabIndex={0} role="button" onClick={this.handleDrawerClick} onKeyDown={this.handleDrawerClick}>
                        {sideList}
                    </div>
                </Drawer>
                <AppBar position="fixed" >
                    <Toolbar>
                    {this.props.currentUser !== '' && (
                        <IconButton className={classes.menuButton} onClick={this.handleDrawerClick} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                    )}
                    
                        <Typography variant="title" color="inherit" className={classes.grow}>UnTicket</Typography>
                    
                    {this.props.currentUser === '' ? (
                        <NavLink exact to="/signin" key='signout'>
                            <Button  variant="contained" color="secondary">Login</Button>
                        </NavLink>
                    ) : (
                        <React.Fragment>
                            <Typography variant="subtitle2" color="inherit" className={classes.userEmail}><IconFace/></Typography>
                            <NavLink exact to="/signout" key='signout'>
                                <Button variant="contained" color="secondary">Logout</Button>
                            </NavLink>
                        </React.Fragment>
                    )}
                    </Toolbar>
                </AppBar>
            </div >
        );
    }
}

AppNavBar.propTypes = {
    classes: PropTypes.object.isRequired,
    currentUser: PropTypes.string,
};

//Meteor withTracker
const AppNavBarContainer = withTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
}))(AppNavBar);
export default withRouter(withStyles(styles)(AppNavBarContainer)); 