import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtInput, AtForm} from 'taro-ui'
import http from '../../utils/http'



class Modify extends Component {

  config = {
    navigationBarTitleText: '修改电话号',
    usingComponents: {
      "i-button": "../../iview/button/index"
    },
  }

  state = {
    mobile:''
  }


  handleChange(e){
    this.setState({mobile: e})
  }

  async submit(){
    let id = Taro.getStorageSync('id')
    let param = {mobile: this.state.mobile, unionid: id}
    // console.log(param)
    let res = await http.get('/update_phone', param);
    console.log(res)
    wx.navigateBack()
  }

  render(){

    return(
      <View>
        <AtForm>
        <AtInput
          border={false}
          title='手机号码'
          type='phone'
          placeholder='手机号码'
          value={this.state.mobile}
          onChange={this.handleChange.bind(this)}
        /></AtForm>
        <i-button onClick={this.submit} type='success'>提交</i-button>
      </View>
    )
  }
}

export default Modify




