import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import http from '../../utils/http'

class MyOrder extends Component{
  config = {
    navigationBarTitleText: '历史订单',
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
    let res = await http.get('/history', {unionid: id});
    if(res.status===600){
      return
    }
    this.setState({lists: res.res})
  }

  async componentDidShow() {
    this.reload()
  }

  async get(val){
    //
    // 跳转
    Taro.navigateTo({url:`/pages/admin/calc?id=${val.id}`})
  }


  render(){
    let {lists} = this.state
    return (
      <View>
        {lists.map(value => (
          <i-card title='' key={value.id}>
            <view slot='content' className='i-contents'>
              <i-icon type='label_fill' />
              {`订单号: ${value.id}`}</view>
            <view slot='content' className='i-contents'>
              <i-icon type='group_fill' />
              {`名字: ${value.name}`}</view>
            <view slot='content' className='i-contents'>
              <i-icon type='flag_fill' />
              {`地址: ${value.address}`}</view>
            <view slot='content' className='i-contents'>
              <i-icon type='time_fill' />
              {`完成时间: ${value.time.split('T').join(' ')}`}</view>
            <view slot='content' className='i-contents'>
              <i-icon type='publishgoods_fill' />
              {`重量: ${value.weight}`}</view>
            <view slot='content' className='i-contents'>
              <i-icon type='praise_fill' />
              {`价格: ${value.money||'0'}`}</view>
            <view slot='content' className='i-contents'>
              <i-icon type='praise_fill' />
              {`评价: ${value.common||'未评价'}`}</view>
          </i-card>
        ))}
      </View>)
  }
}

export default MyOrder
