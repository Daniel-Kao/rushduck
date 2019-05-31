import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import Dashboard from "../table/Dashboard";


const Routes = () => {
  return (
    <section className='container'>
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/dashboard' component={Dashboard} />
      </Switch>
    </section>
  );
};

export default Routes;
