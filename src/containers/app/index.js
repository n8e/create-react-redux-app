import React from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import Home from '../home';
import About from '../../components/about';
import Login from '../../containers/login';
import Logout from '../../containers/login/logout';

import { appStore } from '../../index';

const PrivateRoute = ({component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

const App = () => (
  <div>
    <header>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/login">Login</Link>
      <Link to="/logout">Logout</Link>
    </header>

    <main>
      <PrivateRoute authed={appStore.getState().authentication.isAuthenticated} exact path='/' component={Home} />
      <PrivateRoute authed={appStore.getState().authentication.isAuthenticated} exact path='/about' component={About} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/logout" component={Logout} />
    </main>
  </div>
);

export default App;
