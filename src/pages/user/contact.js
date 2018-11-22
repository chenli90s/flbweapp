import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import Logo from '../../img/logo.jpeg'


class About extends Component {

  config = {
    navigationBarTitleText: '联系我们',
  };

  render() {
    return (
      <View style={{margin: '15px'}}>
        <View style={{margin: '15px'}}>
          <Text>
            联系方式: 0371-86579990 (早9点晚6点)
          </Text>
        </View>
        <View style={{margin: '15px'}}>
          <Text>
            工作邮箱：feilibao@163.com
          </Text>
        </View>
        <View style={{margin: '15px'}}>
          <Text>
            公司地址：河南省中科（郑州）创新园
          </Text>
        </View>
        <View style={{margin: '15px'}}>
          <Text>
            微信联系：可在平台留言留下联系方式，说明意向
          </Text>
        </View>
      </View>
    )
  }
}


export default About
