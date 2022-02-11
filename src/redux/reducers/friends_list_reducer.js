import { SAVE_FRIENDS_LIST } from '../action_types'


export default function friends_list_reducer(preState = [], action) {
  let { type, data } = action
  if (type == SAVE_FRIENDS_LIST) {
    return data
  }
  return preState
}
