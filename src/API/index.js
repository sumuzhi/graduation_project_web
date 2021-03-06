import axios from './myAxios'
import { BASE_URL } from "../config/config";

//得到图形验证码
export const getImg = values => axios.get(`${BASE_URL}/captcha`, { params: { random: values } })

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

//删除好友--双向删除
export const deleteFriend = values => axios.post(`${BASE_URL}/delete_friend`, values)

//得到conversaions列表
export const getConversaionsList = values => axios.get(`${BASE_URL}/conversations/${values}`)

//得到每个好友的消息---根据会话id去发送
export const getMessages = values => axios.get(`${BASE_URL}/messages/${values}`)

//发送消息-- 会话id  senderId   content
export const sendMessages = values => axios.post(`${BASE_URL}/create_messages`, values)

//发送语音消息
export const sendRecorderMessage = values => axios({
  method: "post",
  url: `${BASE_URL}/message_recorder`,
  data: values,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

//创建会话
export const createConversation_api = values => axios.post(`${BASE_URL}/create_conversation`, values)

//获取文件列表
export const getFileList = values => axios.get(`${BASE_URL}/get_file_list`, { params: { conversation_id: values } })

//下载文件
export const downloadFiles = values => axios.post(`${BASE_URL}/download_file`, values)

//更新个人信息
export const updateInfo = values => axios.post(`${BASE_URL}/update_userInfo`, values)

//得到每个对话的最后一条消息
export const lastMessage = values => axios.get(`${BASE_URL}/get_last_message/${values}`)