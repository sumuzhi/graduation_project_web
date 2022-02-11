import { GETMESSAGES, PUSHMESSAGE } from '../action_types'


export default function current_talk_messages_reducer(preState = [], action) {
  let { type, data } = action
  switch (type) {
    case GETMESSAGES:
      return [...data]
    case PUSHMESSAGE:
      console.log(data);
      return [...preState,data]
    default:
      return preState
  }
}