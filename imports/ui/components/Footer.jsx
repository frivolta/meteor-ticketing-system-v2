import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import footerStyles from '../jss/footer';
import IconFavorite from '@material-ui/icons/Favorite';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const { classes } = this.props;
    const divStyle = { paddingTop: '15px' };
    return (
        <footer className={classes.footer}>
         {<IconFavorite className={classes.icon}/>}
         <a href="https://www.filipporivolta.com" className={classes.link}>Made with love © Filippo Rivolta 2018</a>
        </footer>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(footerStyles)(Footer);

