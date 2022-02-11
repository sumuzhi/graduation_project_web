import io from 'socket.io-client'
import { SENDMESSAGE } from '../action_types'
let number_id = localStorage.getItem('number_id')

const socket = io('ws://localhost:3000',
  { query: { id: number_id } })

export default function socket_reducer(preState = socket, action) {
  return preState
}