import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import API from './config';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const ProtectedRoute = React.lazy(() => import('./containers/ProtectedRoute'));
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const OrderActive = React.lazy(() => import('./pages/OrderActive'));
const OrderCreate = React.lazy(() => import('./pages/OrderCreate'));
const OrderEdit = React.lazy(() => import('./pages/OrderEdit'));
const OrderHistory = React.lazy(() => import('./pages/OrderHistory'));
const Menu = React.lazy(() => import('./pages/Menu'));
const User = React.lazy(() => import('./pages/User'));
const Login = React.lazy(() => import('./pages/Login'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const isAuth = async () => {
        try {
            let res = await axios.get(`${API.url}/auth-user`,  {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.localStorage.getItem('token')}`
                }
            });
            dispatch({
                type: 'LOGIN',
                payload: {
                  username: res.data.name,
                  email: res.data.email,
                  role: res.data.role
                }
            });
            
        } catch (error) {
            dispatch({
                type: 'LOGOUT'
            });
        }
    }
    isAuth();
  }, []);

  return (
    <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
            <ProtectedRoute exact path="/order-active" component={<TheLayout page={<OrderActive />}/>}/>
            <ProtectedRoute exact path="/order-active/create" component={<TheLayout page={<OrderCreate />}/>}/>
            <ProtectedRoute exact path="/order-active/:id/edit" component={<TheLayout page={<OrderEdit />}/>}/>
            <ProtectedRoute exact path="/order-history" component={<TheLayout page={<OrderHistory />}/>}/>
            <ProtectedRoute exact path="/menu" component={<TheLayout page={<Menu />}/>}/>
            <ProtectedRoute exact path="/user" component={<TheLayout page={<User />}/>}/> 
            <Redirect from='*' to='/order-active' />
          </Switch>
        </React.Suspense>
    </HashRouter>
  );
}

export default App;
