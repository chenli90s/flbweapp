import Taro, {Component} from '@tarojs/taro'
import {View, } from '@tarojs/components'


export default class User extends Component{
  config = {
    navigationBarTitleText: '',
    usingComponents: {
      "i-cell-group": "../../iview/cell-group/index",
      "i-cell": "../../iview/cell/index",
    }
  };

  render(){
    return (
      <View>
        <i-cell-group>
          <i-cell title='我的订单' is-link url='/pages/user/myorder'></i-cell>
          <i-cell title='我的积分' is-link url='/pages/index/index'></i-cell>
          <i-cell title='商城订单' is-link url='/pages/index/index'></i-cell>
          <i-cell title='加入我们' is-link url='/pages/index/index'></i-cell>
          <i-cell title='关于我们' is-link url='/pages/index/index'></i-cell>
          <i-cell title='联系我们' is-link url='/pages/index/index'></i-cell>
        </i-cell-group>
      </View>
    )
  }
}
