import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { 
    useSelector,
    useDispatch 
} from 'react-redux'

const ProtectedRoute = ({component: Component, ...rest}) => {
    const AuthUser = useSelector(state => state.authUserReducer);
    console.log(AuthUser.is_login);
    return <Route {...rest} render={props => AuthUser.is_login === true ? Component : <Redirect to='/login'/>} />
} 

export default ProtectedRoute;