import http from './http'

export default {
  login(w, j) {
    return new Promise(resolve => {
      wx.login({
        success: async function (res) {
          if (res.code) {
            //发起网络请求
            let info = await http.get(
              '/',
              {code: res.code, w, j}
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
