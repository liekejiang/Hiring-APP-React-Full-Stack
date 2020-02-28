import {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {loadData} from '../../Redux/user.redux';
import {connect} from 'react-redux';

@withRouter
class AutoRoute extends Component{
    // 获取用户信息
    // 是否登录
    // 现在的url地址 login不需要跳转
    // 用户的type 身份是boss还是牛人  
    // 用户是否完善信息 选择头像 简历
    
    componentDidMount(){
        const publicList = ['./login','/register'];
        const pathName = this.props.location.pathname;
        if(publicList.indexOf(pathName) > -1){
            return null;
        }
        axios.get('/user/info').then((res) =>{
            console.log('load')
            if(res.status === 200){
                //login
                if(res.data.code===0){
                    this.props.loadData(res.data.data);       

                    //keep login
                }else{
                    this.props.history.push('/login');
                }
            }
        }).catch(function (error) {
            console.log(error);
        });    
    }

    render(){
        // console.log('test123')
        // const publicList = ['./login','/register'];
        // const pathName = this.props.location.pathname;
        // if(publicList.indexOf(pathName) > -1){
        //     return null;
        // }
        // axios.get('/user/info').then((res) =>{
        //     console.log('load')
        //     if(res.status === 200){
        //         //login
        //         if(res.data.code===0){
        //             this.props.loadData(res.data.data);       

        //             //keep login
        //         }else{
        //             this.props.history.push('/login');
        //         }
        //     }
        // }).catch(function (error) {
        //     console.log(error);
        // });    

        return null;
    }
}



const mapDispatchToprops = {loadData};

export default connect(null,mapDispatchToprops)(AutoRoute);

// export default AutoRoute; 