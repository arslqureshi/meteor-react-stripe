import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const useStyles = makeStyles(theme => ({
    payment: {
        marginTop: '30vh'
    },
    btn: {
        marginTop: '30px',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
    card: {
        padding: '20px',
    },
    backdrop: {
        zIndex: '99'
    },
    error: {
        color: 'red',

    }
}))

export const Payment = () => {
    const classes = useStyles();
    const stripe = useStripe();
    const elements = useElements();
    const user = Meteor.user();
    const [loading, setLoading] = React.useState(false);
    const [snackbar, setSnackbar] = React.useState(false);
    const [priceId, setPriceId] = React.useState('price_1ImgZtCnmiB4RCbV5ElrFeRz');


    const handleSubmit = async  e => {
        e.preventDefault();
        console.log(user);
        setLoading(true);
        let customer_id;
        const cardElement = elements.getElement(CardElement);
        await Meteor.call('createCustomer', user.emails[0].address, (error, res) => {
            customer_id = res
            console.log(customer_id);
            stripe
            .createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: {
                    name: user.username,
                },
            })
            .then((result) => {
            if (result.error) {
                setLoading(false);
                displayError(result);
            } else {
                console.log(result);
                createSubscription({
                    customerId: customer_id,
                    paymentMethodId: result.paymentMethod.id,
                    priceId: priceId,
                });
            }
            });
        
        });
        
    }
    const createSubscription = ({ customerId, paymentMethodId, priceId }) => {
        const data = { customerId, paymentMethodId, priceId }
        Meteor.call('createSubscription', data, (error, res) => {
            if(!error) {
                setLoading(false);
                setSnackbar(true);
            }
        });
    }

    function displayError(event) {
        let displayError = document.getElementById('card-element-errors');
        if (event.error) {
          displayError.textContent = event.error.message;
        } else {
          displayError.textContent = '';
        }
      }

      const handlePriceIdChange = e => {
        setPriceId(e.target.value);
      }

  return (
    <form onSubmit={handleSubmit} className={classes.payment}>
        <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={snackbar}
            autoHideDuration={4000}
            message="Payment Successfull"
            variant="filled"
        />
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            >
            <Grid item xs={12} sm={10} lg={5}>
                <Card className={classes.card}>
                    <CardContent>
                    <Typography  color="textPrimary" gutterBottom>
                        Subscribe To Tax Acuity
                    </Typography>
                        <CardElement
                                className={classes.card}
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#424770',
                                            '::placeholder': {
                                            color: '#aab7c4',
                                            },
                                        },
                                        invalid: {
                                            color: '#9e2146',
                                        },
                                    },
                                }}
                            />

                    <FormControl component="fieldset">
                        <FormLabel component="legend">Plan</FormLabel>
                        <RadioGroup aria-label="gender" name="plan" value={priceId} onChange={handlePriceIdChange}>
                            <FormControlLabel value="price_1ImgZtCnmiB4RCbV5ElrFeRz" control={<Radio />} label="Plan 1" />
                            <FormControlLabel value="price_1ImgZtCnmiB4RCbV5ElrFeRy" control={<Radio />} label="Plan 2" />
                        </RadioGroup>
                    </FormControl>
                    <Typography id="card-element-errors" className={classes.error} role="alert" color="textPrimary" gutterBottom></Typography>

                    </CardContent>
                    <CardActions>
                        <button type="submit" className={classes.btn}>subscribe</button>
                    </CardActions>
                </Card>
                
            </Grid>
        </Grid>
  </ form >
        // <button onClick={handleSubmit}>asd</button>
  );
};