import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import http from '../../utils/http'


import './index.css'


class Persion extends Component {

  config = {
    navigationBarTitleText: '个人中心',
    usingComponents: {
      "i-cell-group": "../../iview/cell-group/index",
      "i-cell": "../../iview/cell/index",
    }
  }

  state = {
    role: 0
  }

  componentWillUnmount() {
  }

  async componentDidShow() {
    let id = Taro.getStorageSync('id');
    let res = await http.get('/per_info', {unionid: id})
    this.setState(res)
  }

  componentDidHide() {
  }

  render() {
    let {role} = this.state
    let view = null
    if(role===1){
        view = (<i-cell-group>
          <i-cell title='我的订单' is-link url='/pages/user/myorder' />
          <i-cell title='我的地址' is-link url='/pages/user/addrelist' />
          <i-cell title='我的钱包' is-link url='/pages/user/wallet' />
          <i-cell title='我的积分' is-link url='/pages/user/prod'></i-cell>
          <i-cell title='商城订单' is-link url='/pages/user/prodorder'></i-cell>
          <i-cell title='加入我们' is-link url='/pages/user/join'/>
          <i-cell title='关于我们' is-link url='/pages/user/about'/>
          <i-cell title='联系我们' is-link url='/pages/user/contact'/>
        </i-cell-group>)
      }

    if(role===2){
      view = (
        <i-cell-group>
          <i-cell title='我要接单' is-link url='/pages/admin/getorder' />
          <i-cell title='我的订单' is-link url='/pages/admin/myorder'></i-cell>
          <i-cell title='历史订单' is-link url='/pages/admin/history'></i-cell>
        </i-cell-group>
      )
    }

    if(role===3){
      view = (
        <i-cell-group>
          <i-cell title='商城订单' is-link url='/pages/superadmin/prudorder' />
          <i-cell title='管理' is-link url='/pages/superadmin/manageuser'></i-cell>
          {/*<i-cell title='商品管理' is-link url='/pages/superadmin/manageprud'></i-cell>*/}
          <i-cell title='历史订单' is-link url='/pages/superadmin/historyorder'></i-cell>
        </i-cell-group>
      )
    }


    return (
      <View className='index'>
        {view}
      </View>
    )
  }
}

export default Persion
