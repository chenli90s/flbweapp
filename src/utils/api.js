import http from './http'

export default {
  login() {
    return new Promise(resolve => {
      wx.login({
        success: async function (res) {
          if (res.code) {
            //发起网络请求
            let info = await http.get(
              '/',
              {code: res.code}
            );
            resolve(info)
          } else {
            console.log('登录失败！' + res.errMsg)

          }
        }
      })
    })
  }
}
