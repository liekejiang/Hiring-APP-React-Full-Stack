import React, { Component } from 'react';
// import axios from 'axios';
import { Card, WhiteSpace, WingBlank } from 'antd-mobile';
import { connect } from 'react-redux';
import { getUserList } from '../../Redux/chatuser.redux.js';

class Boss extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount(){
        this.props.getUserList('candidate');
    }

    render() {
        const Header = Card.Header;
        const Body = Card.Body;
        return (

            <WingBlank>
                <WhiteSpace></WhiteSpace>
                {this.props.chatuser.userlist.map(v => (
                    v.avatar?(<Card key={v._id}>
                        <Header
                            title={v.user}
                            extra={<span>{v.title}</span>}
                            thumb={require(`../../Component/img/${v.avatar}.png`)}
                        ></Header>
                        <Body>
                            {v.desc.split('\n').map(v=>(
                                <div key={v}>{v}</div>
                            ))}
                        </Body>
                    </Card>):null

                ))} 
            </WingBlank>
        )
    }
}

const mapStateToProps = (State) => {
    return {
        chatuser: State.chatuser,
    }
};

const mapDispatchToprops = {getUserList};

export default connect(mapStateToProps,mapDispatchToprops)(Boss);

// export default Boss;