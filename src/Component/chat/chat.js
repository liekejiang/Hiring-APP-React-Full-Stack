import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, InputItem, NavBar, Icon } from 'antd-mobile';
import { getMsgList, sendMsg, recvMsg } from '../../Redux/chat.redux';
import { getChatId } from '../../util';
// import io from 'socket.io-client';
// const socket = io('ws://localhost:9093');


class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '', msg: [] };
    }

    componentDidMount() {
        if (!this.props.state.chat.chatmsg.length) {

        }
            this.props.getMsgList();
            this.props.recvMsg();

    }

    handleSumbit() {

        const from = this.props.state.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;

        this.props.sendMsg({ from, to, msg });
        this.setState({ text: '' })
    }

    render() {
        const userid = this.props.match.params.user;
        const Item = List.Item;
        const users = this.props.state.chat.users
        const username = users[userid];
        if (!username) {
            return null;
        }
        const chatid = getChatId(userid, this.props.state.user._id);
        const chatmsgs = this.props.state.chat.chatmsg.filter(v => v.chatid === chatid);
        return (
            <div id='chat-page'>
                <NavBar
                    mode='dark'
                    icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}
                >
                    {username.name}
                </NavBar>

                {chatmsgs.map(v => {
                    const avatar = require(`../img/${users[v.from].avatar}.png`)

                    // 点击进入聊天的用户界面
                    return v.from === userid ? (
                        <List key={v._id} >
                            <Item thumb={avatar}>{v.content}</Item>
                        </List>
                    ) : (
                            <List key={v._id} >
                                <Item extra={<img src={avatar} alt="" />} className='chat-me' >{v.content}</Item>
                            </List>
                        )
                })}

                <div className='stick-footer'>
                    <List>
                        <InputItem
                            placeholder='plz text'
                            value={this.state.text}
                            onChange={
                                v => {
                                    this.setState({ text: v })
                                }
                            }
                            extra={<span onClick={() => this.handleSumbit()}>Send</span>}
                        >Msg</InputItem>
                    </List>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (State) => {
    return {
        state: State,
    }
};

const mapDispatchToprops = { getMsgList, sendMsg, recvMsg };

export default connect(mapStateToProps, mapDispatchToprops)(Chat)



// export default Chat;
