import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import http from '../../utils/http'
import './index.css'
import {AtListItem, AtList} from 'taro-ui'


@connect(({ address })=>({addresser: address}), ()=>({}))
class EditAddre extends Component{

  config = {
    navigationBarTitleText: '地址管理',
    usingComponents: {
      "i-button": "../../iview/button/index",
      "i-input": "../../iview/input/index",
      "i-panel": "../../iview/panel/index",
    }
  };

  // phone:233 2332 3
  // addr:3dadad
  // name:chen
  // unionid:ountK09Ojlno8JRCAuADz7pIoJdA
  state = {
    phone: '',
    name: '',
    addr: ''
  };

  componentDidMount = ()=>{
    let {editaddress} = this.props.addresser
    if(editaddress){
      Taro.setNavigationBarTitle({title: '修改地址'})
      this.setState(editaddress)
    }else {
      Taro.setNavigationBarTitle({title: '新增地址'})
    }

  };


  isSubmit = false
  submit = async ()=>{

    let { editaddress } = this.props.addresser;
    let id = Taro.getStorageSync('id');
    let {phone, name, addr} = this.state;
    if(!phone||!name||!addr){
      wx.showToast({title:'填写内容不能为空', duration: 1500, icon: 'none'})
      return
    }
    if(this.isSubmit){
      return
    }else {
      this.isSubmit = true
    }
    if(editaddress){
      await http.get('/xiu_addr', {unionid: id, ...this.state})
    }else {
      await http.get('/add_addr', {unionid: id, ...this.state})
    }
    this.isSubmit = false
    wx.navigateBack()
  };

  onname = (e)=>{
    this.setState({name: e.detail.detail.value})
  }

  onphone = (e)=>{
    this.setState({phone: e.detail.detail.value})
  }

  onaddr = (e)=>{
    this.setState({addr: e.detail.detail.value})
  }

  toMap = ()=>{Taro.navigateTo({url:'/pages/addremg/map'})}

  render(){
    let { editaddress } = this.props.addresser
    let title = editaddress? '更新地址':'添加地址'
    return (
      <View>
        <i-panel title={title}>
          <i-input value={this.state.name} title='收货人' autofocus placeholder='名字' onChange={this.onname} />
          <i-input value={this.state.phone} onChange={this.onphone} type='number' title='联系电话' placeholder='请输入手机号' />
          <i-input value={this.state.addr} onChange={this.onaddr} type='textarea' title='详细地址' placeholder='请输入详细地址(最多50字)' maxlength='50' />
          {/*<AtList>*/}
            {/*<AtListItem*/}
              {/*title='详细地址'*/}
              {/*note='描述信息'*/}
              {/*// extraText='详细信息'*/}
              {/*arrow='right'*/}
              {/*onClick={this.toMap}*/}
              {/*iconInfo={{*/}
                {/*size: 25,*/}
                {/*color: '#19be6b',*/}
                {/*value: 'map-pin',*/}
              {/*}}*/}
            {/*/>*/}
          {/*</AtList>*/}
        </i-panel>
        <i-button onClick={this.submit} type='success'>提交</i-button>
      </View>

    )
  }

}


export default EditAddre
