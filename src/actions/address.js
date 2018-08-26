import {ADDRESS, EDITAddress} from '../constants/counter'


export function setaddress(payload) {
  return {
    type: ADDRESS,
    payload
  }
}

export function editaddress(payload) {
  return {
    type: EDITAddress,
    payload
  }
}
