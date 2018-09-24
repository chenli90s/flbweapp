import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import http from '../../utils/http'


class SubmitProd extends Component{

  config = {
    navigationBarTitleText: '商品订单提交',
    usingComponents: {
      "i-input": "../../iview/input/index",
      "i-button": "../../iview/button/index"
    }
  };

  state = {
    point:null,
    phone:null,
    addr:null,
    goodid:null,
    name: null
  }

  async componentDidShow() {
    let param = this.$router.params
    console.log(param)
    this.setState(param)
  }

  onname = (e)=>{
    this.setState({name: e.detail.detail.value})
  }

  onphone = (e)=>{
    this.setState({phone: e.detail.detail.value})
  }
  onaddr = (e)=>{
    this.setState({addr: e.detail.detail.value})
  }

  isSubmit = false
  async submit(){

    if(!this.state.phone||!this.state.addr){
      wx.showToast({title:'地址不能为空', duration: 1500, icon: 'none'});
      return
    }
    let id = Taro.getStorageSync('id');
    let result = await http.get('/per_info', {unionid: id});
    if(result.role>1){
      wx.showToast({title:'管理员和接单员不能下单', duration: 1500, icon: 'none'});
      return
    }
    if(this.isSubmit){
      return
    }else {
      this.isSubmit = true
    }
    let res = await http.get('/goods_duihuan', {...this.state, unionid:id});
    console.log(res)
    this.isSubmit = false
    wx.navigateBack()
  }
  render(){
    let {name, addr, phone} = this.state
    return(
      <View>
        <i-input value={name} title='收货人'
          onChange={this.onname}
          autofocus placeholder='名字'
        />
        <i-input value={phone} type='number'
          onChange={this.onphone}
          title='联系电话' placeholder='请输入手机号'
        />
        <i-input value={addr} type='textarea' title='详细地址'
          onChange={this.onaddr}
          placeholder='请输入详细地址(最多50字)' maxlength='50'
        />
        <i-button type='success' onClick={this.submit}>提交</i-button>
      </View>
    )
  }
}


export default SubmitProd
