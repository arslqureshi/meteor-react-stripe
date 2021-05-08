import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
    root: {
        top: theme.spacing(16)
    }
}))

export default function Notifications(props) {

    const { notify, setNotify } = props;
    const classes = useStyles()

    const handleClose = (event, reason) =>{
        if (reason === 'clickaway'){
          return;  
        }
        setNotify({
            ...notify,
            isOpen: false
        })
    }

    return (
        <Snackbar
        className={classes.root}
        open={notify.isOpen}
        autoHideDuration={2000}
        anchorOrigin={{vertical: 'top', horizontal:'right'}}
        onClose = {handleClose}
        >
            <Alert 
            severity={notify.type} 
            onClose={handleClose}
            >
                {notify.message}
            </Alert>
        </Snackbar>
    )
}