import Taro, {Component} from '@tarojs/taro'
import {ScrollView,View, Text, Image} from '@tarojs/components'
import {AtButton, AtInput, AtForm, AtAvatar} from 'taro-ui'
import './style.css'
import http from '../../utils/http'
import av1 from '../../img/av1.png'
import av2 from '../../img/av2.png'



class Chat extends Component{


  state = {
    lists: [],
  };

  componentDidMount = ()=>{
    //id
    let {id} = this.$router.params
    console.log(id)

    //data
    let ls = Array.apply(null, {length:10});
    let lists = [];
    for (let i in ls){
      lists.push({time: '2017-12-10', content: 'hello,dasddsadsdsdsdsdsdsdsdsdsdsdsadsadadsworld', type:i%2==0?true:false})
    }

    console.log(lists)
    this.setState({lists})

  }

  async send(){
    await http.post('/post_chat', {})
  }


  render(){
    const {type} = this.props;
    const {lists} = this.state;
    console.log(this)
    const items = (
      <ScrollView className={'msg-content'}>
        {lists.map((val, index)=>{
          val.type = !val.type
          return (
            <View key={index} className="msg">
              <View className='chat-time'>
                <Text className='chat-time-text'>
                  {val.time}
                </Text>
              </View>

              <View className={val.type?'content-left':'content-right'}>
                <View className={val.type?'avatar-left':'avatat-right'} >
                  <AtAvatar image={val.type?av1:av2}/>
                </View>
                <View className={val.type?"msg-left":'msg-right'}>
                  <Text>{val.content}</Text>
                </View>
              </View>
            </View>
          )
        })}
        <View style={{height: '50px'}}/>
      </ScrollView>
    )
    return(
      <View style={{height:'100%'}}>

        {items}

        <View className='chat-bottom'>
          <AtForm>
            <AtInput type='text' placeholder='输入发送消息'>
              <View className='chat-bottom-btn'>
                <AtButton type='secondary' size='small'>发送</AtButton>
              </View>
            </AtInput>
          </AtForm>
        </View>
      </View>
    )
  }
}


export default Chat


const styles = {
  hidden: {
    display: 'none'
  }
}
