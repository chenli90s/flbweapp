import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import http from '../../utils/http'
import './index.css'

class GetOrder extends Component{
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
    lists: [],
    isload: false
  }

  async reload(){
    let id = Taro.getStorageSync('id');
    this.setState({isload: true})
    let res = await http.get('/super_history', {unionid: id})
    let lists = res.res.slice(0,500);
    this.setState({lists, isload: false})
  }

  async componentDidShow() {
    this.reload()
  }



  render(){
    let {lists, isload} = this.state
    return (
      <View>
        {lists.map(value => (
          <i-card title='' key={value.id}>
            <view slot='content' className='i-contents'>
              <i-icon type='group_fill' />
              {`姓名: ${value.name}`}</view>
            <view slot='content' className='i-contents'>
              <i-icon type='mobilephone_fill' />
              {`电话: ${value.phone}`}</view>
            <view slot='content' className='i-contents'>
              <i-icon type='flag_fill' />
              {`地址: ${value.address}`}</view>
            <view slot='content' className='i-contents'>
              <i-icon type='publishgoods_fill' />
              {`重量: ${value.weight}斤`}</view>
            <view slot='content' className='i-contents'>
              <i-icon type='flag_fill' />
              {`价格: ${value.money}元`}</view>
            <view slot='content' className='i-contents'>
              <i-icon type='time_fill' />
              {`完成时间: ${value.time.split('T').join(' ')}`}</view>
            <view slot='content' className='i-contents'>
              <i-icon type='flag_fill' />
              {`接单员: ${value.recv}`}</view>
            <view slot='content' className='i-contents'>
              <i-icon type='praise_fill' />
              {`评价: ${value.common||'未评价'}`}</view>
          </i-card>
        ))}
        {/*{lists.length<=0?<view className={'null-order'}>无订单</view>:''}*/}
        {isload?<view className={'null-order'}>正在加载。。。。请稍等！！！！</view>:''}
      </View>)
  }
}

export default GetOrder
