import React from 'react';
import { 
    useSelector, 
    // useDispatch 
} from 'react-redux'
import { Redirect } from 'react-router-dom';

const Auth = ({page}) => {
    // const dispatch = useDispatch()
    const AuthUser = useSelector(state => state.authUserReducer);
    
    if (AuthUser.is_login === false) {
        return <Redirect to='/login'/>
    } else {
        return page
    }
}

export default Auth;