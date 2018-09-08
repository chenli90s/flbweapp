import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import http from '../../utils/http'



class EditAddre extends Component{

  config  = {
    navigationBarTitleText: '结算',
    usingComponents: {
      "i-button": "../../iview/button/index",
      "i-input": "../../iview/input/index",
      "i-panel": "../../iview/panel/index",
    }
  };


  state = {
    pice: '',
    weight: '',
    pices: ''
  };

  componentDidMount = ()=>{


  };

  submit = async ()=>{
    let id = Taro.getStorageSync('id');
    let order_id = this.$router.params.id
    let {weight, pices, pice} = this.state
    if(!weight||!pice){
      wx.showToast({title:'单价和重量不能为空,不能出现汉字', duration: 1500, icon: 'none'})
      return
    }
    await http.get('/complete_order', {unionid: id, order_id, pices, real_weight: weight})
    wx.navigateBack()
  };

  onname = (e)=>{
    let { weight } = this.state
    let val = e.detail.detail.value
    weight = parseFloat(weight)
    let fl = val.split('.')
    if(fl.length>1&&fl[1]){
      val = parseFloat(val)
      this.setState({pice: val.toString(), pices: (weight*val).toFixed(2)})
    }else if(fl.length>1){
      this.setState({pice: val})
    }else if(val){
      val = parseInt(val)
      if(val.toString()=='NaN'){
        return
      }
      this.setState({pice: val.toString(), pices: (weight*val).toFixed(2)})
    }else {
      this.setState({pice: val, pices: ''})
    }
  }

  onphone = (e)=>{
    let { pice } = this.state
    let val = e.detail.detail.value
    pice = parseFloat(pice)
    let fl = val.split('.')
    if(fl.length>1&&fl[1]) {
      val = parseFloat(val)
      this.setState({weight: val.toString(), pices: (pice*val).toFixed(2)})
    }else if(fl.length>1){
      this.setState({weight: val})
    }else if (val) {
      val = parseInt(val)
      if(val.toString()=='NaN'){
        return
      }
      this.setState({weight: val.toString(), pices: (pice*val).toFixed(2)})
    }else {
      this.setState({weight: val, pices: ''})
    }
  }


  render(){
    let { pice, weight, pices} = this.state
    return (
      <View>
        <i-input value={pice} title='单价' autofocus placeholder='请输入单价' onChange={this.onname} />
        <i-input value={weight} onChange={this.onphone} title='重量' placeholder='请输入重量' />
        <i-input value={pices} onChange={this.onaddr} title='价格' maxlength='50' />
        <i-button onClick={this.submit} type='success'>提交</i-button>
      </View>

    )
  }

}


export default EditAddre
