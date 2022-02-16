import { DELETECURRENTTALK, SAVE_CURRENT_TALK_FRIEND } from '../action_types'


export default function current_talk_friend_reducer(preState = {}, action) {
  let { type, data } = action
  if (type === SAVE_CURRENT_TALK_FRIEND)
    return data
  if (type === DELETECURRENTTALK)
    return {}
  return preState
}
