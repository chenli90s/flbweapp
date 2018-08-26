import Taro, {Component} from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import {View, Picker} from '@tarojs/components'
import http from '../../utils/http'
import { setaddress } from "../../actions/address";

const store = ({address}) => ({addresser:address});
const action = (dispatch) =>({setaddress(payload){dispatch(setaddress(payload))}})

@connect(store, action)
class Form extends Component{

  config = {
    navigationBarTitleText: '',
    usingComponents: {
      "i-input": "../../iview/input/index",
      "i-panel": "../../iview/panel/index",
      "i-cell-group": "../../iview/cell-group/index",
      "i-cell": "../../iview/cell/index",
      "i-switch": "../../iview/switch/index",
      "i-icon": "../../iview/icon/index",
      "i-button": "../../iview/button/index",
    }
  };

  constructor(props){
    super(props)
    let title = this.$router.params.name||''
    Taro.setNavigationBarTitle({title})
    this.state = {
      dateSel: new Date().toLocaleDateString().split('/').join('-'),
      timeSel: new Date().toTimeString().split(' ')[0],
      weight: null,
      type: null,
      isGive: false,
      addre: null
    }
  }


  // componentWillReceiveProps (nextProps) {
  //   // console.log(this.props, nextProps)
  // }


  handleDateChange = e=>{
    // console.log(e)
    this.setState({dateSel: e.detail.value})
  }

  handleTimeChange = e=>{
    // console.log(e)
    this.setState({timeSel: e.detail.value})
  }

  switchChange = () =>{
    this.setState({isGive: !this.state.isGive})
  }

  onWeight = e =>{
    // console.log(e)
    this.setState({weight: e.detail.detail.value})
  }

  onType = e =>{
    // console.log(e)
    this.setState({type: e.detail.detail.value})
  }

  componentDidMount = async ()=>{
    console.log(this.props)
    let id = Taro.getStorageSync('id')
    let address = await http.get('/show_addr?unionid=' + id,);
    // console.log(address)

    // {addr: "给你我招惹他", id: 56, phone: "859 6494 9646", name: "小心二"}
    // {addr: "另外一距离我", id: 59, phone: "848 5656 6", name: "哦哦哦low"}
    if(address.res.length>0){
      // this.setState({addre: address.res[0]})
      this.props.setaddress(address.res[0])
    }
  }

  submit = async ()=>{
    const {address} = this.props.addresser;
    if(!address){
      wx.showToast({title:'地址不能为空', duration: 1500, icon: 'none'})
      return
    }
    let id = Taro.getStorageSync('id');
    this.state.addre = address
    let params = {
      weight: this.state.weight,
      something: this.state.type,
      address: this.state.addre.addr,
      phone: this.state.addre.phone,
      unionid: id,
      smtime: this.state.dateSel+' '+this.state.timeSel,
      name: this.state.addre.name
    };
    await http.get('/place_order', params)
    // 跳转
    Taro.navigateTo({url:'/pages/user/myorder'})
  }

  render(){
    const {dateSel, timeSel, type, weight, isGive} = this.state
    const {address} = this.props.addresser;
    return (
      <View>
        <i-cell-group>
          <i-cell title='选取地址' value={address&&address.addr} is-link url='/pages/addremg/addrelist'></i-cell>
          <Picker mode='date' onChange={this.handleDateChange} value={dateSel}>
            <i-cell title='取货日期' value={dateSel} ></i-cell>
          </Picker>
          <Picker mode='time' onChange={this.handleTimeChange} value={timeSel}>
            <i-cell title='取货时间' value={timeSel} ></i-cell>
          </Picker>
          <i-input value={weight} type='number' right onChange={this.onWeight} title='预估重量' placeholder='单位（斤）' />
          <i-input value={type} right title='类型' onChange={this.onType} placeholder='例如：纸箱，报纸，书本' />
          <i-cell title='是否赠送'>
            <i-switch value={isGive} onChange={this.switchChange} slot='footer'>
              <i-icon type='right' slot='open'></i-icon>
              <i-icon type='close' slot='close'></i-icon>
            </i-switch>
          </i-cell>
        </i-cell-group>
        <i-button onClick={this.submit} type='success'>提交</i-button>
      </View>
    )
  }
}

export default Form
