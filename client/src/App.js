import React, { Fragment } from 'react';
import './App.css';
import Login from './components/auth/Login';
import Landing from './components/layout/Landing';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => (
  <Router>
    <Fragment>
      <Landing />
    </Fragment>
  </Router>
);

export default App;
