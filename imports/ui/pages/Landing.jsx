import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import { styles } from '../jss/landing/landing';
import Typography from '@material-ui/core/Typography';

import '../scss/main.scss'

class Landing extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <div className="intro-text">
              <div className="logo">
                <img src="/images/filipporivolta-logo-blue.svg" alt="filippo rivolta logo" className={classes.logo}/>
              </div>
              <h1 className="intro-text--gradient intro-text--display"> Come ricevere supporto</h1>
              <Typography variant="h5" className={classes.bodyText} gutterBottom>Effettua il login e fai click su "Nuovo Ticket" nella barra del menù. Una volta creato il ticket verrai notificato via mail appena verrà preso in carico. Se non disponi di credenziali di accesso, richiedile all'amministratore del tuo sito web.</Typography>
              <Link to='/dashboard'>
              <Button className={classes.button}>
                  EFFETTUA IL LOGIN
              </Button>
              </Link>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Landing);
