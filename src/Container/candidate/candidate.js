import React, {Component} from 'react';

import { connect } from 'react-redux';
import { getUserList } from '../../Redux/chatuser.redux.js';
import UserCard from '../../Component/usercard/usercard';

class Candidate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount(){
        this.props.getUserList('boss');
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

export default connect(mapStateToProps,mapDispatchToprops)(Candidate);
