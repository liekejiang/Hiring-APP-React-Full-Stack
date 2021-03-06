import React, { Component } from 'react';


import { connect } from 'react-redux';
import { getUserList } from '../../Redux/chatuser.redux.js';
import UserCard from '../../Component/usercard/usercard';
class Boss extends Component {
    componentDidMount(){
        this.props.getUserList('candidate');
    }

    render() {
        return <UserCard userlist={this.props.chatuser.userlist}></UserCard>
    }
}

const mapStateToProps = (State) => {
    return {
        chatuser: State.chatuser,
    }
};

const mapDispatchToprops = {getUserList};

export default connect(mapStateToProps,mapDispatchToprops)(Boss);

