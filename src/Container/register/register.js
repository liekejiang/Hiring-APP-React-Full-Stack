import React, {Component} from 'react';
import Logo from '../../Component/logo/logo';
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile';
class Register extends Component{
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        this.state = {
            type : "boss",
        }
    }

    login(){
        this.props.history.push('./login');
    }

    render(){
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                <Logo />
                <h2>Login</h2> 
                <WingBlank>
                    <List>
                        <InputItem>UserName</InputItem>
                        <WhiteSpace />
                        <InputItem>Password</InputItem>
                         <WhiteSpace />
                        <InputItem>PW again</InputItem>   
                        <WhiteSpace />
                        <RadioItem checked={this.state.type == "boss"}>Boss</RadioItem>     
                        <RadioItem checked={this.state.type == "Candidate"}>Candidate</RadioItem>                                        
                    </List>

                    {/* <Button onClick={this.login} type='primary'>Login</Button> */}
                    <WhiteSpace />
                    <Button type='primary'>Signin</Button>
                </WingBlank>

            </div>
        ) 
    }
}

export default Register;