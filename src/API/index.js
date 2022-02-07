import axios from './myAxios'
import { BASE_URL } from "../config/config";

//请求登录
export const LoginSend = values => axios.post(`${BASE_URL}/login`, values)

//请求好友列表
export const getFriendsList = values => axios.post(`${BASE_URL}/friendList`, values)

//查找好友
export const searchFriend = values => axios.post(`${BASE_URL}/searchFriend`, values)