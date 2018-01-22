import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Upload from './components/Upload';
// import Results from './components/Results';

export default (
  <Switch>
    <Route exact path='/' component={ Upload } />
    {/* <Route path='/results' component={ Results } /> */}
  </Switch>
);