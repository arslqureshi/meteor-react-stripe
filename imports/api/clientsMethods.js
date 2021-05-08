import { check } from 'meteor/check';
import { ClientsCollection } from '../db/ClientsCollection';
 
Meteor.methods({
  'clients.insert'(
    Cl_First_Name, 
    Cl_Last_Name, 
    Cl_DOB,
    Cl_Tax_Age,
    Filing_Status,
    Cl_Blind,
    Cl_Disabled,
    Cl_Deaf,
    Sp_First_Name,
    Sp_Last_Name,
    Sp_DOB,
    Sp_Tax_Age,
    Sp_Blind,
    Sp_Disabled,
    Sp_Deaf,
    Cl_Addr,
    Cl_City,
    Cl_State,
    Sp_State,
    Cl_Zip,
    Dependents,
    Ad_Dependents,
    CTC_Children,
    CTC_Children16,
    CTC_Children17,
    AZ_Parents
      ) {
    check(Cl_First_Name, String);
 
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    ClientsCollection.insert({
        Cl_First_Name,
        Cl_Last_Name,
        Cl_DOB,
        Cl_Tax_Age,
        Filing_Status,
        Cl_Blind,
        Cl_Disabled,
        Cl_Deaf,
        Sp_First_Name,
        Sp_Last_Name,
        Sp_DOB,
        Sp_Tax_Age,
        Sp_Blind,
        Sp_Disabled,
        Sp_Deaf,
        Cl_Addr,
        Cl_City,
        Cl_State,
        Sp_State,
        Cl_Zip,
        Dependents,
        Ad_Dependents,
        CTC_Children,
        CTC_Children16,
        CTC_Children17,
        AZ_Parents,
        createdAt: new Date,
        userId: this.userId,
    })
  },
 
  'clients.remove'(clientId) {
    check(clientId, String);
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    ClientsCollection.remove(clientId);
  },
 
  'clients.update'(clientId,
    Cl_First_Name,
    Cl_Last_Name,
    Cl_DOB,
    Cl_Tax_Age,
    Filing_Status,
    Cl_Blind,
    Cl_Disabled,
    Cl_Deaf,
    Sp_First_Name,
    Sp_Last_Name,
    Sp_DOB,
    Sp_Tax_Age,
    Sp_Blind,
    Sp_Disabled,
    Sp_Deaf,
    Cl_Addr,
    Cl_City,
    Cl_State,
    Sp_State,
    Cl_Zip,
    Dependents,
    Ad_Dependents,
    CTC_Children,
    CTC_Children16,
    CTC_Children17,
    AZ_Parents,
    ) {
    check(clientId, String);
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    const client = ClientsCollection.findOne({_id: clientId, userId: this.userId});
    if (!client) {
      throw new Meteor.Error('Access denied');
    }
    ClientsCollection.update(clientId, {
      $set: {
        Cl_First_Name,
        Cl_Last_Name,
        Cl_DOB,
        Cl_Tax_Age,
        Filing_Status,
        Cl_Blind,
        Cl_Disabled,
        Cl_Deaf,
        Sp_First_Name,
        Sp_Last_Name,
        Sp_DOB,
        Sp_Tax_Age,
        Sp_Blind,
        Sp_Disabled,
        Sp_Deaf,
        Cl_Addr,
        Cl_City,
        Cl_State,
        Sp_State,
        Cl_Zip,
        Dependents,
        Ad_Dependents,
        CTC_Children,
        CTC_Children16,
        CTC_Children17,
        AZ_Parents,
      },
    });
  },
});