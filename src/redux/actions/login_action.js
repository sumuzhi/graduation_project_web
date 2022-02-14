import { DELETE_USER_INFO, SAVE_USER_INFO, CONNECTSOCKET, DISCONNECTON } from "../action_types";

export const saveUserInfoAction = (value) => {
  const { username, number_id, userPhotoBase64 } = value
  localStorage.setItem('username', username)
  // localStorage.setItem('token', value.token)
  localStorage.setItem('number_id', number_id)
  localStorage.setItem('userPhotoImg', userPhotoBase64)
  return { type: SAVE_USER_INFO, data: value }
}

export const connect_socket_action = (value) => {
  return { type: CONNECTSOCKET, data: value }
}

export const disconnect_socket_action = (value) => {
  return { type: DISCONNECTON, data: value }
}

export const DeleteUserInfoAction = () => {
  localStorage.removeItem('username')   //清除本地数据
  localStorage.removeItem('number_id')   //清除本地数据
  localStorage.removeItem('userPhotoImg')   //清除本地数据
  // localStorage.removeItem('token')
  return { type: DELETE_USER_INFO }    //调用方法清除redux中存入的数据
}