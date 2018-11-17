import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import Logo from '../../img/logo.jpeg'


class About extends Component {
  render() {
    return (
      <View style={{margin: '15px'}}>
        <View style={{margin: '15px'}}>
          <Text>公司地址：河南省新密市创新科技园</Text>
        </View>
        <View style={{margin: '15px'}}>
          <Text>合作热线：0371—86579990</Text></View>
        <View style={{margin: '15px'}}>
        <Text>邮箱：feilibao@163.com</Text></View>
      </View>
    )
  }
}


export default About
