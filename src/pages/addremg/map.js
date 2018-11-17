import Taro, {Component} from '@tarojs/taro'
import {View, Map} from '@tarojs/components'
import {AtSearchBar} from 'taro-ui'
import Loc from '../../icon/loc.png'


const mark = (la, lo) => {
  return [{
    iconPath: Loc,
    id: 0,
    latitude: la,
    longitude: lo,
    width: 50,
    height: 50
  }]
}


class AddreMap extends Component {


  state = {
    latitude: 0,
    longitude: 0,
    markers: [],
    value: '',
  }

  componentDidMount = async () => {
    let location = await Taro.getLocation({type: 'gcj02'});
    // let location = await Taro.getLocation();
    this.setState({...location, markers: mark(location.latitude, location.longitude)})
  }

  click = (e) => {
    console.log(e)
  }

  onChange = (e)=>{

  }

  render() {
    let {latitude, longitude, markers, value} = this.state
    return (
      <View>
        <Map
          style={styles.map} markers={markers}
          latitude={latitude} longitude={longitude} onClick={this.click} scale={18}/>
        <AtSearchBar value={value} onChange={this.onChange}/>
      </View>
    )
  }
}

export default AddreMap


const styles = {
  map: {
    width: "100%",
    height: "350px",
  }
};
