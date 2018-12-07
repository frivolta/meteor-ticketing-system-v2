export const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
    },
    title: {
        marginTop: theme.spacing.unit * 1,
        marginBottom: theme.spacing.unit *1,
        textAlign: 'center',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        marginBottom: theme.spacing.unit*2,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    ticketMessage: {
        textAlign: 'center',
    },
    select: {
        marginTop: theme.spacing.unit * 3,
        width: '100%',
        color: '#B0BEC5'
    },
    statusButton: {
        ...theme.typography.button,
        backgroundColor: theme.palette.pink,
        padding: theme.spacing.unit,
    },
    chip: {
        marginTop: theme.spacing.unit ,
        width: '100%'
    },
    message: {
        textAlign: 'center',
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
        marginTop: theme.spacing.unit * 4,
        width: '100%',
    },
   
});