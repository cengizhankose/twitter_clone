import { combineReducers } from 'redux';
import AuthReducers from './AuthReducers';
import ListReducers from './ListReducers';

export default combineReducers({
    authResponse: AuthReducers,
    charactersResponse: ListReducers
});