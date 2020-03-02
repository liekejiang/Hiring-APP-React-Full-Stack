import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { NavBar } from 'antd-mobile';
import { connect } from 'react-redux';
import NavLinkBar from '../navlink/navlink';
import { Switch } from 'react-router-dom';
import Boss from '../../Container/boss/boss'
import Candidate from '../../Container/candidate/candidate';
import User from '../../Component/user/user';
import { getMsgList, recvMsg1 } from '../../Redux/chat.redux';
function Msg() {
    return <h2>Msg</h2>
}

class Dashboard extends Component {

    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList();
            this.props.recvMsg1();
        }

    }

    render() {
        const { pathname } = this.props.location
        const user = this.props.user
        const navList = [
            {
                path: '/boss',
                text: '/candidate',
                icon: 'boss',
                title: 'candidate list',
                component: Boss,
                hide: user.type === 'candidate',
            },
            {
                path: '/candidate',
                text: '/boss',
                icon: 'job',
                title: 'boss list',
                component: Candidate,
                hide: user.type === 'boss',
            },
            {
                path: '/msg',
                text: '/message',
                icon: 'msg',
                title: 'message list',
                component: Msg,
            },
            {
                path: '/me',
                text: '/me',
                icon: 'user',
                title: 'user',
                component: User,
            }
        ]
        return (
            <div className="test higher">
                <NavBar className='fixd-header' mode='dard'>{navList.find(v => v.path === pathname).title}</NavBar>
                <div style={{ marginTop: 45 }}>
                    <Switch>
                        {navList.map(v => (
                            <Route key={v.path} path={v.path} component={v.component} ></Route>
                        ))}
                    </Switch>
                </div>

                <NavLinkBar data={navList}></NavLinkBar>

            </div>
        )
    }

}

const mapStateToProps = (State) => {
    return {
        user: State.user,
        chat: State.chat
    }
};

const mapDispatchToprops = { getMsgList, recvMsg1 };

export default connect(mapStateToProps, mapDispatchToprops)(Dashboard)


// export default Dashboard;