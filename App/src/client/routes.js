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
import Search from './components/Search'
import NotFound from './components/NotFound';
import Print from './components/Print';

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
    <Route path="/search/:active(/:id)" component={Search}/>
    <Route path="/print" component={Print}/>
    <Route path="*" exact={true} component={NotFound}/>
  </Route>
);