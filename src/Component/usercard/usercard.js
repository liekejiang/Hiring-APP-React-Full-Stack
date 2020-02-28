import React, {Component} from 'react';
import { Card, WhiteSpace, WingBlank } from 'antd-mobile';
// import { connect } from 'react-redux';
// import { getUserList } from '../../Redux/chatuser.redux.js';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

@withRouter
class UserCard extends Component {
    static propTypes = {
        userlist: PropTypes.array.isRequired,
    }

    handleClick(v){
        this.props.history.push(`/chat/${v._id}`);
    }

    render() {
        const Header = Card.Header;
        const Body = Card.Body;
        return ( 
            <WingBlank>
                <WhiteSpace></WhiteSpace>
                {this.props.userlist.map(v => (
                    v.avatar?(<Card key={v._id} onClick={()=>{this.handleClick(v)}}>
                        <Header
                            title={v.user}
                            extra={<span>{v.title}</span>}
                            thumb={require(`../../Component/img/${v.avatar}.png`)}
                        ></Header>
                        <Body>
                            {v.type==='boss' ? <div>company:{v.company}</div> : null}
                            {v.desc.split('\n').map(e=>(
                                <div key={e}>{e}</div>
                            ))}
                            {v.type==='boss' ? <div>package:{v.money}</div> : null}
                        </Body>
                    </Card>):null

                ))} 
            </WingBlank>
        )
    }
}

export default UserCard;
// const mapStateToProps = (State) => {
//     return {
//         chatuser: State.chatuser,
//     }
// };

// const mapDispatchToprops = {getUserList};

// export default connect(mapStateToProps,mapDispatchToprops)(UserCard);
