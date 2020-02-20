import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import reducers from './reducer';
import './config';

import AuthRoute from './Component/authroute/authroute';

import Login from './Container/login/login.js';
import Register from './Container/register/register.js';

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))


ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <div>
            {/* <AuthRoute></AuthRoute> */}
            <Route path='/login' component={Login}></Route>
            <Route path='/register' component={Register}></Route>

            </div>

        </BrowserRouter>
    </Provider>),
     document.getElementById('root'));
