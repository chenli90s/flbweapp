import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import http from '../../utils/http'


class Join extends Component {


  config = {
    navigationBarTitleText: '加入我们',
    usingComponents: {
      "i-input": "../../iview/input/index",
      "i-button": "../../iview/button/index",
      "i-action-sheet": "../../iview/action-sheet/index",
      "i-cell": "../../iview/cell/index"    }
  };

  state = {
    truename: null,
    phone: null,
    type: '货车',
    visible: false,
    action: [
      {
        name: '三轮车',
      },
      {
        name: '货车'
      },
    ]
  }

  onname = e=>{
    this.setState({truename: e.detail.detail.value})
  }

  onphone = e => {
    this.setState({phone: e.detail.detail.value})
  }

  select(){
    this.setState({visible: true})
  }

  selected(e){
    console.log(e)
    let { index } = e.detail
    this.setState({type: this.state.action[index].name, visible:false})
  }

  async submit(){
    // if(!this.state.phone&&!this.state.truename){
    //   wx.showToast({title:'填写内容不能为空', duration: 1500, icon: 'none'})
    //   return
    // }
    let id = Taro.getStorageSync('id');
    let {truename, phone, type } = this.state
    await http.get('/applys', {truename, phone, type, unionid: id})
    wx.showToast({title:'提交成功，等待管理员审核', duration: 1500, icon: 'none'})
    setTimeout(()=>{
      wx.navigateBack()
    }, 1500)
  }

  cancel(){
    this.setState({visible: false})
  }

  render() {
    let {truename, phone, type, visible, action} = this.state
    return (
      <View>
        <i-input value={truename} title='联系人' autofocus placeholder='名字' onChange={this.onname} />
        <i-input value={phone} type='number' title='联系电话' placeholder='请输入手机号' onChange={this.onphone} />
        <i-cell title='车辆类型' value={type} onClick={this.select}></i-cell>
        <i-button type='success' onClick={this.submit}>提交</i-button>
        <i-action-sheet visible={visible} mask-closable show-cancel
          actions={action}
          onCancel={this.cancel}
          onClick={this.selected}
        />
      </View>
    )
  }
}

export default Join
