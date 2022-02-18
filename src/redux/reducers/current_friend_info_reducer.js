import { SETCURRENTFRIENDINFO } from '../action_types'


export default function current_friend_info_reducer(preState = {}, action) {
  let { type, data } = action
  if (type === SETCURRENTFRIENDINFO)
    return data
  // if (type === DELETECURRENTTALK)
  //   return {}
  return preState
}
