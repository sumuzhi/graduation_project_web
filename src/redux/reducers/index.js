import { combineReducers } from "redux";

import resize_height_reducer from "./resize_height_reducer";
import save_UserInfo_reducer from './userInfo_reducer'
import friends_list_reducer from "./friends_list_reducer";
import current_talk_friend_reducer from "./current_talk_friend_reducer";
import socket_reducer from "./socket_reducer";
import current_talk_messages_reducer from "./current_talk_messages";
import current_friend_info_reducer from './current_friend_info_reducer'
import change_tab_active_to_talk_reducer from "./change_tab_active_reducer";

export default combineReducers({
  // ! 左边是state 右边是操作state的方法
  reHeight: resize_height_reducer,  //高度
  userInfo: save_UserInfo_reducer,  //用户信息
  friends_lists: friends_list_reducer, //朋友列表
  current_talk: current_talk_friend_reducer,//当前对话的朋友
  current_friend: current_friend_info_reducer,//联系人选中的friend
  current_talk_messages: current_talk_messages_reducer, //当前对话的消息
  socket_io: socket_reducer,
  activeKey: change_tab_active_to_talk_reducer
})