import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import http from '../../utils/http'
import './index.css'
import {AtInput, AtForm, AtBadge, AtButton} from 'taro-ui'

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
      "i-modal": "../../iview/modal/index",
      "i-input": "../../iview/input/index",
      "i-rate": "../../iview/rate/index",
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
    if(res.status===600) {
      this.setState({data})
    }
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
    let unread = await http.get('/no_read', {unionid: id})
    this.setState({unread: unread.res})
  }

  state = {
    current: 'now',
    data: {
      now: [],
      in: [],
      succ: []
    },
    load: false,
    showcommon: false,
    currentid: null,
    common: '',
    starts: 0,
    comment: '',
    unread: []
  }

  handleChange = (e) => {
    this.setState({current: e.detail.key})
  }

  cancel = async (val) => {
    // console.log(val)
    await http.get('/del_corder', {order_id: val.id})
    this.reload()
  }

  common(val){
    this.setState({showcommon: true, currentid: val.id})
  }

  async ok(){
    let res = await http.get('/add_common', {common: this.state.common, id: this.state.currentid, comment:this.state.comment})
    // console.log(res)
    await this.reload()
    this.setState({showcommon: false})
  }

  quit(){
    this.setState({showcommon: false})
  }

  oncommon(val){
    // console.log(val)
    this.setState({common: val.detail.detail.value})
  }

  changeStart(val){
    // console.log(val)
    let starts = val.detail.index
    let common = starts==2?'满意':starts==1?'差评':starts==3?'非常满意':'未评价'
    this.setState({starts: val.detail.index, common})
  }

  sendMsg(val){
    Taro.navigateTo({
      url: `/pages/chat/index?id=${val.id}&type=1`
      // url: `/pages/chat/index?id=${val.id}&type=2`
    })
  }

  comments(comment){
    this.setState({comment})
  }

  render() {
    let {current, load, data, showcommon, common, starts, unread} = this.state;
    let list = data[current];
    return (
      <View className='myorder'>
        <i-tabs current={current} color='green' onChange={this.handleChange}>
          <i-tab ikey='now' title='等接单'></i-tab>
          <i-tab ikey='in' title='上门中'></i-tab>
          <i-tab ikey='succ' title='已完成'></i-tab>
        </i-tabs>
        {list.map(value => (
          <i-card title='' taroKey={value.id}>
            {/*<View slot='content' className='i-contents'>*/}
              {/*<i-icon type='addressbook_fill' />*/}
              {/*{`联系人：${value.name}`}</View>*/}
            {/*<view slot='content' className='i-contents'>*/}
              {/*<i-icon type='mobilephone_fill' />*/}
              {/*{`联系电话：${value.phone}`}</view>*/}
            <view slot='content' className='i-contents'>
              <i-icon type='flag_fill' />
              {`地址: ${value.address}`}</view>
            <view slot='content' className='i-contents'>
              <i-icon type='time_fill' />
              {`上门时间: ${value.sm_time}`}</view>
            {value.recv_name?<view slot='content' className='i-contents'>
              <i-icon type='time_fill' />
              {`接单员: ${value.recv_name}`}</view>: ''}
            {value.recv_mobile?<view slot='content' className='i-contents'>
              <i-icon type='mobilephone_fill' />
              {`接单员电话: ${value.recv_mobile}`}</view>:''}
            {value.common?<view slot='content' className='i-contents'>
              <i-icon type='interactive' />
              {`评价: ${value.common}`}</view>:''}
            {value.status == '等接单' ? <view slot='content' >
              <i-button inline onClick={this.cancel.bind(this, value)} type='warning' size='small' shape='circle'>取消订单
              </i-button>
            </view> : <view></view>}
            {value.status == '上门中' ? <View slot='content' style={{marginTop: '15px'}} >
              <AtBadge value={unread.indexOf(value.id)==-1?'':'有未读消息'}>
              <AtButton inline onClick={this.sendMsg.bind(this, value)} type='secondary' size='small' shape='circle'>发送消息
              </AtButton></AtBadge>
            </View> : <view></view>}
            {value.status == '已完成'&&!value.common ? <view slot='content'>
              <i-button inline onClick={this.common.bind(this, value)} type='warning' size='small' shape='circle'>评价
              </i-button>
            </view> : <view></view>}
          </i-card>
        ))}
        <i-load-more loading={load}></i-load-more>
        <i-modal title='评价' visible={showcommon} onOk={this.ok} onCancel={this.quit}>
          {/*<i-input value={common} type='textarea'*/}
            {/*onChange={this.oncommon}*/}
            {/*placeholder='' maxlength='50'*/}
          {/*/>*/}
          <i-rate
            onChange={this.changeStart}
            size="40"
            count={3}
            value={starts}>
          </i-rate>
          <View>{starts==2?'满意':starts==1?'差评':starts==3?'非常满意':''}</View>
          <AtForm>
          <AtInput placeholder="请输入不低于15字的评价" value={this.state.comment} onChange={this.comments.bind(this)}/>
          </AtForm>
        </i-modal>
      </View>
    )
  }
}

export default MyOrder
