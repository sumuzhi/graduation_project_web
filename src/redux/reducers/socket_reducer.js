import { CONNECTSOCKET } from '../action_types'

export default function socket_reducer(preState = {}, action) {
  const { type, data } = action
  if (type === CONNECTSOCKET)
    return data
  return preState
}