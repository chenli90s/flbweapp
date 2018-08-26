import Taro, {Component} from '@tarojs/taro'
import {View, Swiper, SwiperItem, Image, Text} from '@tarojs/components'
import one from '../../img/1.jpg'
import two from '../../img/2.jpg'
import three from '../../img/3.jpg'
import Ac from '../../icon/1.svg'
import Bc from '../../icon/2.svg'
import Cc from '../../icon/3.svg'
import Dc from '../../icon/4.svg'
import Ec from '../../icon/5.svg'
import Fc from '../../icon/6.svg'
import './index.css'
import loda from 'lodash/array'
import api from "../../utils/api";
import qr from '../../img/qrcode.jpg'


class Index extends Component {

  config = {
    navigationBarTitleText: '首页',
    usingComponents: {
      "i-grid": "../../iview/grid/index",
      "i-grid-item": "../../iview/grid-item/index",
      "i-grid-icon": "../../iview/grid-icon/index",
      "i-grid-label": "../../iview/grid-label/index",
      'i-row': '../../iview/row/index',
      "i-modal": "../../iview/modal/index"
    }
  };

  item = [
    {
      name: '废纸',
      icon: Ac,
      id: 0,
    },
    {
      name: '废塑料',
      icon: Bc,
      id: 1
    },
    {
      name: '废金属',
      icon: Cc,
      id: 2
    },
    {
      name: '废纺织',
      icon: Dc,
      id: 3
    },
    {
      name: '废家电',
      icon: Ec,
      id: 4
    },
    {
      name: '其他',
      icon: Fc,
      id: 5
    }
  ]

  constructor() {
    super(...arguments)
    this.state = {
      current: 1,
      duration: 500,
      interval: 5000,
      isCircular: false,
      isAutoplay: true,
      hasIndicatorDots: true,
      items: this.item,
      visible: false
    }
  }

  goToComponent = (value) => {
    if(value.id>0){
// eslint-disable-next-line no-undef
      wx.showToast({title:'此功能暂未开放', duration: 1500, icon: 'none'})
      return
    }
    Taro.navigateTo({
      url: `/pages/index/form?id=${value.id}&name=${value.name}`
    })
  }

  click(){
    console.log('-------')
  }

  static async componentDidShow () {
    // console.log('didmount')
    let user = await api.login()
    if(user.status===600){
      //  未关注公众号
      this.setState({visible: true})
    }else {
      // 存储id
      Taro.setStorageSync('id', user.status)
      Taro.setStorageSync('key', user.session_key)
    }
  }

  render() {
    const {current, isAutoplay, duration, isCircular, interval, hasIndicatorDots, items, visible} = this.state;
    const groups = loda.chunk(items, 3);
    const guid = groups.map((g, index)=>{
      return (
        <i-row key={index}>
          {g.map((value)=>(
            <i-grid-item key={value.id}>
              <View onClick={this.goToComponent.bind(this, value)}>
                <i-grid-icon>
                  <image src={value.icon} />
                </i-grid-icon>
                <i-grid-label>{value.name}</i-grid-label>
              </View>
            </i-grid-item>
          ))}
        </i-row>
      )
    })
    // const Items = items.map((value) => {
    //   return (
    //
    //   )
    //
    // })
    return (
      <View className='i-prod'>
        <View className='swip-index'>
          <Swiper
            slideMult='10'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            current={current}
            duration={duration}
            interval={interval}
            circular={isCircular}
            autoplay={isAutoplay}
            indicatorDots={hasIndicatorDots}
            preMargin='20'
          >
            <SwiperItem>
              <Image src={one}></Image>
            </SwiperItem>
            <SwiperItem>
              <Image src={two}></Image>
            </SwiperItem>
            <SwiperItem>
              <Image src={three}></Image>
            </SwiperItem>
          </Swiper>
        </View>
        <i-grid>
          {guid}
        </i-grid>
        <i-modal visible={visible} title='请关注公众号' show-ok={false} show-cancel={false}>
          <Text>您未关注我们的公众号，请先关注我们的公众号吧! 不然无法提交订单</Text>
          <Image src={qr} className='qr-image' style="width: 275px;"></Image>
        </i-modal>
      </View>
    )
  }
}


export default Index
