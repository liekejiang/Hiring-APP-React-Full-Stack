import React, {Component} from 'react';
import Logo from '../../Component/logo/logo';
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {register} from '../../Redux/user.redux.js';

import './register.css';

class Register extends Component{
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.state = {
            type : "boss",
            user : '',
            pwd:'',
            repeatpwd:'',
        }
    }

    handleChange(key,val){
        // console.log('checked')
        this.setState({
            [key]:val,
        })
        // console.log(this.state.type);
    }

    login(){
        this.props.history.push('./login');
    }

    handleRegister(){
        this.props.register(this.state);
        // console.log(this.props)
    }

    render(){
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {this.props.user.redirectTo?<Redirect to={this.props.user.redirectTo}/> : null};
                <Logo />
                <h2>Signin</h2> 
                <WingBlank>
                    <List>
                        {this.props.user.msg?<p className='error-msg'>{this.props.user.msg}</p>:null}
                        <InputItem onChange={(val) => this.handleChange('user',val)}>UserName</InputItem>
                        <WhiteSpace />
                        <InputItem type='password' onChange={(val) => this.handleChange('pwd',val)}>Password</InputItem>
                         <WhiteSpace />
                        <InputItem type='password' onChange={(val) => this.handleChange('repeatpwd',val)}>PW again</InputItem>   
                        <WhiteSpace />
                        <RadioItem checked={this.state.type == "candidate"}
                                   onClick={() => this.handleChange('type','candidate')}>Candidate</RadioItem>                           
                        <RadioItem checked={this.state.type == "boss"}
                                   onClick={() => this.handleChange('type','boss')}>Boss</RadioItem>     
                    </List>

                    <Button onClick={this.login} type='primary'>Login</Button>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.handleRegister}>Signin</Button>
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

const mapDispatchToprops = {register};

export default connect(mapStateToProps,mapDispatchToprops)(Register);
// export default Register;