const footerStyles = theme => ({
  footer:{
    color: theme.palette.primary.light,
    display: 'flex',
    flexDirection: 'column',
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.unit * 10,
    marginBottom: theme.spacing.unit * 10
  },
  link: {
    color: theme.palette.primary.light
  },
  icon: {
    marginBottom: theme.spacing.unit
  }
});
export default footerStyles;