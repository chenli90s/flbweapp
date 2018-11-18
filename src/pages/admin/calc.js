import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import http from '../../utils/http'
import {AtInput, AtForm, AtButton, AtCard} from 'taro-ui'
import Order from '../../img/order.png'


class EditAddre extends Component {

  config = {
    navigationBarTitleText: '结算',
    usingComponents: {
      "i-button": "../../iview/button/index",
      "i-input": "../../iview/input/index",
      "i-panel": "../../iview/panel/index",
    }
  };


  state = {
    pice: null,
    weight: null,
    pices: null,
    orders: [],
  };

  componentDidMount = () => {


  };

  isSubmit = false

  submit = async () => {

    let id = Taro.getStorageSync('id');
    let order_id = this.$router.params.id
    let {weight, pices, pice, orders} = this.state
    if (!weight || !pice) {
      wx.showToast({title: '单价和重量不能为空,注意小数点格式', duration: 1500, icon: 'none'})
      return
    }
    if (this.isSubmit) {
      return
    } else {
      this.isSubmit = true
    }
    await http.get('/complete_order', {unionid: id, order_id, money: pices, real_weight: weight})

    // add new
    if(orders.length>0){
      for(let val of orders){
        if(!val.tyy||!val.money){
          wx.showToast({title: '单价和重量不能为空,注意小数点格式', duration: 1500, icon: 'none'})
          return
        }
      }
      for (let val of orders){
        await http.get('/add_order', val)
      }
    }


    this.isSubmit = false
    Taro.redirectTo({url: `/pages/admin/history`})
  };

  onname = (e) => {
    let {weight} = this.state
    // // let val = e.detail.detail.value
    // let val = e
    // weight = parseFloat(weight)
    // let fl = val.split('.')
    // if (fl.length > 1 && fl[1]) {
    //   val = parseFloat(val)
    //   this.setState({pice: val.toString(), pices: (weight * val).toFixed(2)})
    // } else if (fl.length > 1) {
    //   this.setState({pice: val})
    // } else if (val) {
    //   val = parseInt(val)
    //   if (val.toString() == 'NaN') {
    //     return
    //   }
    //   this.setState({pice: val.toString(), pices: (weight * val).toFixed(2)})
    // } else {
    //   this.setState({pice: val, pices: ''})
    // }
    // console.log(e)
    this.setState({pice:e, pices:(e * weight).toFixed(2)})
  }

  onphone = (e) => {
    console.log(e)
    let {pice} = this.state
    // // let val = e.detail.detail.value
    // let val = e
    // pice = parseFloat(pice)
    // let fl = val.split('.')
    // if (fl.length > 1 && fl[1]) {
    //   val = parseFloat(val)
    //   this.setState({weight: val.toString(), pices: (pice * val).toFixed(2)})
    // } else if (fl.length > 1) {
    //   this.setState({weight: val})
    // } else if (val) {
    //   val = parseInt(val)
    //   if (val.toString() == 'NaN') {
    //     return
    //   }
    //   this.setState({weight: val.toString(), pices: (pice * val).toFixed(2)})
    // } else {
    //   this.setState({weight: val, pices: ''})
    // }
    // console.log(e)
    this.setState({weight:e, pices:(e * pice).toFixed(2)})
  }

  modify = (e)=>{
    this.setState({pices:this.state.pices})
  }

  add() {
    let id = Taro.getStorageSync('id')
    let order_id = this.$router.params.id
    let param = {
      unionid: id,
      order_id,
      price: '',
      money: '',
      tyy: '',
      real_weight: ''
    }
    this.state.orders.push(param)
    this.setState({orders: this.state.orders})
  }

  changeType(index, val) {
    // console.log(index, val)
    let {orders} = this.state
    let order = orders[index]
    order.tyy = val
    this.setState({orders})
  }

  changePrice(index, val){
    let {orders} = this.state
    let order = orders[index]
    order.price = val
    order.money = (order.real_weight*val).toFixed(2)
    this.setState({orders})
  }

  changeWight(index, val){
    let {orders} = this.state
    let order = orders[index]
    order.real_weight = val
    order.money = (order.price*val).toFixed(2)
    this.setState({orders})
  }

  render() {
    let {pice, weight, pices, orders} = this.state
    const renderForm = (
        <View>
          {orders.map((order, index)=>{
            return (
              <View key={index} style={{marginTop: "20px"}}>
              <AtCard title="追加订单" thumb={Order} >
                <AtForm>
                  <AtInput title='类型' value={order.tyy}
                           placeholder={'请输入类型'}
                           onChange={this.changeType.bind(this, index)}
                           type='text'/>
                  <AtInput title='单价' value={order.price}
                           placeholder={'请输入单价'}
                           onChange={this.changePrice.bind(this, index)}
                           type='digit'/>
                  <AtInput value={order.real_weight}
                           onChange={this.changeWight.bind(this, index)}
                           title='重量'
                           placeholder='请输入重量'
                           type='digit'/>
                  <AtInput value={order.money} title='价格' maxlength={'50'} onChange={this.modify}/>
                </AtForm>
              </AtCard>
              </View>
            )
          })}
        </View>
      )
    return (
      <View>
        <AtForm>
          <AtInput title={'单价'} value={pice} autoFocus={true} placeholder={'请输入单价'} onChange={this.onname}
                   type='digit'/>
          <AtInput value={weight} onChange={this.onphone} title='重量' placeholder='请输入重量' type='digit'/>
          <AtInput value={pices} title='价格' maxlength={'50'} onChange={this.modify}/>
        </AtForm>
        {renderForm}
        <View style={styles.line}>
          <AtButton type='secondary' size='small' customStyle={styles.addBtn} onClick={this.add}>添加结算订单</AtButton>
        </View>
        <i-button onClick={this.submit} type='success'>提交</i-button>
      </View>

    )
  }

}


export default EditAddre


const styles = {
  addBtn: {
    marginTop: '30px',
    marginRight: '30px',
    float: 'right'
  },
  line: {
    height: '70px'
  },
}
