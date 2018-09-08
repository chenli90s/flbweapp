import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import http from '../../utils/http'
import './index.css'

class GetOrder extends Component{
  config = {
    navigationBarTitleText: '用户管理',
    usingComponents: {
      "i-load-more": "../../iview/load-more/index",
      "i-icon": "../../iview/icon/index",
      "i-card": "../../iview/card/index",
      "i-button": "../../iview/button/index",
      // "i-modal": "../../iview/modal/index",
      // "i-input": "../../iview/input/index",
    }
  }

  state = {
    lists: []
  }

  async reload(){
    let id = Taro.getStorageSync('id');
    let res = await http.get('/show_user', {unionid: id})
    let lists = res.res;
    this.setState({lists})
  }

  async componentDidShow() {
    this.reload()
  }

  async resolve(val){
    let id = Taro.getStorageSync('id');
    await http.get('/set_user', {id: val.id, unionid: id})
    wx.showToast({title:'申请成功', duration: 1500, icon: 'none'})
    this.reload()
  }

  async reject(val){
    let id = Taro.getStorageSync('id');
    await http.get('/quxiao_user', {id: val.uid, unionid: id})
    wx.showToast({title:'拒绝成功', duration: 1500, icon: 'none'})
    this.reload()
  }


  render(){
    let {lists} = this.state
    return (
      <View>
        {lists.map(value => (
          <i-card title='' key={value.id}>
            <view slot='content' className='i-contents'>
              <i-icon type='group_fill' />
              {`姓名: ${value.real_name}`}</view>
            <view slot='content' className='i-contents'>
              <i-icon type='mobilephone_fill' />
              {`电话: ${value.mobile}`}</view>
            <view slot='content' className='i-contents'>
              <i-icon type='flag_fill' />
              {`车型: ${value.self_type}`}</view>
            <view slot='content'>
              <i-button inline onClick={this.resolve.bind(this, value)} type='warning' size='small' shape='circle'>同意申请
              </i-button>
              <i-button inline onClick={this.reject.bind(this, value)} type='warning' size='small' shape='circle'>拒绝申请
              </i-button>
            </view>
          </i-card>
        ))}
        {lists.length<=0?<view className={'null-order'}>无订单</view>:''}
      </View>)
  }
}

export default GetOrder
