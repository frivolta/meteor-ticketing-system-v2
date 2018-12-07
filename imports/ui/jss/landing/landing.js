export const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit*2
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    background: 'linear-gradient(45deg, #1769aa 30%, #4dabf5 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    marginTop: theme.spacing.unit*3
  },
  logo:{
    maxWidth: '75px',
  },
  bodyText:{
    fontSize:'16px'
  }
});