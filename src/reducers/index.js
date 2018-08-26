import { combineReducers } from 'redux'
import counter from './counter'
import address from './address'

export default combineReducers({
  counter,
  address,
})
