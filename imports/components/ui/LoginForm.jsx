import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';


export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [NewUsername, setNewUsername] = useState('');
  const [Newpassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');

  const submit = e => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password);
  };

  const signup = e => {
    e.preventDefault();
    Meteor.call('signup', {NewUsername, email, Newpassword}, (error, res) => {
      Meteor.loginWithPassword(NewUsername, Newpassword);
    });
  }


  return (
    <React.Fragment>
    <form onSubmit={submit} className="login-form">
      <h3>Tax Acuity</h3>
      <h4>METEORITE password</h4>
      <label htmlFor="username">Username</label>
      
      <input
        type="text"
        placeholder="Username"
        name="username"
        required
        onChange={e => setUsername(e.target.value)}
      />

      <label htmlFor="password">Password</label>

      <input
        type="password"
        placeholder="Password"
        name="password"
        required
        onChange={e => setPassword(e.target.value)}
      />

      <button type="submit">Log In</button>
    </form>





    <form onSubmit={signup} className="login-form">
    <h3>Signup</h3>

    <label htmlFor="email">Email</label>

    <input
      type="text"
      placeholder="Email"
      name="email"
      required
      onChange={e => setEmail(e.target.value)}
    />

    <label htmlFor="username">Username</label>
    <input
      type="text"
      placeholder="Username"
      name="username"
      required
      onChange={e => setNewUsername(e.target.value)}
    />

    <label htmlFor="password">Password</label>

    <input
      type="password"
      placeholder="Password"
      name="password"
      required
      onChange={e => setNewPassword(e.target.value)}
    />
    <button type="submit">Register</button>
  </form>
  </ React.Fragment >
  );
};