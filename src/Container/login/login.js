import React,{ Component } from 'react';
import Logo from '../../Component/logo/logo';
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';

class Login extends Component{
    constructor(props){
        super(props);
        this.register = this.register.bind(this);
    }

    register(){
        console.log(this.props);
        this.props.history.push('./register');
    }

    render(){
        return (
            <div>
                <Logo />
                <h2>Login</h2> 
                <WingBlank>
                    <List>
                        <InputItem>UserName</InputItem>
                        <WhiteSpace />
                        <InputItem>Password</InputItem>
                    </List>
                    <Button type='primary'>Login</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type='primary'>Signin</Button>
                </WingBlank>

            </div>
        ) 
    }
}

export default Login;