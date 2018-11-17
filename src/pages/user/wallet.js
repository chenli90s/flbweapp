import Taro, {Component} from '@tarojs/taro'
import {View, Image, Text} from '@tarojs/components'
import Logo from '../../img/logo.jpeg'


class About extends Component {
  render() {
    return (
      <View>


        <View style={styles.text}>
          <Text>
            此功能暂未开放,敬请期待！
          </Text>
        </View>

      </View>
    )
  }
}


export default About

const styles = {
  img: {
    height: '150px',
    width: '250px',
    margin: "0 auto",
  },
  text:{
    margin: '15px',
    marginTop: '20px',
    textAlign: 'center',
  }
}
