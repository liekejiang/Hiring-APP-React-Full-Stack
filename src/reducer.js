import {combineReducers} from 'redux';
import {user} from './Redux/user.redux.js';
import {chatuser} from './Redux/chatuser.redux';


export default combineReducers({user, chatuser})