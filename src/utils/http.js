import Taro from '@tarojs/taro'

const baseUrl = 'https://www.hlfeilibao.com'

export default {
  get(url, data) {
    let param = {
      url:`${baseUrl}${url}`, data, method: 'GET', dataType: 'json'
    }
    // console.log(param)
    return new Promise(async (resolve, reject) => {
      let res = await Taro.request(param)
      if (res.statusCode === 200) {
        resolve(res.data)
      } else {
      }
      reject()
    })
  }
}
