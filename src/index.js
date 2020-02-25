import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import reducers from './reducer';
import './config';
import './index.css'
import AuthRoute from './Component/authroute/authroute';
import Dashboard from './Component/dashboard/dashboard';
import Login from './Container/login/login.js';
import Register from './Container/register/register.js';
import BossInfo from './Container/Bossinfo/bossinfo.js';
import CandidateInfo from './Container/CandidateInfo/candidateinfo.js';


const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))
// function Boss() {
//     return <h2>BOSS</h2>
// }

// function Dashboard(){
//     return <h2>Dashboard</h2>
// }

// Switch组件表示 只要有一个路由命中 剩下的就不再处理
// 不加Switch 所有不写path的都会在全部的页面显式
ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path='/bossinfo' component={BossInfo}></Route>
                    <Route path='/candidateinfo' component={CandidateInfo}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Route component={Dashboard}></Route>
                </Switch>


            </div>

        </BrowserRouter>
    </Provider>),
    document.getElementById('root'));
