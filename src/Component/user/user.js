import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Result, List, Modal, } from 'antd-mobile';
import { WhiteSpace } from 'antd-mobile';
import browserCookie from 'browser-cookies';
import {logoutSubmit} from '../../Redux/user.redux';
import {Redirect} from 'react-router-dom';

class User extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        // console.log(this);
    }

    logout() {
        // Alter when click exit
        // 
        console.log('logout');
        const alert = Modal.alert;
        alert('Exit', 'Are you sure?', [
            { text: 'Cancel', onPress: () => console.log('cancel') },
            { text: 'Ok', onPress: () => {
                browserCookie.erase('userid');
                // window.location.href = window.location.href; // refresh page
                this.props.logoutSubmit(); // clean redux
            } },
        ])

    }

    render() {
        const props = this.props;
        const Item = List.Item;
        const Brief = Item.Brief;
        
        return props.user.user ? (
            <div className="test">
                <Result
                    img={<img src={require(`../img/${props.user.avatar}.png`)} style={{ width: 50 }} alt="" />}
                    title={props.user.user}
                    message={props.user.type === 'boss' ? props.user.company : null}
                />

                <List renderHeader={() => { 'Desc' }}>
                    <Item multipleLine>
                        {props.user.title}
                        {props.user.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
                        {props.user.money ? <Brief>package:{props.user.money}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Item onClick={this.logout}>Exit</Item>
                </List>

            </div>
        ) : <Redirect to={props.user.redirectTo}/>;
    }


}

// export default User;
const mapStateToProps = (State) => {
    return {
        user: State.user,
    }
};

const mapDispatchToprops = {
    logoutSubmit
};

export default connect(mapStateToProps, mapDispatchToprops)(User);

