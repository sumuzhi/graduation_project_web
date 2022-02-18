//保存用户信息
export const RESIZE = 'resize'
//保存用户信息
export const SAVE_USER_INFO = 'save_user_info'
//注销用户
export const DELETE_USER_INFO = 'delete_user_info'

//保存好友列表
export const SAVE_FRIENDS_LIST = 'save_friends_list'

//保存当前点击的用户信息
export const SAVE_CURRENT_TALK_FRIEND = 'save_current_talk_friend'

//发送socket信息
export const CONNECTSOCKET = 'connect_socket'

//发送socket信息
export const GETMESSAGES = 'get_messages'

export const PUSHMESSAGE = 'push_message'

//退出时断开io
export const DISCONNECTON = 'disconnection'

//注销用户时删除redux中的全部数据
export const DELETEFRIENDSLISTS ='delete_friends_list'
export const DELETECURRENTTALK = 'current_talk'
export const DELETECURRENTTALKMESSAGES = 'delete_current_talk_messages'

//当前选中的friend
export const SETCURRENTFRIENDINFO = 'set_current_friend_info'

//改变tab栏的key
export const CHANGETABACTIVE ='change_tab_active'

//当前对话的信息
export const SAVE_CURRENT_TALK_CONVERSATION = 'save_current_talk_conversaion'