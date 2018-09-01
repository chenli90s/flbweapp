import { ADDRESS, EDITAddress} from '../constants/counter'

const INITIAL_STATE = {
  address: [],
  editaddress: null
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADDRESS:
      return {
        ...state,
        address: action.payload
      }
    case EDITAddress:
      return {
        ...state,
        editaddress: action.payload
      }
    default:
      return state
  }
}
