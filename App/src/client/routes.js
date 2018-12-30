import React from 'react';
import { Route, IndexRoute } from 'react-router';

/**
 * Import all page components here
 */
import App from './components/App';
import Home from './components/Home';
import Signup from './components/Signup';
import ActionPage from './components/ActionPage';
import About from './components/About'

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/signup" component={Signup}/>
    <Route path="/actionpage/:type/:active" component={ActionPage}/>
    <Route path="/about(/:user)" component={About}/>
  </Route>
);