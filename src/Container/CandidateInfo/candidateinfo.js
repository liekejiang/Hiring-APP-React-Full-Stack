import React, { Component } from 'react';
import { NavBar, InputItem,TextareaItem, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import AvatarSelector from '../../Component/avatar-selector/avatarselector';
import {update} from '../../Redux/user.redux';
import {Redirect} from 'react-router-dom';

class CandidateInfo extends Component {
    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this);
        this.state = {
            title:'',
            desc:'',
        }
    }

    onChange(key,val){
        this.setState({
            [key]:val,
        })
    }

    render() {
        const path = this.props.location.pathname;
        const redirect = this.props.user.redirectTo;
        return (
            <div>
                {redirect&&redirect!==path? <Redirect to={this.props.user.redirectTo}></Redirect> :null}
                <NavBar
                    mode="dark"
                    // leftContent="Back"
                    // rightContent={[
                    //     <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                    //     <Icon key="1" type="ellipsis" />,
                    // ]}
                >CANDIDATE INFO</NavBar>
                <AvatarSelector selectAvatar={(imgname) => {
                    this.setState({
                        avatar:imgname,
                    })
                }}
                ></AvatarSelector>
                <InputItem onChange={(val)=>{this.onChange('title',val)}}>
                    Title</InputItem>
                <TextareaItem  onChange={(val)=>{this.onChange('desc',val)}}
                               rows={3} autoHeight title='Description'>
                </TextareaItem >
                <Button type='primary' onClick={() => {this.props.update(this.state)}}>Submit</Button>
            </div>
        )
    }
}

const mapStateToProps = (State) => {
    return {
        user: State.user,
    }
};

const mapDispatchToprops = {update};

export default connect(mapStateToProps,mapDispatchToprops)(CandidateInfo);

