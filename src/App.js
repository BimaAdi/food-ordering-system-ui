import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const Auth = React.lazy(() => import('./containers/Auth'));
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
              <Route path="/order-active"> 
                <Auth page={<TheLayout page={<OrderActive />}/>} />
              </Route>
              <Route path="/order-history"> 
                <Auth page={<TheLayout page={<OrderHistory />}/>} />
              </Route>
              <Route path="/menu"> 
                <Auth page={<TheLayout page={<Menu />}/>} />
              </Route>
              <Route path="/user"> 
                <Auth page={<TheLayout page={<User />}/>} />
              </Route>
              <Redirect from='*' to='/order-active' />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
