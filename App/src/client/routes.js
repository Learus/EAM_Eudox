import React from 'react';
import { Route, IndexRoute } from 'react-router';

/**
 * Import all page components here
 */
import App from './components/App';
import Home from './components/Home';
import ActionPage from './components/ActionPage';
import SignupPage from './components/SignupPage';

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/actionpage" component={ActionPage}/>
    <Route path="/signup" component={SignupPage}/>
  </Route>
);