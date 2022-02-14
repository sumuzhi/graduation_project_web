import { GETMESSAGES, PUSHMESSAGE } from '../action_types'


export default function current_talk_messages_reducer(preState = [], action) {
  let { type, data } = action
  switch (type) {
    case GETMESSAGES:
      return [...data]
    case PUSHMESSAGE:
      return [...preState,data]
    default:
      return preState
  }
}