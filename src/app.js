import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import { Provider } from '@tarojs/redux'
// import api from './utils/api'
// import './font/iconfont.css'
import Index from './pages/index'

import configStore from './store'

import './app.css'


const store = configStore()

class App extends Component {

  config = {
    navigationBarTitleText: '废立宝',
    pages: [
      'pages/index/index',
      'pages/index/form',
      'pages/prud/index',
      'pages/prud/submitprod',
      'pages/pers/index',
      'pages/addremg/addrelist',
      'pages/addremg/editaddre',
      // 'pages/addremg/map',
      'pages/user/myorder',
      'pages/user/prodorder',
      'pages/user/join',
      'pages/user/prod',
      'pages/user/addrelist',
      'pages/user/about',
      'pages/user/contact',
      'pages/user/wallet',
      'pages/chat/index',
      'pages/admin/getorder',
      'pages/admin/myorder',
      'pages/admin/calc',
      'pages/admin/history',
      'pages/admin/modify',
      'pages/superadmin/prudorder',
      'pages/superadmin/manageuser',
      'pages/superadmin/historyorder',
      'pages/superadmin/manageprud',
      'pages/superadmin/editprud',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      backgroundColor: '#fff',
      selectedColor: '#1afa29',
      list: [
        {
          pagePath: 'pages/index/index',
          text: '回收',
          iconPath: 'img/home.png',
          selectedIconPath: 'img/qhome.png'
        },
        {
          pagePath: 'pages/prud/index',
          text: '积分商城',
          iconPath: 'img/pt.png',
          selectedIconPath: 'img/qpt.png'
        },
        {
          pagePath: 'pages/pers/index',
          text: '个人中心',
          iconPath: 'img/per.png',
          selectedIconPath: 'img/qper.png'
        }
      ]
    }
  }

  // async componentDidMount () {
  //   // console.log('didmount')
  //   let user = await api.login()
  //   if(user.status===600){
  //     // 未关注公众号
  //
  //   }else {
  //     // 存储id
  //     Taro.setStorageSync('id', user.status)
  //     Taro.setStorageSync('key', user.session_key)
  //   }
  // }

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
