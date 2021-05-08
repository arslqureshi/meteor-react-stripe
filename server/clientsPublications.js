import { Meteor } from 'meteor/meteor';
import { ClientsCollection } from '../imports/db/ClientsCollection';

Meteor.publish('clients', function publishClients() {
  return ClientsCollection.find({ userId: this.userId });
});