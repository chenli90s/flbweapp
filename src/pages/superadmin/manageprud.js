import Taro, {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import http from '../../utils/http'
import './index.css'

class GetOrder extends Component{
  config = {
    navigationBarTitleText: '商品管理',
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
    let res = await http.get('/goods_list', {unionid: id})
    let lists = res.res;
    this.setState({lists})
  }

  async componentDidShow() {
    this.reload()
  }

  async resolve(val){

    Taro.navigateTo({
      url: `/pages/superadmin/editprud?id=${val.id}&name=${val.goods_name}&need_int=${val.need_int}&jia=${val.jia}&url=${val.url}`,
    })
  }

  async reject(val){
    let id = Taro.getStorageSync('id');
    await http.get('/quxiao_user', {id: val.uid, unionid: id})
    wx.showToast({title:'拒绝成功', duration: 1500, icon: 'none'})
    this.reload()
  }

  add(){
    Taro.navigateTo({
      url: `/pages/superadmin/editprud`
    })
  }

  render(){
    let {lists} = this.state
    return (
      <View className={'i-bodys'}>
        <i-button onClick={this.add.bind(this, value)} type='success' >添加商品
        </i-button>
        {lists.map(value => (
          <view key={value.id} className={'i-items'}>
            <view className={'imgs'}>
            <Image src={`https://www.hlfeilibao.com${value.url}`} className={'i-images'}></Image>
            </view>
          <view title='' key={value.id}>
            <view slot='content' className='contents'>
              <i-icon type='group_fill' />
              {`名称: ${value.goods_name}`}</view>
            <view slot='content' className='contents'>
              <i-icon type='mobilephone_fill' />
              {`积分: ${value.need_int}`}</view>
            <view slot='content' className='contents'>
              <i-icon type='flag_fill' />
              {`价格: ${value.jia}`}</view>
          </view>
            <view slot='content' className={'i-btns'}>
              <i-button inline onClick={this.resolve.bind(this, value)} type='warning' size='small' shape='circle'>修改
              </i-button>
              <i-button inline onClick={this.reject.bind(this, value)} type='warning' size='small' shape='circle'>删除
              </i-button>
            </view>
          </view>
        ))}
        {lists.length<=0?<view className={'null-order'}>正在加载</view>:<view className={'null-order'}>加载完成</view>}
      </View>)
  }
}

export default GetOrder
