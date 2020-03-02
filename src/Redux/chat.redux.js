import axios from 'axios';

import io from 'socket.io-client';
const socket = io('ws://localhost:9093');


//get chat list
const MSG_LIST = 'MSG_LIST';
// read msg
const MSG_RECV = 'MSE_RECV';
// have read
const MSG_READ = 'MSG_READ';

const initState = {
    chatmsg: [],
    unread: 0,
    users: {}
}

export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return { ...state, chatmsg: action.payload.msgs, unread: action.payload.msgs.filter(v => !v.read &&v.to === action.payload.userid).length, users: action.payload.users }
        case MSG_RECV:
            // return { ...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + action.userid===action.payload.to?0:1}
            const n = action.payload.to===action.userid?1:0
            console.log(n, state.unread);
            const newState = {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+n};
            console.log(action,newState);
			return newState;
        // case MSG_READ: 
        default:
            return state;
    }
}
function msgList(msgs, users, userid) {
    return { type: MSG_LIST, payload: { msgs, users ,userid} };
}

export function getMsgList() {
    return (dispatch, getState) => {
        axios.get('/user/getmsglist').then(
            res => {
                if (res.status === 200 && res.data.code === 0) {
                    const userid = getState().user._id;
                    dispatch(msgList(res.data.msgs, res.data.users, userid));
                }
            }
        )
    }
}


export function sendMsg({ from, to, msg }) {
    return dispatch => {
        // console.log('msg',from)
        socket.emit('sendMsg', { from, to, msg });
    }

}

function msgRecv(data,userid) {
    return { type: MSG_RECV, payload: data, userid:userid };
}

export function recvMsg() {
    return (dispatch, getState) => {
        socket.on('recvmsg', function (data) {
            console.log('recvmsg-chat', data);
            const userid = getState().user._id;
            dispatch(msgRecv(data, userid));
        })
    }
}


export function recvMsg1() {
    return (dispatch, getState) => {
        socket.on('recvmsg', function (data) {
            console.log('recvmsg=dashboard', data);
            const userid = getState().user._id;
            dispatch(msgRecv(data, userid));
        })
    }
}
