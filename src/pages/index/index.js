import Taro, {Component} from '@tarojs/taro'
import {View, Swiper, SwiperItem, Image, Text} from '@tarojs/components'
// import one from '../../img/1.jpg'
import two from '../../img/2.jpg'
// import three from '../../img/3.jpg'
import news from '../../img/news.jpg'
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
      name: '废旧衣服',
      icon: Dc,
      id: 2
    },
    {
      name: '废金属',
      icon: Cc,
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
      isAutoplay: false,
      hasIndicatorDots: false,
      items: this.item,
      visible: false
    }
  }

  goToComponent = (value) => {
    if (value.id > 2) {
// eslint-disable-next-line no-undef
      wx.showToast({title: '此功能暂未开放', duration: 1500, icon: 'none'})
      return
    }
    Taro.navigateTo({
      url: `/pages/index/form?id=${value.id}&name=${value.name}`
    })
  }

  click() {
    console.log('-------')
  }

  async update() {
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
    // 请求完新版本信息的回调

      // console.log(res)
      if(res.hasUpdate){
        updateManager.onUpdateReady(function () {
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: function (res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
              }
            }
          })

        })
        updateManager.onUpdateFailed(function () {
          // 新的版本下载失败
          wx.showModal({
            title: '更新提示',
            content: '新版本下载失败',
            showCancel: false
          })
        })
      }
    })
  }

  async componentDidMount() {
    await this.update()
    // 获取地理位置
    Taro.showShareMenu()
    let location = await Taro.getLocation({type: 'gcj02'})
    // console.log(location)
    let w = location.latitude.toString()
    let j = location.longitude.toString()
    let user = await api.login(w, j)
    // console.log(user)
    if (user.status === 600) {
      //  未关注公众号
      this.setState({visible: true})
    } else {
      // 存储id
      Taro.setStorageSync('id', user.status)
      Taro.setStorageSync('key', user.session_key)
    }
  }

  render() {
    const {current, isAutoplay, duration, isCircular, interval, hasIndicatorDots, items, visible} = this.state;
    const groups = loda.chunk(items, 3);
    const guid = groups.map((g, index) => {
      return (
        <i-row taroKey={index}>
          {g.map((value) => (
            <i-grid-item taroKey={value.id}>
              <View onClick={this.goToComponent.bind(this, value)}>
                <i-grid-icon>
                  <Image src={value.icon}/>
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
          {/*<Swiper*/}
            {/*slideMult='10'*/}
            {/*indicatorColor='#999'*/}
            {/*indicatorActiveColor='#333'*/}
            {/*current={current}*/}
            {/*duration={duration}*/}
            {/*interval={interval}*/}
            {/*circular={isCircular}*/}
            {/*autoplay={isAutoplay}*/}
            {/*indicatorDots={hasIndicatorDots}*/}
            {/*preMargin='20'*/}
            {/*style='height: 240px;'*/}
          {/*>*/}
            {/*<SwiperItem>*/}
              {/*<Image src={one} style='width: 100%;'></Image>*/}
            {/*</SwiperItem>*/}
            {/*<SwiperItem>*/}
              {/*<Image src={two} style='width: 100%;'></Image>*/}
            {/*</SwiperItem>*/}
            {/*<SwiperItem>*/}
              {/*<Image src={news} style='width: 100%;'></Image>*/}
            {/*</SwiperItem>*/}
          {/*</Swiper>*/}
          <Image src={news} style='width: 100%;'></Image>
        </View>
        <i-grid>
          {guid}
        </i-grid>
        <i-modal visible={visible} title='请关注公众号' show-ok={false} show-cancel={false}>
          <Text>您未关注我们的公众号，请先关注我们的公众号吧! 不然无法提交订单</Text>
          <Image src={qr} className='qr-image' style='width: 275px;'></Image>
        </i-modal>
      </View>
    )
  }
}


export default Index
