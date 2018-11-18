import Taro, {Component} from '@tarojs/taro'
import {View, Image, Text} from '@tarojs/components'
import Logo from '../../img/logo.jpeg'


class About extends Component {

  config = {
    navigationBarTitleText: '关于我们',
  }

  render() {
    return (
      <View>
        <View style={styles.img}>
          <Image  style={styles.img} src={Logo}/>
        </View>

        <View style={styles.text}>
          <Text>
            废立宝，是一家利用互联网+再生资源回收的科技互联网公司。我们一直秉承智能回收，科技环保的口号。专注于城市居民生活垃圾分类和再生资源回收，废立宝通过互联网、大数据、物流网与信息数据平台打造出智能回收的完整体系，微信下单—精准定位—预约上门—垃圾分类—智能回收—优质服务。整合资源，拓展人脉，搭建网络平台，结合零散回收用户，企业用户，以及大量社会个体需求，去除中间化，为上下游企业提供再利用资源。为实现生活垃圾减量化、资源化作出努力，为我们城市生态文明建设和循环经济发展贡献力量
          </Text>
        </View>

      </View>
    )
  }
}


export default About

const styles = {
  img: {
    height: '140px',
    width: '170px',
    margin: "0 auto",
  },
  text:{
    margin: '15px',
  }
}
