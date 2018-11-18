import Taro, {Component} from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import {View, Picker} from '@tarojs/components'
import http from '../../utils/http'
import { setaddress } from "../../actions/address";
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"


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
    let id = this.$router.params.id||''
    Taro.setNavigationBarTitle({title})
    let nows = new Date()
    let dateNow = `${nows.getFullYear().toString()}-${(nows.getMonth()+1).toString()}-${nows.getDate().toString()}`
    // console.log(dateNow)
    this.state = {
      dateSel: dateNow,
      timeSel: new Date().toTimeString().split(' ')[0],
      weight: null,
      type: null,
      isGive: false,
      addre: null,
      id,
      isSubmit: false,
    }
  }


  // componentWillReceiveProps (nextProps) {
  //   // console.log(this.props, nextProps)
  // }


  handleDateChange = e=>{
    let date = e.detail.value;
    let d = new Date(date)
    let year = d.getFullYear()
    let mon = d.getMonth()+1
    let day = d.getDate()
    let dat = `${year.toString()}-${mon.toString()}-${day.toString()}`
    console.log(dat)
    this.setState({dateSel: dat})
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
    // console.log(this.props)
    let id = Taro.getStorageSync('id')
    let address = await http.get('/show_addr?unionid=' + id,);
    // console.log(address)

    // {addr: "给你我招惹他", id: 56, phone: "859 6494 9646", name: "小心二"}
    // {addr: "另外一距离我", id: 59, phone: "848 5656 6", name: "哦哦哦low"}
    if(address.status===600){
      return
    }
    if(address.res.length>0){
      // this.setState({addre: address.res[0]})
      this.props.setaddress(address.res[0])
    }
  }

  isSubmit = false

  submit = async ()=>{
    this.setState({isSubmit: true})
    // console.log(this.state.dateSel, this.state.timeSel)
    const {address} = this.props.addresser;
    if(!address.addr){
      wx.showToast({title:'地址不能为空', duration: 1500, icon: 'none'})
      return
    }
    if(!this.state.weight){
      wx.showToast({title:'斤数不能为空', duration: 1500, icon: 'none'})
      return
    }
    let id = Taro.getStorageSync('id');
    let res = await http.get('/per_info', {unionid: id})
    if(res.role>1){
      wx.showToast({title:'管理员和接单员不能下单', duration: 1500, icon: 'none'})
      return
    }
    this.state.addre = address
    let params = {
      weight: this.state.weight,
      something: this.state.type||'未填写',
      address: this.state.addre.addr,
      phone: this.state.addre.phone,
      unionid: id,
      smtime: this.state.dateSel+' '+this.state.timeSel,
      name: this.state.addre.name
    };
    if(this.isSubmit){
      return
    }else {
      this.isSubmit = true
    }
    let _this = this
    http.get('/place_order', params).then(res=>{
      // 跳转
      _this.isSubmit = false
      _this.setState({isSubmit: false})
      Taro.navigateTo({url:'/pages/user/myorder'})
    }).catch(err=>{
      _this.isSubmit = false
      _this.setState({isSubmit: false})
      wx.showToast({title:'网络错误，请稍等会下单！！', duration: 1500, icon: 'none'})
    })


  }

  render(){
    const {dateSel, timeSel, type, weight, isGive, id, isSubmit} = this.state
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
          {id==0&&<i-input value={type} right title='类型' onChange={this.onType} placeholder='例如：纸箱，报纸，书本' />}
          {id==1&&<i-input value={type} right title='类型' onChange={this.onType} placeholder='例如：废旧饮料瓶' />}
          {id==2&&<i-input value={type} right title='类型' onChange={this.onType} placeholder='例如：废旧衣服' />}
          <i-cell title='是否赠送'>
            <i-switch value={isGive} onChange={this.switchChange} slot='footer'>
              <i-icon type='right' slot='open'></i-icon>
              <i-icon type='close' slot='close'></i-icon>
            </i-switch>
          </i-cell>
        </i-cell-group>
        <i-button onClick={this.submit} type='success'>提交</i-button>
        <AtModal isOpened={isSubmit}>
          <AtModalHeader>提交中</AtModalHeader>
          <AtModalContent>
            正在提交,请稍后.....
          </AtModalContent>
        </AtModal>
      </View>
    )
  }
}

export default Form
