import axios from 'axios';
import { getRedirect } from '../util'
// const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const LOGOUT = 'LOGOUT';
//ACTION
function errorMsg(msg) {
    return { msg, type: ERROR_MSG };
}

function authSuccess(obj) {
    const {pwd, ...data} = obj;
    return { type: AUTH_SUCCESS, payload: data };
}

export function loadData(userinfo) {
    console.log('load data')
    return { type: LOAD_DATA, payload: userinfo };
}

export function logoutSubmit(){
    return {type: LOGOUT}
}
//FUNCTION
export function login({ user, pwd }) {
    if (!user || !pwd) {
        return errorMsg('must input username and password');
    }

    return dispatch => {
        axios.post('/user/login', { user, pwd })
            .then(res => {
                console.log(res);
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data));
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            })

    }
}

export function register({ user, pwd, repeatpwd, type }) {
    if (!user || !pwd || !type) {
        return errorMsg('must input username and password');
    }

    if (pwd !== repeatpwd) {
        return errorMsg("password and repeatpwd must be the same")
    }

    return dispatch => {
        axios.post('/user/register', { user, pwd, type })
            .then(res => {
                // console.log(res);
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess({ user, pwd, type }));
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            })

    }
}


export function update(data) {
    return dispatch => {
        axios.post('/user/update', data).then(
            res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data));
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            }
        )
    }
}



const initState = {
    msg: '',
    user: '',
    type: '',
    redirectTo: '',
    avatar: ''
}

//reducer 
export function user(state = initState, action) {
    switch (action.type) {
        // case REGISTER_SUCCESS:
        //     return { ...state, msg: '', redirectTo: getRedirect(action.payload), isAuth: true, ...action.payload };
        // case LOGIN_SUCCESS:
        //     return { ...state, msg: '', redirectTo: getRedirect(action.payload), isAuth: true, ...action.payload };  
        case AUTH_SUCCESS:
            return { ...state, msg: '', redirectTo: getRedirect(action.payload), ...action.payload,};  
        case ERROR_MSG:
            return { ...state, isAuth: false, msg: action.msg };
        case LOAD_DATA:
            console.log('load data execute')
            return { ...state, ...action.payload };
        case LOGOUT:
            return {...initState, redirectTo: '/login'};
        default:
            return state;
    }
    // return state;
}