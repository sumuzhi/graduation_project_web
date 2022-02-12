import { RESIZE } from '../action_types'
let initState = window.innerHeight


export default function resize_height(preState = initState, action) {
  if (action.type === RESIZE) {
    console.log("resize----------");
    return window.innerHeight
  }
  return preState
}