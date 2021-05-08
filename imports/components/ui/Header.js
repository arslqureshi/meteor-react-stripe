import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/styles';
import logo from './TaxLogo.png';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

function ElevationScroll(props) {
    const { children } = props;
    
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }

  const useStyles = makeStyles(theme => ({
      toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: "1em"
      },
      logo: {
        height: "7em" 
     },
     logoContainer: {
        padding: 0,
        paddingRight: 60,
        "&:hover": {
            backgroundColor: "Transparent"
        }
      },
     tabContainer: {
        marginRight: 'auto'
    },
    tab: {
        ...theme.typography.tab,  
        minWidth: 10,
        marginLeft: "25px"
      },
    byline: {
      marginLeft: "25px",
      color: "black",
    },
    logoutButton: {
      marginRight: "25px"
      }  
  }));

export default function Header(props) {
    const classes = useStyles()
    const [value, setValue] = useState(0);
    const handleChange = (e, value) => {
        setValue(value);
    };

    useEffect(() => {
       if (window.location.pathname === "/" && value !== 0) {setValue(0)}
      //  else if (window.location.pathname === "/plans" && value !== 1) {setValue(1)}
      //  else if (window.location.pathname === "/incomes" && value !== 2) {setValue(2)}
      //  else if (window.location.pathname === "/deductions" && value !== 3) {setValue(3)}
      //  else if (window.location.pathname === "/state" && value !== 4) {setValue(4)}
      //  else if (window.location.pathname === "/results" && value !== 5) {setValue(5)}
       else if (window.location.pathname === "/settings" && value !== 6) {setValue(6)}
       else if (window.location.pathname === "/contact" && value !== 7) {setValue(7)}
    }, [value])

    const user = useTracker(() => Meteor.user());

    const logout = () => Meteor.logout();

    return (
        <React.Fragment> 
        <ElevationScroll>
        <AppBar position="fixed">        
            <Toolbar disableGutters>
            <Button component={Link} 
                    to="/" disableRipple 
                    onClick={(() => setValue(0))} className={classes.logoContainer}>
                    <img alt="company logo" className={classes.logo} src={logo} />
            </Button>
            <h3 className={classes.byline}>Acuity [ uh-kyoo-i-tee ] - sharpness or keenness of thought, vision, or hearing
            {user.profile.trail &&
             
                <span style={{color: 'red'}}> Profile is on trail</span>
             
            }
            </h3>
            <Tabs
                value={value}
                onChange={handleChange} 
                className={classes.tabContainer}
                indicatorColor="primary"
            >
                {/* <Tab className={classes.tab} component={Link} to="/" label="Clients"/>
                <Tab className={classes.tab} component={Link} to="/plans" label="Plans"/>
                <Tab className={classes.tab} component={Link} to="/incomes" label="Income/Cash Flows"/>
                <Tab className={classes.tab} component={Link} to="/deductions" label="Deductions"/>
                <Tab className={classes.tab} component={Link} to="/state" label="State Adjusments"/>
                <Tab className={classes.tab} component={Link} to="/results" label="Results"/> */}
                <Tab className={classes.tab} component={Link} to="/settings" label="Advisor Settings"/>
                <Tab className={classes.tab} component={Link} to="/contact" label="Contact"/>
            </Tabs>
            <Button variant="contained" 
            onClick={logout} 
            className={classes.logoutButton} >{user.username} 🚪</Button>
            </Toolbar>
        </AppBar>
        </ElevationScroll>
       <div className={classes.toolbarMargin} />
       </React.Fragment>
    );
}