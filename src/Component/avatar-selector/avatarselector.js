import React, { Component } from 'react';
import { Grid,List } from 'antd-mobile';
import PropTypes from 'prop-types';

class AvatarSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
            .split(',')
            .map(v => ({
                icon: require(`../img/${v}.png`),
                text: v,
                test:1
            }));

        const gridHeader = this.state.text ? (<div>
            <span>Selected Icon</span>
            <img style={{ width: 20 }} src={this.state.icon} alt="" />
        </div>) : null;
        return (
            <div>
                <List renderHeader={() => gridHeader}>
                    <Grid data={avatarList} activeStyle={false}
                          columnNum={5} onClick={elm => {
                            this.setState(elm)
                            this.props.selectAvatar(elm.text);
                        }} />
                </List>
            </div>
        );
    }
}








export default AvatarSelector;