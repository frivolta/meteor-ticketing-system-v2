export const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    title: {
        marginTop: theme.spacing.unit * 2,
        textAlign: 'center',
    },
    paper: {
        marginTop: theme.spacing.unit * 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
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
        marginTop: theme.spacing.unit *2,
        width: '100%'
    },
    chipVariant: {
        marginTop: theme.spacing.unit *3,
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
    },
});