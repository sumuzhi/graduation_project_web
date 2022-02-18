import { SAVE_CURRENT_TALK_CONVERSATION } from '../action_types'


export default function current_talk_conversation_reducer(preState = {}, action) {
  let { type, data } = action
  if (type === SAVE_CURRENT_TALK_CONVERSATION)
    return data
  return preState
}
