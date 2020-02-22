import React,{ Component } from 'react';
import Logo from '../../Component/logo/logo';
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import {login} from '../../Redux/user.redux';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class Login extends Component{
    constructor(props){
        super(props);
        this.register = this.register.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            'user':'',
            'pwd':'',
        }
    }
    handleChange(key,val){
        this.setState({
            [key]:val,
        })
    }
    register(){
        this.props.history.push('./register');
    }

    handleLogin(){
        this.props.login(this.state);
    }

    render(){
        return (
            <div>
                {this.props.user.redirectTo?<Redirect to={this.props.user.redirectTo}/> : null};
                <Logo />
                <h2>Login</h2> 
                <WingBlank>
                    <List>
                        {this.props.user.msg?<p className='error-msg'>{this.props.user.msg}</p>:null}
                        <InputItem onChange={(val) => this.handleChange('user',val)}>UserName</InputItem>
                        <WhiteSpace />
                        <InputItem onChange={(val) => this.handleChange('pwd',val)}
                                   type='password'>Password</InputItem>
                    </List>
                    <Button type='primary' onClick={this.handleLogin}>Login</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type='primary'>Signin</Button>
                </WingBlank>

            </div>
        ) 
    }
}


const mapStateToProps = (State) => {
    return {
        user: State.user,
    }
};

const mapDispatchToprops = {login};

export default connect(mapStateToProps,mapDispatchToprops)(Login);
// export default Login;