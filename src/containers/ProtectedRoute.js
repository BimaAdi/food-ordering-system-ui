import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { 
    useSelector
} from 'react-redux'

const ProtectedRoute = ({component: Component, ...rest}) => {
    const AuthUser = useSelector(state => state.authUserReducer);
    return <Route {...rest} render={props => AuthUser.is_login === true ? Component : <Redirect to='/login'/>} />
} 

export default ProtectedRoute;