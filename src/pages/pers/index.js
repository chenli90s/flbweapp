import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'


import './index.css'


class Persion extends Component {

  config = {
    navigationBarTitleText: '个人中心',
    usingComponents: {
      "i-cell-group": "../../iview/cell-group/index",
      "i-cell": "../../iview/cell/index",
    }
  }


  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  render() {
    return (
      <View className='index'>
        <i-cell-group>
          <i-cell title='我的订单' is-link url='/pages/user/myorder' />
          <i-cell title='我的积分' is-link url='/pages/user/prod'></i-cell>
          <i-cell title='商城订单' is-link url='/pages/user/prodorder'></i-cell>
          <i-cell title='加入我们' is-link url='/pages/user/join'></i-cell>
        </i-cell-group>
      </View>
    )
  }
}

export default Persion
