import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import http from '../../utils/http'

class MyOrder extends Component {


  // noinspection JSAnnotator
  config = {
    navigationBarTitleText: '我的订单',
    usingComponents: {
      "i-tabs": "../../iview/tabs/index",
      "i-tab": "../../iview/tab/index",
      "i-load-more": "../../iview/load-more/index",
      "i-icon": "../../iview/icon/index",
      "i-card": "../../iview/card/index",
      "i-button": "../../iview/button/index",
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
    let res = await http.get('/my_order?', {unionid: id});
    let data = {
      now: [],
      in: [],
      succ: []
    };
    if (res.res) {
      for (let val of res.res) {
        if (val.status == '等接单') {
          data.now.push(val)
        } else if (val.status == '上门中') {
          data.in.push(val)
        } else {
          data.succ.push(val)
        }
      }
      this.setState({data})
    }
    this.setState({load: false})
  }

  state = {
    current: 'now',
    data: {
      now: [],
      in: [],
      succ: []
    },
    load: false
  }

  handleChange = (e) => {
    this.setState({current: e.detail.key})
  }

  cancel = async (val) => {
    // console.log(val)
    await http.get('/del_corder', {order_id: val.id})
    this.reload()
  }


  render() {
    let {current, load, data} = this.state;
    let list = data[current];
    return (
      <View>
        <i-tabs current={current} color='green' onChange={this.handleChange}>
          <i-tab ikey='now' title='等接单'></i-tab>
          <i-tab ikey='in' title='上门中'></i-tab>
          <i-tab ikey='succ' title='已完成'></i-tab>
        </i-tabs>
        {list.map(value => (
          <i-card title='' key={value.id}>
            {/*<View slot='content' className='i-contents'>*/}
              {/*<i-icon type='addressbook_fill' />*/}
              {/*{`联系人：${value.name}`}</View>*/}
            <view slot='content' className='i-contents'>
              <i-icon type='mobilephone_fill' />
              {`联系电话：${value.phone}`}</view>
            <view slot='content' className='i-contents'>
              <i-icon type='flag_fill' />
              {`地址: ${value.address}`}</view>
            <view slot='content' className='i-contents'>
              <i-icon type='time_fill' />
              {`上门时间: ${value.sm_time}`}</view>
            {value.status == '等接单' ? <view slot='content'>
              <i-button inline onClick={this.cancel.bind(this, value)} type='warning' size='small' shape='circle'>取消订单
              </i-button>
            </view> : <view></view>}
          </i-card>
        ))}
        <i-load-more loading={load}></i-load-more>
      </View>
    )
  }
}

export default MyOrder
