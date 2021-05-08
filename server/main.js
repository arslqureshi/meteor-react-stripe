import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { Accounts } from 'meteor/accounts-base';
// import ClientsCollection from '../imports/db/ClientsCollection';
import '../imports/api/clientsMethods';
import './clientsPublications';
// import { PlansCollection } from '../imports/db/PlansCollection';
const stripe = require('stripe')('sk_test_51ImgZ1CnmiB4RCbV6LzlaxkSPcenqI7JiPukqR5NJH5UU5qAfZIk3tyCYz0YEVIYshECwYKlGQRJXweGXs81ZpDz00BEm872Zb');



// const insertClient = (clientText, user) =>
//   ClientsCollection.insert({
//     text: clientText,
//     userId: user._id,
//     createdAt: new Date(),
//   });

//   const insertPlan = (planText, user) =>
//   PlansCollection.insert({
//     Pl_Name: planText,
//     userId: user._id,
//     createdAt: new Date(),
//   });

//   const insertIncome = (incomeText, user) =>
//   IncomesCollection.insert({
//     Income_Type: incomeText,
//     userId: user._id,
//     createdAt: new Date(),
//   });

//   const insertDeduction = (deductionText, user) =>
//   DeductionsCollection.insert({
//     Deduction_Type: deductionText,
//     userId: user._id,
//     createdAt: new Date(),
//   });

//   const insertStateinfo = (stateinfoText, user) =>
//   StateinfoCollection.insert({
//     St_Type: stateinfoText,
//     userId: user._id,
//     createdAt: new Date(),
//   });

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';
let currentUserId = '';


Meteor.startup(() => {
    if (!Accounts.findUserByUsername(SEED_USERNAME)) {
        Accounts.createUser({
          username: SEED_USERNAME,
          password: SEED_PASSWORD,
        });
      }

      setInterval(async () => {
        const startDate = new Date(new Date().setHours(0, 0, 0));
        const endDate = new Date(new Date().setHours(23, 59, 59));
        const user = await Meteor.users.find({
          expiryDate: {
            $gt: startDate,
            $lt: endDate
          }
        });
        user.forEach(user => {
          user.profile.trail = false;
          Meteor.users.update(user._id, {$set: {profile: user.profile}});
        })
      }, 1000 * 60 * 60 * 24)


WebApp.connectHandlers.use('/webhook', function(req, res, next) {
  // console.log(req);
  let body = '';
  req.on('data', Meteor.bindEnvironment(data => {
    body += data;
  }));
  req.on('end', Meteor.bindEnvironment(() => {
    res.writeHead(200);
    res.end(`Hello world from: ${Meteor.release}`);
    const event = JSON.parse(body);
    // console.log(event);
    switch (event.type) {
      case 'payment_intent.payment_failed':
        const customerId = event.data.object.customer;
        Meteor.call('paymentFailed', customerId);
        break;
      case 'customer.subscription.deleted':
        
        break;
      case 'checkout.session.completed':
        
        break;
      case 'customer.created':
        currentUserId = event.data.object.id;
        break;
      case 'customer.subscription.updated':
        
        break;
      default:
        break;
    }
  }));
});
      

// const user = Accounts.findUserByUsername(SEED_USERNAME);

//   if (StateinfoCollection.find().count() === 0) {
//     [
//       'xxxFirstDedType',
//       'xxxSecondDedType',
//     ].forEach(stateinfoText => insertStateinfo(stateinfoText, user));
//   }
  Meteor.methods({
    async signup(data) {
      const date = new Date();
      const expiryDate = await new Date(date.getTime() + (10 * 24 * 60 * 60 * 1000));
      console.log(expiryDate);
      await Accounts.createUser({
        username: data.NewUsername,
        email: data.email,
        password: data.Newpassword,
        profile: {
          subscription: null,
          customerId: null,
          trail: true,
        },
        trailExpiryDate: expiryDate,
      })
    },
    async createCustomer(email) {
      const customer = await stripe.customers.create({
        email: email
      })
      console.log(customer.id);
      return customer.id;
    },
    async createSubscription(data) {
      console.log(data);
      try {
        await stripe.paymentMethods.attach(data.paymentMethodId, {
          customer: data.customerId,
        });
      } catch (error) {
        return error;
      }
    
      // Change the default invoice settings on the customer to the new payment method
      await stripe.customers.update(
        data.customerId,
        {
          invoice_settings: {
            default_payment_method: data.paymentMethodId,
          },
        }
      );
    
      // Create the subscription
      const subscription = await stripe.subscriptions.create({
        customer: data.customerId,
        items: [{ price: data.priceId }],
      });
      Meteor.call('updateUser', subscription)
    },
    updateUser(data) {
      console.log(data);
      let user = Meteor.user();
      console.log(user);
      user.profile.subscription = data.id;
      user.profile.customerId = data.customer;
      const newUser = Meteor.users.findOne({_id: user._id});
      Meteor.users.update(newUser._id, {$set: {profile: user.profile}});
      console.log(Meteor.user());
    },
    async paymentFailed(data) {
      const newUser = await Meteor.users.findOne({customerId: data});
      if(newUser != undefined) {
        newUser.profile.subscription = '';
        await Meteor.users.update(newUser._id, {$set: {profile: newUser.profile}});
        console.log(newUser);
      } else {
        console.log('user not found');
      }
    },
  })

});


