import Taro from '@tarojs/taro'

const baseUrl = 'https://www.hlfeilibao.com'

export default {
  get(url, data) {
    let param = {
      url:`${baseUrl}${url}`, data, method: 'GET', dataType: 'json'
    }
    // console.log(param)
    return new Promise(async (resolve, reject) => {
      Taro.request(param).then(res=>{
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          console.log('网络错误', res.statusCode)
          reject()
        }
      }).catch(err=>{
        reject()
      })
    })
  }
}
