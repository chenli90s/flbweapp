import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import http from '../../utils/http'
import './index.css'

class GetOrder extends Component{
  config = {
    navigationBarTitleText: '商城订单',
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
    let res = await http.get('/all_goods', {unionid: id})
    let lists = res.res
    this.setState({lists})
  }

  async componentDidShow() {
    this.reload()
  }
  isSubmit = false
  async get(val){
    if(this.isSubmit){
      return
    }else {
      this.isSubmit = true
    }
    let id = Taro.getStorageSync('id');
    await http.get('/set_goods', {id: val.id, unionid: id})
    wx.showToast({title:'接单成功', duration: 1500, icon: 'none'})
    this.isSubmit = false
    this.reload()
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
              {`商品名称: ${value.goods_name}`}</view>
            <view slot='content' className='i-contents'>
              <i-icon type='mobilephone_fill' />
              {`电话: ${value.phone}`}</view>
            <view slot='content' className='i-contents'>
              <i-icon type='flag_fill' />
              {`地址: ${value.addr}`}</view>
            <view slot='content'>
              <i-button inline onClick={this.get.bind(this, value)} type='warning' size='small' shape='circle'>接单
              </i-button>
            </view>
          </i-card>
        ))}
        {lists.length<=0?<view className={'null-order'}>无订单</view>:''}
      </View>)
  }
}

export default GetOrder
