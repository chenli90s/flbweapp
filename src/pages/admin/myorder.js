import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import http from '../../utils/http'
import './index.css'

class MyOrder extends Component{
  config = {
    navigationBarTitleText: '我的订单',
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
    let res = await http.get('/my_order', {unionid: id});
    if(res.status===600){
      this.setState({lists: []})
      return
    }
    this.setState({lists: res.res})
  }

  async componentDidShow() {
    this.reload()
    console.log('------')
  }



  async get(val){
    //
    // 跳转
    Taro.navigateTo({url:`/pages/admin/calc?id=${val.id}`})
  }

  chat(val){
    Taro.navigateTo({
      url: `/pages/chat/index?id=${val.id}&type=2`
    })
  }
  

  render(){
    let {lists} = this.state
    return (
      <View>
        {lists.map(value => (
          <i-card title='' taroKey={value.id}>
            <view slot='content' className='i-contents'>
              <i-icon type='label_fill' />
              {`订单号: ${value.id}`}</view>
            <view slot='content' className='i-contents'>
              <i-icon type='group_fill' />
              {`名字: ${value.name}`}</view>
            <view slot='content' className='i-contents'>
              <i-icon type='mobilephone_fill' />
              {`电话: ${value.phone}`}</view>
            <view slot='content' className='i-contents'>
              <i-icon type='flag_fill' />
              {`地址: ${value.address}`}</view>
            <view slot='content' className='i-contents'>
              <i-icon type='time_fill' />
              {`上门时间: ${value.smtime}`}</view>
            <view slot='content' className='i-contents'>
              <i-icon type='shop_fill' />
              {`货品类型: ${value.something}`}</view>
            <view slot='content' className='i-contents'>
              <i-icon type='publishgoods_fill' />
              {`重量: ${value.weight}`}</view>
            <view slot='content' className='i-contents'>
              <i-icon type='praise_fill' />
              {`是否赠送: ${value.type?'是':'否'}`}</view>
            <view slot='content'>
              <i-button inline onClick={this.chat.bind(this, value)} type='success' size='small' shape='circle'>发送消息
              </i-button>
              <i-button inline onClick={this.get.bind(this, value)} type='warning' size='small' shape='circle'>完成订单
              </i-button>
            </view>
          </i-card>
            ))}
        {lists.length<=0?<view className={'null-order'}>无订单</view>: ''}
      </View>)
    }
}

export default MyOrder
