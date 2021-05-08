import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { App } from '../imports/components/App';
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'; 

Meteor.startup(() => {

  const stripePromise = loadStripe('pk_test_51ImgZ1CnmiB4RCbVccyVdoUwBAJ0egSKO8dJCpiU5Jtx2pp6VAraD9PhhIKCgfqs1H4ApRlqeiHmFLWwLUWE7vrt00yz4nqSmy');

  render(
    <Elements stripe = {stripePromise}>
      <App/>
    </Elements>
  , document.getElementById('react-target'));
});
