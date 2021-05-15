import { combineReducers } from 'redux';
import sidebar from './sidebar';
import authUserReducer from './auth';

export default combineReducers({
    sidebar,
    authUserReducer
});