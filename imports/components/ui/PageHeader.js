import React from 'react';
import { Paper, Card, Typography, makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme =>({
   root: {
     backgroundColor: '#e6faff'
   },
   pageHeader: {
       padding: theme.spacing(2),
       display: 'flex',
       marginBottom: theme.spacing(1)
   },
   pageIcon: {
       display: 'inline-block',
       padding: theme.spacing(1.5),
       color: '#0B72B9'
   },
   pageTitle: {
       paddingLeft: theme.spacing(5),
       '& .MuiTypography-subtitle2':{
           opacity:'0.6'
       }
   }
}))

export default function PageHeaer(props) {

    const classes = useStyles();
    const { title, subtitle, icon }=props;
    return (
        <Paper elevation={0} square className={classes.root}>
            <div className={classes.pageHeader}>
                <Card className={classes.pageIcon}>
                    {icon}
                </Card>
                <div className={classes.pageTitle}>
                    <Typography 
                    variant="h5"
                    component="div"
                    >
                        {title}
                    </Typography>
                    <Typography 
                    variant="subtitle1"
                    component="div"
                    >
                        {subtitle}
                    </Typography>
                </div>
                
            </div>
        </Paper>
    )
}