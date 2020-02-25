import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { NavBar, TabBar } from 'antd-mobile';
import { connect } from 'react-redux';
import NavLinkBar from '../navlink/navlink';
import {Switch} from 'react-router-dom';
import Boss from '../../Container/boss/boss'


function Candidate() {
    return <h2>Candidate</h2>
}
function Msg() {
    return <h2>Msg</h2>
}
function User() {
    return <h2>User</h2>
}
class Dashboard extends Component {


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
                hide: user.type == 'candidate',
            },
            {
                path: '/candidate',
                text: '/boss',
                icon: 'job',
                title: 'boss list',
                component: Candidate,
                hide: user.type == 'boss',
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
            <div>
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
    }
};

const mapDispatchToprops = {};

export default connect(mapStateToProps, mapDispatchToprops)(Dashboard)


// export default Dashboard;