import { Dialog, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Controls from '../controls/Controls'
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme =>({
    dialogWrapper : {
        padding : theme.spacing(2),
        position:'absolute',
        top: theme.spacing(5)
    },
    dialogTitle:{
        paddingRith: '0px'
    }
}))

export default function Button(props) {

    const {title, children, openPopup, setOpenPopup } = props;
    const classes = useStyles();

    return (
        <Dialog open={openPopup} maxWidth="lg" classes={{ paper :classes.dialogWrapper}}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{display: 'flex'}}>
                    <Typography variant = "h6" component="div" style={{flexGrow:1}}>
                        {title}
                    </Typography>
                    <Controls.ActionButton 
                    color="secondary"
                    onClick={() => {setOpenPopup(false)}}>
                    <CloseIcon />
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}