import {combineReducers} from 'redux';
import {user} from './Redux/user.redux.js';
import {chatuser} from './Redux/chatuser.redux';
import { chat } from './Redux/chat.redux';

export default combineReducers({user, chatuser, chat})