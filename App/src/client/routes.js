import React from 'react';
import { Route, IndexRoute } from 'react-router';

/**
 * Import all page components here
 */
import App from './components/App';
import Home from './components/Home';
import Signup from './components/Signup';
import ActionPage from './components/ActionPage';
import About from './components/About';
import Profile from './components/Profile';
import NotFound from './components/NotFound';

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/signup(/:redirect)" component={Signup}/>
    <Route path="/actionpage/:type(/:active)(/:id)" component={ActionPage}/>
    {/* <Route path="/about(/:user)" component={About}/> */}
    <Route path="/profile" component={Profile}/>
    <Route path="*" exact={true} component={NotFound}/>
  </Route>
);