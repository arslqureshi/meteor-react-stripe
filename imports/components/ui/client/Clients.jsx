import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { ClientsCollection } from '../../../db/ClientsCollection';
import { ClientForm } from './ClientForm';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import PageHeader from '../PageHeader';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from './useTable';
import Controls from '../../controls/Controls';
import Input from '../../controls/Input';
import ConfirmDialog from '../../controls/ConfirmDialog';
import Notification from '../../controls/Notification';
import Popup from '../../controls/Popup';
import AddIcon from '@material-ui/icons/Add';
import Search from '@material-ui/icons/Search';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  pageContent:{
    margin:theme.spacing(1),
    padding: theme.spacing(1)
  },
  searchInput:{
    width: '75%'
  },
  newButton: {
    position: 'absolute',
    right: '10px'
  },
}))

const headCells = [
  { id:'Cl_Last_Name', label: 'Client Last Name'},
  { id:'Cl_First_Name', label: 'Client First Name'},
  { id:'Sp_First_Name', label: 'Spouse First Name'},
  { id:'Filing_Status', label: 'Filing Status', disableSorting: true },
  { id:'Cl_State', label: 'State'},
  { id: 'actions', label: 'Actions', disableSorting: true },
  { id: 'Plans', label: 'Client Plans', disableSorting: true }
]


export default function Clients({setCurClId, setCurLast, setCurFirst, setCurSpFirst, setCurFS, setCurST, setClientAge,
      setSpouseAge, setDepYoung, setDepMid, setDepOld, setDepTotal }) {

  const onPlanClick=(curclid)=>{
    setCurClId(curclid)
  }

  const onPlanClickL=(curlast)=>{
    setCurLast(curlast)
  }

  const onPlanClickF=(curfirst)=>{
    setCurFirst(curfirst)
  }

  const onPlanClickS=(curspfirst)=>{
    setCurSpFirst(curspfirst)
  }

  const onPlanClickFS=(curfs)=>{
    setCurFS(curfs)
  }
  
  const onPlanClickST=(curstate)=>{
    setCurST(curstate)
  }

  const onPlanClickCA=(clientAge)=>{
    setClientAge(clientAge)
  }

  const onPlanClickSA=(spouseAge)=>{
    setSpouseAge(spouseAge)
  }

  const onPlanClickDY=(depYoung)=>{
    setDepYoung(depYoung)
  }

  const onPlanClickDM=(depMid)=>{
    setDepMid(depMid)
  }

  const onPlanClickDO=(depOld)=>{
    setDepOld(depOld)
  }

  const onPlanClickDT=(depTotal)=>{
    setDepTotal(depTotal)
  }

  const [filterFn, setFilterFn] = useState({fn:items => { return items; } })

  const classes = useStyles();

  const [openPopup, setOpenPopup] = useState(false)
  const [recordForEdit, setRecordForEdit ] = useState(null)
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
  const[confirmDialog, setConfirmDialog] = useState({isOpen:false, title:'', subTitle:''})  
  

  const user = useTracker(() => Meteor.user());

  const [hideCompleted, setHideCompleted] = useState(false);

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const toggleChecked = ({ _id, isChecked}) => 
      Meteor.call('clients.setIsChecked', _id, !isChecked);

  const { clients, isLoading } = useTracker(() => {
      const noDataAvailable = { clients: []};
      if (!Meteor.user()) {
          return noDataAvailable;
      }
      const handler = Meteor.subscribe('clients');
      if (!handler.ready()) {
        return {...noDataAvailable, isLoading: true}
      }
      const clients = ClientsCollection.find(
        hideCompleted ? pendingOnlyFilter : userFilter,
        {
          sort: { createdAt: -1 },
        }
      ).fetch();
      return { clients };
  });

  const deleteClient = ({ _id }) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen:false
    })
    Meteor.call('clients.remove', _id);
    Meteor.call('plans.removeclient', _id);
    Meteor.call('incomes.removeclient', _id);
    Meteor.call('deductions.removeclient', _id);
    Meteor.call('stateinfo.removeclient', _id);
    setNotify({
      isOpen:true,
      message:'Deleted Successfully',
      type:'error'
   })
  }

  const addOrEdit = (client, resetForm) => {
    if (setRecordForEdit === null)
    setOpenPopup(false), 
    setNotify({
      isOpen:true,
      message:'Client Added',
      type:'success'
   })
     else
     resetForm()
     setRecordForEdit(null)
     setOpenPopup(false)
     setNotify({
        isOpen:true,
        message:'Submitted Successfully',
        type:'success'
     })
   }

   const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPageingAndSorting
  }= useTable(clients, headCells, filterFn)

  const handleSearch = e =>{
    let target = e.target;
    setFilterFn({
      fn: items => {
        if(target.value === "")
          return items;
          else
          return items.filter(x => x.Cl_Last_Name.toLowerCase().includes(target.value) )
      }
    })
  }

  const openInPopup = item => {
    setRecordForEdit(item)
    setOpenPopup(true)
  }

  
  

    return (
    <React.Fragment>
     
    <PageHeader
      title="Clients"
      subtitle="Select a client to work with, or add a new client"
      icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />    
      {isLoading && <div className="loading">loading . . . </div>}
      <Paper className={classes.pageContent}> 
      <Toolbar>
          <Input
            label="Search Clients Last Name"
            className = {classes.searchInput}
              InputProps={{
              startAdornment: (<InputAdornment position="start">
                <Search />
                </InputAdornment>)
              }}
              onChange={handleSearch}
          />
          <Controls.Button
          text="Add Client"
          className = {classes.newButton}
          variant = "outlined"
          startIcon = {<AddIcon />}
          onClick = {() => { setOpenPopup(true); setRecordForEdit(null); }}
          />
        </Toolbar>
      <TblContainer> 
      <TblHead />
        <TableBody>
          { recordsAfterPageingAndSorting().map(item => (
          <TableRow key={item._id} >
            <TableCell >{item.Cl_Last_Name}</TableCell>
            <TableCell >{item.Cl_First_Name}</TableCell>
            <TableCell >{item.Sp_First_Name}</TableCell>
            <TableCell >{item.Filing_Status}</TableCell>
            <TableCell >{item.Cl_State}</TableCell>
            <TableCell>
              <Controls.ActionButton
                onClick = {() => {
                 openInPopup(item)}}
              >
                <EditOutlinedIcon color="primary" />
              </Controls.ActionButton>
              <Controls.ActionButton
                  onClick = {() => {
                    setConfirmDialog({
                      isOpen:true,
                      title:'Are you sure you want to delete this client?',
                      subTitle: 'All client data entered in plans will be deleted.',
                      onConfirm:() => {deleteClient(item)}
                    })
                  }}>
                <CloseIcon color="secondary" />
              </Controls.ActionButton>
            </TableCell>
            <TableCell>
              <NavLink to={"/plans"} 
                style={{textDecoration: 'none'}}>
                <Controls.Button
                text="Plans >"
                variant = "outlined"
                onClick={()=>{onPlanClick(item._id); 
                  onPlanClickL(item.Cl_Last_Name);
                  onPlanClickF(item.Cl_First_Name);
                  onPlanClickS(item.Sp_First_Name);
                  onPlanClickFS(item.Filing_Status);
                  onPlanClickST(item.Cl_State);
                  onPlanClickCA(item.Cl_Tax_Age);
                  onPlanClickSA(item.Sp_Tax_Age);
                  onPlanClickDY(item.CTC_Children);
                  onPlanClickDM(item.CTC_Children17);
                  onPlanClickDO(item.CTC_Children16); 
                  onPlanClickDT(item.Dependents) 
                }}
                />
                </NavLink>
              </TableCell>
          </TableRow>
          ))}  
        </TableBody>
        </TblContainer>
        <TblPagination /> 
        </Paper>
        <Popup
        title="Client Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        >
        <ClientForm
        recordForEdit = {recordForEdit}
        addOrEdit={addOrEdit}/>
      </Popup>
      <Notification
      notify={notify}
      setNotify={setNotify}
      />
      <ConfirmDialog 
      confirmDialog={confirmDialog}
      setConfirmDialog = {setConfirmDialog}
      />
    </React.Fragment>
    )
}