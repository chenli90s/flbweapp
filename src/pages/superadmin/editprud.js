import Taro, {Component} from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import http from '../../utils/http'
import image from '../../img/image.png'

class Join extends Component {


  config = {
    navigationBarTitleText: '商品编辑',
    usingComponents: {
      "i-input": "../../iview/input/index",
      "i-button": "../../iview/button/index",
    }
  };

  state = {
    truename: null,
    need_int: null,
    jia: null,
    url: null
  }

  async componentDidShow() {
    let r = this.$router.params
    let keys = Object.keys(r)
    if(keys.length>0){
      console.log(r)
      this.setState({truename: r.name, ...r})
    }else {
      console.log('====')
    }

  }

  onname = e=>{
    this.setState({truename: e.detail.detail.value})
  }

  onphone = e => {
    this.setState({need_int: e.detail.detail.value})
  }
  onjia = e => {
    this.setState({jia: e.detail.detail.value})
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
    if(!this.state.phone&&!this.state.truename){
      wx.showToast({title:'填写内容不能为空', duration: 1500, icon: 'none'})
      return
    }
    let id = Taro.getStorageSync('id');
    let {truename, phone, type } = this.state
    await http.get('/applys', {truename, phone, type, unionid: id})
    wx.showToast({title:'提交成功，等待管理员审核', duration: 1500, icon: 'none'})
    setTimeout(()=>{
      wx.navigateBack()
    }, 1500)
  }



  choseimg(){
    let suc = (obj)=>{
      console.log(obj)
      this.setState({url: obj.tempFilePaths[0]})
    }
    wx.chooseImage({
      count: 1,
      sizeType: 'original',
      success:suc,
    })
  }

  render() {
    let {truename, need_int, jia, url} = this.state
    return (
      <View>
        <view>
          <Image src={url?url.split(':').length<2?`https://www.hlfeilibao.com${url}`:url:image} onClick={this.choseimg}></Image>
        </view>
        <i-input value={truename} title='商品名称' autofocus placeholder='请输入商品名称' onChange={this.onname} />
        <i-input value={need_int} type='number' title='积分' placeholder='请输入所需积分' onChange={this.onphone} />
        <i-input value={jia} title='价格' placeholder='请输入所需价格' onChange={this.onjia} />
        <i-button type='success' onClick={this.submit}>提交</i-button>
      </View>
    )
  }
}

export default Join
