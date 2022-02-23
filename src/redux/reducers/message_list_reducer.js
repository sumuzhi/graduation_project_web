import { MESSAGELIST, ADDMESSAGEFLAG, PUSHMESSAGETOLIST, DELETEMESSAGEFLAG } from '../action_types'


export default function message_list_reducer(preState = [], action) {
  let { type, data } = action
  if (type === MESSAGELIST)
    return data
  if (type === ADDMESSAGEFLAG) {
    preState.forEach((c) => {
      if (c.number_id === data.sender) {
        if (c.read === undefined) {
          c.read = 1
        } else {
          c.read += 1
        }
        c.content = data.content
      }
    })
    console.log(preState);
    return [...preState]
  }
  if (type === PUSHMESSAGETOLIST) {
    preState.forEach((c) => {
      if (c.conversation_id === data.conversation_id) {
        c.content = data.content
      }
    })
    return [...preState]
  }
  if (type === DELETEMESSAGEFLAG) {
    preState.forEach((c) => {
      if (c.number_id === data) {
        if (c.read !== undefined) {
          c.read = undefined
        }
      }
    })
    return [...preState]
  }
  return preState
}
