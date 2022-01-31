import { combineReducers } from "redux";

import resize_height from "./resize_height";


export default combineReducers({
  // ! 左边是state 右边是操作state的方法
  reHight: resize_height
})