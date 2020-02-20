import  React, {Component} from 'react';
import axios from 'axios';


class AutoRoute extends Component{
    // 获取用户信息
    // 是否登录
    // 现在的url地址 login不需要跳转
    // 用户的type 身份是boss还是牛人
    // 用户是否完善信息 选择头像 简历
    componentDidMount(){
        axios.get('/user/test').then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
                
        
        // .then(res => {
        //     console.log(res);
        //     console.log(res);
        //     // if (res.status === 200){
        //     //     console.log(res.data);
        //     // }
        //     })
    }

    render(){
        return <p>ssssssss</p>;
    }
}

export default AutoRoute;