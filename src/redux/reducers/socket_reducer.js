import { CONNECTSOCKET, DISCONNECTON } from '../action_types'

export default function socket_reducer(preState = {}, action) {
  const { type, data } = action
  if (type === CONNECTSOCKET)
    return data
  if (type === DISCONNECTON)
    return data.disconnect()
  return preState
}