import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import Dashboard from '../table/Dashboard';
import Detail from '../table/Detail'

const Routes = () => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/detail" component={Detail} />
      </Switch>
    </section>
  );
};

export default Routes;
