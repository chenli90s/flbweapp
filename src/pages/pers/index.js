import Taro, {Component} from '@tarojs/taro'
import {OpenData, Text, View, Image} from '@tarojs/components'
import http from '../../utils/http'
import {AtList, AtListItem} from 'taro-ui'
import qianbao from '../../img/qianbao.png'
import jifeng from '../../img/jifen.png'
import order from '../../img/order.png'
import dizhi from '../../img/dizhi01.png'
import prod from '../../img/prod-ord.png'
import jiaru from '../../img/jiaru.png'
import about from '../../img/about.png'
import lianxi from '../../img/lianxi.png'


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
    let user = await http.get('/integral', {unionid: id});
    this.setState({score: user.integral, ...res})
  }

  componentDidHide() {
  }

  toOrder = () => {
    Taro.navigateTo({url: '/pages/user/myorder'})
  }

  toloc  = () => {
    Taro.navigateTo({url: '/pages/user/addrelist'})
  }

  toProd  = () => {
    Taro.navigateTo({url: '/pages/user/prodorder'})
  }

  toJoin  = () => {
    Taro.navigateTo({url: '/pages/user/join'})
  }

  toAbout  = () => {
    Taro.navigateTo({url: '/pages/user/about'})
  }

  toLianxi  = () => {
    Taro.navigateTo({url: '/pages/user/contact'})
  }

  toQianbao = () => {
    Taro.navigateTo({url: '/pages/user/wallet'})
  }

  toPro = () => {
    Taro.navigateTo({url: '/pages/user/prod'})
  }


  render() {
    let {role, score} = this.state
    let view = null
    if (role === 1) {
      view = (
        <view>
          <View className='i-userinfo'>
            <View className='i-avate'>
              <OpenData type='userAvatarUrl'></OpenData>
            </View>
            <View className='i-info-text'>
              <OpenData type='userNickName'/>
              <Text style={{lineHeight: "25px"}}>积分：{score}</Text>
            </View>
          </View>
          <View className='i-user-con'>
            <View className='i-user-item'
                  onClick={this.toQianbao}
                  style={{borderRight: "1px solid #dddddd"}}>
              <Image src={qianbao} className='i-user-icon'/>
              <Text className='i-user-text'>我的钱包</Text>
            </View>
            <View className='i-user-item' onClick={this.toPro}>
              <Image src={jifeng} className='i-user-icon'/>
              <Text className='i-user-text'>积分兑换</Text>
            </View>
          </View>
          <AtList>
            {/*<i-cell title='我的订单' is-link url='/pages/user/myorder' />*/}
            <AtListItem title='我的订单'
                        arrow='right'
                        thumb={order}
                        onClick={this.toOrder}
                        url='/pages/user/myorder'/>
            <AtListItem title='我的地址'
                    arrow='right'
                    thumb={dizhi}
                    onClick={this.toloc}
                    url='/pages/user/addrelist'/>
            {/*<AtListItem title='我的钱包'*/}
                        {/*arrow='right'*/}
                        {/*thumb={dizhi}*/}
                        {/*onClick={this.toloc}*/}
                        {/*url='/pages/user/wallet'/>*/}
            <AtListItem title='商城订单'
                        arrow='right'
                        thumb={prod}
                        onClick={this.toProd}
                        url='/pages/user/prod'/>
            {/*<i-cell title='商城订单' is-link url='/pages/user/prodorder'></i-cell>*/}
            <AtListItem title='加入我们'
                        arrow='right'
                        thumb={jiaru}
                        onClick={this.toJoin}
                        url='/pages/user/join'/>
            <AtListItem title='关于我们'
                        arrow='right'
                        thumb={about}
                        onClick={this.toAbout}
                        url='/pages/user/about'/>
            <AtListItem title='联系我们'
                        arrow='right'
                        thumb={lianxi}
                        onClick={this.toLianxi}
                        url='/pages/user/contact'/>
          </AtList>
        </view>
      )
    }

    if (role === 2) {
      view = (
        <i-cell-group>
          <i-cell title='我要接单' is-link url='/pages/admin/getorder'/>
          <i-cell title='我的订单' is-link url='/pages/admin/myorder'></i-cell>
          <i-cell title='历史订单' is-link url='/pages/admin/history'></i-cell>
          <i-cell title='手机号修改' is-link url='/pages/admin/modify'></i-cell>
        </i-cell-group>
      )
    }

    if (role === 3) {
      view = (
        <i-cell-group>
          <i-cell title='商城订单' is-link url='/pages/superadmin/prudorder'/>
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


const styles = {
  icon: {
    width: '20px',
    height: '20px'
  }
}
