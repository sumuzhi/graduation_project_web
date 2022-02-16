import { GETMESSAGELIST, UPDATEMESSAGELIST } from '../action_types'

export default function get_message_list_reducer(preState = [], action) {
  let { type, data } = action
  if (type === GETMESSAGELIST)
    return data
  if (type === UPDATEMESSAGELIST) {
    for (let i = 0; i < preState.length; i++) {
      if (preState[i]._id === data.c_id)
        preState[i].content = data.content
    }
    // console.log(preState);
    return preState
    // return data
  }
  return preState
}
