import { combineReducers } from "redux";

import resize_height from "./resize_height";
import UserInfoSaveReducer from './userInfo'
import friends_list_reducer from "./friends_list_reducer";


export default combineReducers({
  // ! 左边是state 右边是操作state的方法
  reHeight: resize_height,
  userInfo: UserInfoSaveReducer,
  friends_lists: friends_list_reducer
})