import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

export default function ActionButton(props) {

    const useStyles = makeStyles( theme => ({
        root: {
            minWidth: 0,
            margin: theme.spacing(0.5)
        },
        secondary: {
            backgroundColor: theme.palette.secondary.light,
            '& .MuiButton-label': {
                color: theme.palette.secondary.dark
            }
        },
        primary: {
            backgroundColor: theme.palette.primary.light,
            '& .MuiButton-label': {
                color: theme.palette.primary.dark,
            }
        },
    }))

    const { color, children, onClick } = props;
    const classes = useStyles();

    return (
       <Button
            className={`${classes.root} ${classes[color]}`}
            onClick={onClick}>
           {children}
       </Button>
    )
}