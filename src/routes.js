import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Search from './components/Search';
// import Results from './components/Results';

export default (
  <Switch>
    <Route exact path='/' component={ Search } />
    {/* <Route path='/results' component={ Results } /> */}
  </Switch>
);