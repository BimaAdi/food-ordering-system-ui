import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const OrderActive = React.lazy(() => import('./pages/OrderActive'));
const OrderHistory = React.lazy(() => import('./pages/OrderHistory'));
const Menu = React.lazy(() => import('./pages/Menu'));
const User = React.lazy(() => import('./pages/User'));
const Login = React.lazy(() => import('./pages/Login'));

class App extends Component {

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route path="/order-active" render={props => <TheLayout page={<OrderActive />} /> }/>
              <Route path="/order-history" render={props => <TheLayout page={<OrderHistory />} /> }/>
              <Route path="/menu" render={props => <TheLayout page={<Menu />} /> }/>
              <Route path="/user" render={props => <TheLayout page={<User />} /> }/>
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
