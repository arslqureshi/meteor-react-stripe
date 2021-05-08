import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import DatePicker from '../../controls/DatePicker';
import Checkbox from '../../controls/Checkbox';
import RadioGroup from '../../controls/RadioGroup';
import Input from '../../controls/Input';
import Select from '../../controls/Select';
import Button from '../../controls/Button';
import { Grid } from '@material-ui/core';
import { useForm, Form } from '../useForm';
import * as clientServices from '../../../services/clientServices';

const filingItems = [
  {id:'S', title: 'S'},
  {id:'MFJ', title: 'MFJ'},
  {id:'MFS', title: 'MFS'},
  {id:'HH', title: 'HH'}
]

const initialFValues = {
  Cl_ID: 0,
  Cl_Adv_ID:'1',
  Cl_First_Name: '',
  Cl_Last_Name: '',
  Cl_DOB: new Date(),
  Cl_Tax_Age: '',
  Filing_Status: 'S',
  Cl_Blind: false,
  Cl_Disabled: false,
  Cl_Deaf: false,
  Sp_First_Name: '',
  Sp_Last_Name: '',
  Sp_DOB: new Date(),
  Sp_Tax_Age: '',
  Sp_Blind: false,
  Sp_Disabled: false,
  Sp_Deaf: false,
  Cl_Addr: '',
  Cl_City: '',
  Cl_State: '',
  Sp_State: '',
  Cl_Zip: '',
  Dependents: '',
  Ad_Dependents: '',
  CTC_Children: '',
  CTC_Children16: '',
  CTC_Children17: '',
  AZ_Parents: '',
  createdAt: '',
}
 
export const ClientForm = (props) => {
  const { addOrEdit, recordForEdit } = props

  const validate = ( fieldValues = values ) => {
    let temp = {...errors}
    if ('Cl_First_Name' in fieldValues)
        temp.Cl_First_Name = fieldValues.Cl_First_Name ? "" : "This field is required"
    if ('Cl_Last_Name' in fieldValues)
        temp.Cl_Last_Name = fieldValues.Cl_Last_Name ? "" : "This field is required"
    if ('Cl_State' in fieldValues)
        temp.Cl_State = fieldValues.Cl_State.length !== 0  ? "" : "This field is required"
        if (fieldValues === values)
        return Object.values(temp).every(x => x === "")
    setErrors({
        ...temp
    })
    if (fieldValues === values)
        return Object.values(temp).every(x => x === "")   
}

  const{
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
 } = useForm(initialFValues, true, validate);

  const handleSubmit = e => {
      e.preventDefault();
      if(validate())
        {
          addOrEdit(values, resetForm);
        };
      if (!values.Cl_First_Name || !values.Cl_Last_Name || !values.Cl_State) 
      return;
      console.log('createdAt=', values.createdAt, 'cl first=',values.Cl_First_Name)
          if (values.createdAt ==='') {
        const now = new Date();
        const yearNow = now.getFullYear();
        const yearBorn = values.Cl_DOB.getFullYear();
        values.Cl_Tax_Age = yearNow - yearBorn;
        const SyearBorn = values.Sp_DOB.getFullYear();
        values.Sp_Tax_Age = yearNow - SyearBorn;
        Meteor.call('clients.insert', 
        values.Cl_First_Name, 
        values.Cl_Last_Name,
        values.Cl_DOB,
        values.Cl_Tax_Age,
        values.Filing_Status,
        values.Cl_Blind,
        values.Cl_Disabled,
        values.Cl_Deaf,
        values.Sp_First_Name,
        values.Sp_Last_Name,
        values.Sp_DOB,
        values.Sp_Tax_Age,
        values.Sp_Blind,
        values.Sp_Disabled,
        values.Sp_Deaf,
        values.Cl_Addr,
        values.Cl_City,
        values.Cl_State,
        values.Sp_State,
        values.Cl_Zip,
        values.Dependents,
        values.Ad_Dependents,
        values.CTC_Children,
        values.CTC_Children16,
        values.CTC_Children17,
        values.AZ_Parents
        );
        setValues(initialFValues)}
     else {
        var clientID = values._id
        const now = new Date();
        const yearNow = now.getFullYear();
        const yearBorn = values.Cl_DOB.getFullYear();
        values.Cl_Tax_Age = yearNow - yearBorn;
        const SyearBorn = values.Sp_DOB.getFullYear();
        values.Sp_Tax_Age = yearNow - SyearBorn;
        Meteor.call('clients.update', clientID,
        values.Cl_First_Name,
        values.Cl_Last_Name,
        values.Cl_DOB,
        values.Cl_Tax_Age,
        values.Filing_Status,
        values.Cl_Blind,
        values.Cl_Disabled,
        values.Cl_Deaf,
        values.Sp_First_Name,
        values.Sp_Last_Name,
        values.Sp_DOB,
        values.Sp_Tax_Age,
        values.Sp_Blind,
        values.Sp_Disabled,
        values.Sp_Deaf,
        values.Cl_Addr,
        values.Cl_City,
        values.Cl_State,
        values.Sp_State,
        values.Cl_Zip,
        values.Dependents,
        values.Ad_Dependents,
        values.CTC_Children,
        values.CTC_Children16,
        values.CTC_Children17,
        values.AZ_Parents
        ) 
     } 
  };

  useEffect(() => {
    if(recordForEdit != null)
    setValues({
      ...recordForEdit,
        
    })    
    }, [recordForEdit]) 

  return (
    <React.Fragment>
    <Form onSubmit={handleSubmit}>         
        <Grid container>
            <Grid item xs={12}>
                <Input
                name="Cl_First_Name"
                label="Client First Name"
                value={values.Cl_First_Name}
                onChange={handleInputChange}
                error={errors.Cl_First_Name}
                />
                <Input
                name="Cl_Last_Name"
                label="Client Last Name"
                value={values.Cl_Last_Name}
                onChange={handleInputChange}
                error={errors.Cl_Last_Name}
                />
                <DatePicker
                name="Cl_DOB"
                label="Client DOB"
                value={values.Cl_DOB}
                onChange={handleInputChange}
                />
            </Grid>
            <Grid item xs={12}>
                <Checkbox
                name="Cl_Blind"
                label="Blind"
                value={values.Cl_Blind}
                onChange={handleInputChange}
                />
                { (values.Cl_State === "AR"
                || values.Cl_State === "HI"
                || values.Cl_State === "IN"
                || values.Cl_State === "MN"
                || values.Cl_State === "MO"
                || values.Cl_State === "NY"
                || values.Cl_State === "OR"
                ) ? (
                <Checkbox
                name="Cl_Disabled"
                label="Disabled"
                value={values.Cl_Disabled}
                onChange={handleInputChange}
                />) : (null)} 
                { (values.Cl_State === "AR"
                || values.Cl_State === "HI") ? (
                    <Checkbox
                    type="number"
                    name="Cl_Deaf"
                    label="Deaf"
                    value={values.Cl_Deaf}
                    onChange={handleInputChange}
                    />
                    ) : (null)}    
                <RadioGroup 
                name="Filing_Status"
                label="Filing Status"
                value={values.Filing_Status}
                onChange = {handleInputChange}
                items={filingItems}
                />
            </Grid>
            <Grid item xs={12}>
                <Select
                    name="Cl_State"
                    label="State"
                    value={values.Cl_State}
                    onChange={handleInputChange}
                    options={clientServices.getStateCollection()}
                    error={errors.Cl_State}
                    />
                    <Input
                    type="number"
                    name="Dependents"
                    label="Dependents"
                    value={values.Dependents}
                    onChange={handleInputChange}
                    />
                    { (values.Cl_State === "AZ" 
                     ) ? (
                    <Input
                    type="number"
                    name="AZ_Parents"
                    label="Qualifying Parents or Grandparents"
                    value={values.Ad_Dependents}
                    onChange={handleInputChange}
                    />
                    ) : (null)}
                    { (values.Cl_State === "IN" 
                     ) ? (
                    <Input
                    type="number"
                    name="Ad_Dependents"
                    label="Dependents who are under age 19 or FT student under 24"
                    value={values.Ad_Dependents}
                    onChange={handleInputChange}
                    />
                    ) : (null)}
                    { (values.Cl_State === "MA" 
                     ) ? (
                    <Input
                    type="number"
                    name="Ad_Dependents"
                    label="Disabled Dependents, Dependents under age 12, or Dependents over age 65"
                    value={values.Ad_Dependents}
                    onChange={handleInputChange}
                    />
                    ) : (null)}
                    { (values.Cl_State === "MI" 
                     ) ? (
                    <Input
                    type="number"
                    name="Ad_Dependents"
                    label="Exemptions who are deaf, blind, hemiplegic, paraplegic, quadriplegic or disabled"
                    value={values.Ad_Dependents}
                    onChange={handleInputChange}
                    />
                    ) : (null)}
                    { (values.Cl_State === "MT" 
                     ) ? (
                    <Input
                    type="number"
                    name="Ad_Dependents"
                    label="Dependents who are disabled"
                    value={values.Ad_Dependents}
                    onChange={handleInputChange}
                    />
                    ) : (null)}
                    { (values.Cl_State === "NJ" 
                     ) ? (
                    <Input
                    type="number"
                    name="Ad_Dependents"
                    label="Enter 1 if you or spouse is a veteran, 2 for both"
                    value={values.Ad_Dependents}
                    onChange={handleInputChange}
                    />
                    ) : (null)}
                    { (values.Cl_State === "OR" 
                     ) ? (
                    <Input
                    type="number"
                    name="Ad_Dependents"
                    label="Number of dependent children with qualifying disability"
                    value={values.Ad_Dependents}
                    onChange={handleInputChange}
                    />
                    ) : (null)}
                    <Input
                    type="number"
                    name="CTC_Children"
                    label="Children under 6 Covid Qualifying for Child Care Credit"
                    value={values.CTC_Children}
                    onChange={handleInputChange}
                    />
                    <Input
                    type="number"
                    name="CTC_Children17"
                    label="Children 6 to 17 Qualifying for Covid Child Care Credit"
                    value={values.CTC_Children17}
                    onChange={handleInputChange}
                    />
                    <Input
                    type="number"
                    name="CTC_Children16"
                    label="Children under 16 Qualifying for Old Child Care Credit"
                    value={values.CTC_Children16}
                    onChange={handleInputChange}
                    />
            </Grid>
            { (values.Filing_Status === "MFJ" || values.Filing_Status === "MFS") ? (
            <div style={{width: "100%"}}>
            <Grid item xs={12} >
                <Input
                name="Sp_First_Name"
                label="Spouse First Name"
                value={values.Sp_First_Name}
                onChange={handleInputChange}
                />
                <Input
                name="Sp_Last_Name"
                label="Spouse Last Name"
                value={values.Sp_Last_Name}
                onChange={handleInputChange}
                />
                <DatePicker
                name="Sp_DOB"
                label="Spouse DOB"
                value={values.Sp_DOB}
                onChange={handleInputChange}
                />
            </Grid>
            <Grid item xs={12}>
                <Checkbox
                name="Sp_Blind"
                label="Blind"
                value={values.Sp_Blind}
                onChange={handleInputChange}
                />
                { (values.Cl_State === "AR"
                    || values.Cl_State === "HI"
                    || values.Cl_State === "IN"
                    || values.Cl_State === "MN"
                    || values.Cl_State === "MO"
                    || values.Cl_State === "NY"
                    || values.Cl_State === "OR"
                ) ? (
                <Checkbox
                name="Sp_Disabled"
                label="Disabled"
                value={values.Sp_Disabled}
                onChange={handleInputChange}
                />) : (null)}
                { (values.Cl_State === "AR"
                ) ? (
                    <Checkbox
                    type="number"
                    name="Sp_Deaf"
                    label="Deaf"
                    value={values.Sp_Deaf}
                    onChange={handleInputChange}
                    />
                ) : (null)}
            </Grid>
            </div> 
            ) : (null)}
            <Grid item xs={12}>
                <Input
                name="Cl_Addr"
                label="Address"
                value={values.Cl_Addr}
                onChange={handleInputChange}
                />
                <Input
                name="Cl_City"
                label="City"
                value={values.Cl_City}
                onChange={handleInputChange}
                />
                <Input
                name="Cl_Zip"
                label="Zip Code"
                value={values.Cl_Zip}
                onChange={handleInputChange}
                />
                <p>
                    While you can no longer claim exemptions for dependents, you can receive a tax credit for depedents. The credit 
                    is $3,600 for children under 6, $3,000 for childern 7 to 17, and $500 for other dependents. All ages are as of year end. Enter 
                    the total number of Dependents, then the dependents from the total that qualify for the child credts. You should alse enter 
                    the number of children who are under 16 by year end. If you don't qualify for the new credits, you may still qualify for the 
                    old $2,000 credit per child. Tax Acuity will calculate the credits for you.
                    </p>
                { (values.Cl_State === "AL") ? (
                    <p>
                     Alabama allows a Dependent Exemption of between $300 and $1,000 per Dependent 
                     depending on income. A dependent is defined under Alabama law as an individual
                     other than the taxpayer and his or her spounse who received over 50% of his or 
                     support during the tax year and is also related to the taxpayer in one of the 
                     following relationships: Child, Stepchild, Legally adopted child, Parent, Grandparent 
                     Grandchild, Sibling, Stepsibling, Stepparent, Mother or Father-in-law, Sister or 
                     Brother-in-law, Son or Daughter-in-law and, if related by blood, an Uncle, Aunt, 
                     Nephew or Neice. You cannot claim a foster child, friend, cousin, yourself, or 
                     your spouse.   
                    </p>
                    ) : (null)}
                { (values.Cl_State === "CA") ? (
                    <p>
                     California allows a $383 exepmption credit for each dependent.  
                    </p>
                    ) : (null)}
                { (values.Cl_State === "DE") ? (
                    <p>
                     Delaware allows a $110 exepmption credit for each dependent.  
                    </p>
                    ) : (null)}
                { (values.Cl_State === "GA") ? (
                    <p>
                     Georgia allows a $3,000 exepmption for each dependent.  
                    </p>
                    ) : (null)}        
            </Grid>
            <Grid item xs={12}>
            <div>
                  <Button
                  type="submit"
                   text="Submit"
                   />
                   <Button
                  text="Reset"
                  color="default"
                  onClick={resetForm}
                   />
            </div>
            </Grid>
        </Grid>
    </Form>
    </React.Fragment>
)
}  
 
//   return (
//     <form className="client-form" onSubmit={handleSubmint}>
//       <input
//         type="text"
//         placeholder="Client First Name"
//         value={Cl_First_Name}
//         onChange={(e) => setCl_First_Name(e.target.value)}
//       />
 
//       <button type="submit">Add Client</button>
//     </form>
//   );
// };