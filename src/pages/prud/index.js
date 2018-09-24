import Taro, {Component} from '@tarojs/taro'
import {View, OpenData, Text} from '@tarojs/components'
import http from '../../utils/http'
import loda from 'lodash/array'

import './index.css'

class Preduct extends Component {

  config = {
    navigationBarTitleText: '积分兑换商城',
    usingComponents: {
      "i-grid": "../../iview/grid/index",
      "i-grid-item": "../../iview/grid-item/index",
      "i-grid-icon": "../../iview/grid-icon/index",
      "i-grid-label": "../../iview/grid-label/index",
      'i-row': '../../iview/row/index',
      'i-button': '../../iview/button/index'
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() {
  }

  state = {
    list: [],
    score: 0
  }

  async componentDidShow() {
    let result = await http.get('/goods_list');
    let id = Taro.getStorageSync('id')
    let user = await http.get('/integral', {unionid:id});
    this.setState({list: result.res, score:user.integral})
  }

  componentDidHide() {
  }
  isSubmit = false
  async submit(val){

    if(this.state.score<val.need_int){
      wx.showToast({title:'积分不够', duration: 1500, icon: 'none'})
      return
    }
    let id = Taro.getStorageSync('id')
    //todo : 提交时解开注释
    let role = await http.get('/per_info', {unionid: id})
    if(role.role>1){
      wx.showToast({title:'管理员，接单员无法提交', duration: 1500, icon: 'none'})
      return
    }

    // if(this.isSubmit){
    //   return
    // }else {
    //   this.isSubmit = true
    // }
    Taro.navigateTo({url:`/pages/prud/submitprod?point=${val.need_int}&goodid=${val.id}`})

  }

  render() {
    let {list, score} = this.state
    let group = loda.chunk(list, 2)
    let render = group.map((g, index) => {
      return (
        <i-row key={index}>
          <i-grid>
          {
            g.map(val => (
                <i-grid-item key={val.id}>
                  {/*<i-grid-icon i-class="i-prod-icon">*/}
                    <image src={`https://www.hlfeilibao.com${val.url}`} className='i-prod-icon' />
                  {/*</i-grid-icon>*/}
                  <i-grid-label>{val.goods_name}</i-grid-label>
                  <i-grid-label>{`积分： ${val.need_int}`}</i-grid-label>
                  <i-grid-label>
                    <i-button size='small' type='success' inline shape='circle' onClick={this.submit.bind(this,val)}>兑换</i-button>
                  </i-grid-label>
                </i-grid-item>
            ))
          }
          </i-grid>
        </i-row>
      )
    })
    return (
      <View className='i-prod'>
        <View className='i-userinfo'>
          <View className='i-avate'>
            <OpenData type='userAvatarUrl'></OpenData>
          </View>
          <View className='i-info-text'>
            <OpenData type='userNickName' />
            <Text>积分：{score}</Text>
          </View>
        </View>
        {render}
      </View>
    )
  }
}

export default Preduct
