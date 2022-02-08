import axios from './myAxios'
import { BASE_URL } from "../config/config";

//请求登录
export const LoginSend = values => axios.post(`${BASE_URL}/login`, values)

//请求好友列表
export const getFriendsList = values => axios.post(`${BASE_URL}/friendList`, values)

//查找好友
export const searchFriend = values => axios.post(`${BASE_URL}/searchFriend`, values)

//得到申请列表
export const getPreFriendList = values => axios.post(`${BASE_URL}/preFriendList`, values)

//通过或拒绝好友的申请
export const operate_apply = values => axios.post(`${BASE_URL}/bypassApply`, values)

//发送添加好友申请
export const applyToFriend = values => axios.post(`${BASE_URL}/apply_friend`, values)
