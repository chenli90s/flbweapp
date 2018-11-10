import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import http from '../../utils/http'

class ProdOrder extends Component {


  // noinspection JSAnnotator
  config = {
    navigationBarTitleText: '我的商城订单',
    usingComponents: {
      "i-load-more": "../../iview/load-more/index",
      "i-icon": "../../iview/icon/index",
      "i-card": "../../iview/card/index",
      // "i-button": "../../iview/button/index",
      // "i-swipeout": "../../iview/swipeout/index"
    }
  }

  constructor(props) {
    super(props)
  }

  componentDidShow = async () => {
    this.reload()
  }

  reload = async ()=>{
    this.setState({load: true})
    let id = Taro.getStorageSync('id')
    let res = await http.get('/goods_order?', {unionid: id});
    if(res.status===600){
      this.setState({load: false});
      return
    }
    this.setState({load: false,data: res.res})
  }

  state = {
    load: false,
    data: []
  }


  // cancel = async (val) => {
  //   // console.log(val)
  //   await http.get('/del_corder', {order_id: val.id})
  //   this.reload()
  // }


  render() {
    let { load, data} = this.state;
    return (
      <View>
        {data&&data.map((value, id) => (
          <i-card title='' taroKey={id}>
            <view slot='content' className='i-contents'>
              <i-icon type='mobilephone_fill' />
              {`联系电话：${value.phone}`}</view>
            <view slot='content' className='i-contents'>
              <i-icon type='flag_fill' />
              {`地址: ${value.address}`}</view>
            <view slot='content' className='i-contents'>
              <i-icon type='activity_fill' />
              {`商品名称: ${value.goods_name}`}</view>
          </i-card>
        ))}
        <i-load-more loading={load}></i-load-more>
      </View>
    )
  }
}

export default ProdOrder
