import React, { Fragment, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { ThemeProvider } from '@material-ui/core/styles';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import theme from './ui/Theme';
import Header from './ui/Header';
import { LoginForm} from './ui/LoginForm';
import Clients from './ui/client/Clients';
import {Payment} from './ui/payment/payment';




export const App= () => {
  const user = useTracker(() => Meteor.user());
  console.log(user);
  const [curClId, setCurClId] = useState('x')
  const [curLast, setCurLast] = useState('x')
  const [curFirst, setCurFirst] = useState('')
  const [curSpFirst, setCurSpFirst] = useState('x')
  const [curFS, setCurFS] = useState('x')
  const [clientFS, setClientFS] = useState('x')
  const [curST, setCurST] = useState('x')
  const [clientAge, setClientAge] = useState('x')
  const [spouseAge, setSpouseAge] = useState('x')
  const [depYoung, setDepYoung] = useState('x')
  const [depMid, setDepMid] = useState('x')
  const [depOld, setDepOld] = useState('x')
  const [depTotal, setDepTotal] = useState('x')
  const [clientPAge, setClientPAge] = useState('x')
  const [spousePAge, setSpousePAge] = useState('x')
  const [depPYoung, setDepPYoung] = useState('x')
  const [depPMid, setDepPMid] = useState('x')
  const [depPOld, setDepPOld] = useState('x')
  const [depPTotal, setDepPTotal] = useState('x')
  const [pState, setPState] = useState('x')
  const [curPlId, setCurPlId] = useState('x')
  const [curPlName, setCurPlName] = useState('x')

return (
<div>

  {user ? user.profile.subscription != null  || user.profile.trail ? (
    
  <Fragment>
  <ThemeProvider theme={theme}>
    <BrowserRouter>
     <Header />
     <Switch>
     <Route exact path="/" component={() => <Clients 
        setCurClId={setCurClId}
        setCurLast={setCurLast}
        setCurFirst={setCurFirst}
        setCurSpFirst={setCurSpFirst}
        setCurFS={setCurFS}
        setCurST={setCurST}
        setClientAge={setClientAge}
        setSpouseAge={setSpouseAge}
        setDepYoung={setDepYoung}
        setDepMid={setDepMid}
        setDepOld={setDepOld}
        setDepTotal={setDepTotal}
        />} />
       <Route exact path="/plans" component={() => <Plans 
        curClId={curClId} 
        curLast={curLast}
        curFirst={curFirst}
        curSpFirst={curSpFirst}
        curFS={curFS}
        curST={curST}
        clientAge={clientAge}
        spouseAge={spouseAge}
        depYoung={depYoung}
        depMid={depMid}
        depOld={depOld}
        depTotal={depTotal}
        setCurPlId={setCurPlId}
        setClientFS={setClientFS}
        setClientPAge={setClientPAge}
        setSpousePAge={setSpousePAge}
        setDepPYoung={setDepPYoung}
        setDepPMid={setDepPMid}
        setDepPOld={setDepPOld}
        setDepPTotal={setDepPTotal}
        setPState={setPState}
        setCurPlName={setCurPlName}
        />} />
       <Route exact path="/incomes" component={() => <Incomes 
        curLast={curLast}
        curClId={curClId}
        curFirst={curFirst}
        curSpFirst={curSpFirst}
        clientFS={clientFS}
        curST={curST}
        curPlId={curPlId}
        /> }/>
       <Route exact path="/deductions" component={() => <Deductions 
        curLast={curLast}
        curClId={curClId}
        curFirst={curFirst}
        curSpFirst={curSpFirst}
        curFS={curFS}
        curST={curST}
        curPlId={curPlId}
        /> }/>
       <Route exact path="/state" component={() => <Stateinfo 
        curLast={curLast}
        curClId={curClId}
        curClId={curClId}
        curFirst={curFirst}
        curSpFirst={curSpFirst}
        curFS={curFS}
        curST={curST}
        curPlId={curPlId}
        /> }/>
       <Route exact path="/results" component={() => <Results
       curLast={curLast}
       curFirst={curFirst}
       curSpFirst={curSpFirst}
       curClId={curClId}
       clientFS={clientFS}
       curST={curST}
       curPlId={curPlId}
       curPlName={curPlName}
       clientPAge={clientPAge}
      spousePAge={spousePAge}
      depPYoung={depPYoung}
      depPMid={depPMid}
      depPOld={depPOld}
      pState={pState}
      depPTotal={depPTotal}
        /> }/>
       <Route exact path="/settings" component={() => <div>Advisor Settings</div>}/>
       <Route exact path="/contact" component={() => <div>Contact</div>}/>
     </Switch>
    </BrowserRouter>
  </ThemeProvider>
  </Fragment>
  ) :
        <Payment />
  : (
    <LoginForm />
  )}
 
  </div>
)}
