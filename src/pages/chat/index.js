import Taro, {Component} from '@tarojs/taro'
import {ScrollView,View, Text, Image} from '@tarojs/components'
import {AtButton, AtInput, AtForm, AtAvatar} from 'taro-ui'
import './style.css'
import http from '../../utils/http'
import tool from '../../utils/tools'
import av1 from '../../img/av1.png'
import av2 from '../../img/av2.png'



class Chat extends Component{

  config = {
    navigationBarTitleText: '聊天',
  }
  state = {
    lists: [],
    value: '',
    top: 0
  };

  reload = async ()=>{
    //id
    let {id} = this.$router.params
    let unionid = Taro.getStorageSync('id')
    let order_id = id
    // console.log(order_id)


    let lists = await http.post('/post_chat', {post_type: 'get_chat', order_id, unionid});
    lists = lists.res.reverse()
    // console.log(lists)

    //data
    // let ls = Array.apply(null, {length:10});
    // let lists = [];
    // for (let i in ls){
    //   lists.push({time: '2017-12-10', content: 'hello,dasddsadsdsdsdsdsdsdsdsdsdsdsadsadadsworld', type:i%2==0?true:false})
    // }

    this.setState({lists, top: lists.length*80})
  }

  componentDidMount = ()=>{

    this.reload();

    this.timer = setInterval(this.reload.bind(this), 3000)
  }



  componentWillUnmount(){
    // console.log('*****')
    clearInterval(this.timer)
  }

  async send(){

    const {type, id} = this.$router.params
    console.log(this.$router.params)
    let flag = false
    if(type=='1'){
      flag = true
    }
    let order_id = id
    await http.post('/post_chat', {post_type:'send_chat', order_id, type:!flag, content:this.state.value})
    this.setState({value:''})
    this.reload()
  }

  changeValue(value){
    this.setState({value})
    // const {type} = this.$router.params
    // console.log(this.$router.params)
  }

  render(){
    const {lists, value, top} = this.state;
    const {type} = this.$router.params
    let flag = false
    if(type=='1'){
      flag = true
    }
    // console.log(flag)
    const items = (
      <ScrollView className={'msg-content'}
                  scrollY
                  scrollWithAnimation
                  style='height: 100%;'
                  scrollTop={top}
                  lowerThreshold='20'
                  upperThreshold='20'>
        {lists.map((val, index)=>{
          let dir = flag?val.type:!val.type
        return (
          <View key={index} className="msg">
            <View className='chat-time'>
              <Text className='chat-time-text'>
                {val.time.split('.')[0].split('T').join(' ')}
              </Text>
            </View>

            <View className={dir?'content-left':'content-right'}>
              <View className={dir?'avatar-left':'avatat-right'} >
                <AtAvatar image={!dir?av2:av1}/>
              </View>
              <View className={dir?"msg-left":'msg-right'}>
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
      <View className='chat-con'>

        {items}

        <View className='chat-bottom'>
          <AtForm>
            <AtInput type='text' placeholder='输入发送消息'
                     value={value}
                     onConfirm={this.send}
                     onChange={this.changeValue}>
              <View className='chat-bottom-btn'>
                <AtButton type='secondary' size='small' onClick={this.send}>发送</AtButton>
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





