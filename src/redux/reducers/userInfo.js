import { SAVE_USER_INFO, DELETE_USER_INFO } from '../action_types'

let username = localStorage.getItem('username')
let number_id = localStorage.getItem('number_id')
let userPhotoImg = localStorage.getItem('userPhotoImg')

let initState = {
  username: username || '',
  number_id: number_id || '',
  userPhotoImg: userPhotoImg || '',
  isLogin: username ? true : false
}


export default function UserInfoSaveReducer(preState = initState, action) {
  let { type, data } = action
  let newState;
  switch (type) {
    case SAVE_USER_INFO:
      newState = { username: data.username, number_id: data.number_id, isLogin: true, userPhotoImg: data.userPhotoBase64 }
      return newState
    case DELETE_USER_INFO:
      newState = { username: '', number_id: '', isLogin: false, userPhotoImg: '' }
      return newState
    default:
      return preState;
  }
}