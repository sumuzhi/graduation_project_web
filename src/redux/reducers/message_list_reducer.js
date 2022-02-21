import { MESSAGELIST, ADDMESSAGEFLAG, DELETEMESSAGEFLAG } from '../action_types'


export default function message_list_reducer(preState = [], action) {
  let { type, data } = action
  if (type === MESSAGELIST)
    return data
  if (type === ADDMESSAGEFLAG) {
    console.log(data);
    preState.map((c) => {
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
  if (type === DELETEMESSAGEFLAG) {
    console.log(data);
    preState.map((c) => {
      if (c.number_id === data) {
        if (c.read !== undefined) {
          c.read = undefined
          c.content = undefined
        }
      }
    })
    return [...preState]
  }
  return preState
}
