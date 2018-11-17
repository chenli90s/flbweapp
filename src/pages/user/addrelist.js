import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import { connect} from '@tarojs/redux'
import http from '../../utils/http'
import './index.css'
import {editaddress, setaddress} from '../../actions/address'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"


const store = ({address})=>({addresser: address})
const action = (dispatch)=>({
  editaddress(payload){
    dispatch(editaddress(payload))
  },
  setaddress(payload){
    dispatch(setaddress(payload))
  }
});

@connect(store, action)
class addrelist extends Component{


  config = {
    navigationBarTitleText: '地址管理',
    usingComponents: {
      "i-card": "../../iview/card/index",
      "i-load-more": "../../iview/load-more/index",
      "i-button": "../../iview/button/index",
      "i-icon": "../../iview/icon/index",
    }
  };

  state = {
    list : [],
    load: false,
    isloading: false,
  }

  // componentDidMount = async ()=>{
  //   this.setState({load: true})
  //   let id = Taro.getStorageSync('id')
  //   let address = await http.get('/show_addr?unionid=' + id,);
  //   if(address.status===600){
  //     this.setState({load: false})
  //     return
  //   }
  //   this.setState({list: address.res, load: false})
  // };

  add = ()=>{
    this.props.editaddress(null);
    Taro.navigateTo({url: '/pages/addremg/editaddre'})
  };

  edit = (item)=>{
    this.props.editaddress(item)
    Taro.navigateTo({url: '/pages/addremg/editaddre'})
  };

  async componentDidShow () {
    this.setState({load: true})
    let id = Taro.getStorageSync('id')
    let address = await http.get('/show_addr?unionid=' + id,);
    if(address.status===600){
      this.setState({load: false})
      return
    }
    this.setState({list: address.res, load: false})
  }

  delete = async (item)=>{
    // todo 删除接口
    // console.log(item)
    this.setState({isloding: true})
    await http.get('/del_addr', {id: item.id})
    let id = Taro.getStorageSync('id')
    let address = await http.get('/show_addr?unionid=' + id,);
    if(address.status===600){
      this.setState({isloding: false, list: []})
      return
    }
    this.setState({list: address.res, isloding: false})
  };

  render(){
    const {list, load, isloading } = this.state
    // console.log(list)
    return (
      <View>
        <i-button onClick={this.add} type='success' long='true'>添加地址</i-button>
        {list.map((value, index) => (
          <i-card title={`${value.name}`} taroKey={index}>
            <view slot='content' className='i-contents'><i-icon type='addressbook_fill' />{`联系人：${value.name}`}</view>
            <view slot='content' className='i-contents'><i-icon type='mobilephone_fill' />{`联系电话：${value.phone}`}</view>
            <view slot='content' className='i-contents'><i-icon type='flag_fill' />{`地址: ${value.addr}`}</view>
            <view slot='content'>
              <i-button inline onClick={this.edit.bind(this, value)} type='success' size='small' shape='circle'>编辑</i-button>
              <i-button inline onClick={this.delete.bind(this, value)} type='error' size='small' shape='circle'>删除</i-button>
            </view>
          </i-card>
        ))}
        <i-load-more loading={load}></i-load-more>
        <AtModal isOpened={isloading}>
          <AtModalHeader>提交中</AtModalHeader>
          <AtModalContent>
            正在提交,请稍后.....
          </AtModalContent>
        </AtModal>
      </View>
    )
  }

}

export default addrelist
