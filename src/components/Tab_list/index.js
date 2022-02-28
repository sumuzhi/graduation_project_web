import React, { Component } from 'react';
import { connect } from 'react-redux';
import { io } from 'socket.io-client'
import { Toast, Tabs, TabPane, Notification } from '@douyinfe/semi-ui';
import { resize_heightAction } from '../../redux/actions/height_resize'
import { friends_list_action } from '../../redux/actions/friend_list_action'
import { connect_socket_action } from '../../redux/actions/login_action'
import { change_tab_active_action } from '../../redux/actions/activeKey_action';
import { push_send_action } from '../../redux/actions/current_messages_action'
import { update_message_list_action, push_message_list_action } from '../../redux/actions/handle_message_list_action'
import { getFriendsList } from '../../API'
import './index.css'
import Messages from '../../components/Messages'
import Contacts from '../../components/Contacts'
import FileList from '../../components/FileList/FileList'
import { BASE_URL } from '../../config/config';


class index extends Component {

  //高度自适应变化
  handleHeight = () => {
    const screenHeight = window.innerHeight
    this.props.changeHeight(screenHeight)
  }

  //好友列表
  sendForList = (username, number_id) => {
    getFriendsList({ username, number_id })
      .then((result) => {
        const { status, data } = result
        if (status === 200) {
          this.props.setFriendList(data)
        }
      })
  }

  //连接socket
  connectsocket = () => {
    const socket_io = io(`ws://${BASE_URL}`,
      { query: { id: this.props.userInfo.number_id } })
    socket_io.on("connect", () => {
      console.log("socket connect status : ", socket_io.connected);
      this.props.connect_socket(socket_io)
    });

    socket_io.on("someoneApply", (data) => {
      Notification.open({ title: "申请提醒", content: "收到一条新好友请求", duration: 2 })
    })

    socket_io.on("receiveMessage", (data) => {
      if (this.props.current_talk.number_id !== data.sender) {
        const { sender, content } = data
        this.props.set_message_flag({ sender, content })
      }
      if (this.props.current_talk.number_id === data.sender) {
        this.props.push_message(data)
        this.props.push_message_to_list({ conversation_id: data.conversation_id, content: data.content })
      }
      if (this.props.activeKey !== "message") {
        Notification.open({ title: "信息提醒", content: "收到一条新消息", duration: 1 })
      }
    })
  }

  componentDidMount() {
    Toast.success("Welcome: " + this.props.userInfo.username + " !")
    document.documentElement.style.overflow = 'hidden';//隐藏body的滚动条
    window.addEventListener("resize", this.handleHeight)//监听窗口大小改变
    this.sendForList()
    this.connectsocket()
  }

  render() {
    return (
      <Tabs style={{ minWidth: 350 }}
        defaultActiveKey="message"
        onTabClick={(e) => { this.props.change_tab_active(e) }}
      >
        <TabPane
          tab=" 消息列表 "
          itemKey="message"
        >
          {this.props.friends_lists.length !== 0 && (<Messages changeRightCoponent={this.props.changeRightCoponent} />)}
        </TabPane>
        <TabPane
          tab="联系人"
          itemKey="contact"
        >
          <Contacts changeRightCoponent={this.props.changeRightCoponent} />
        </TabPane>
        <TabPane
          tab="文件列表"
          itemKey="fileList"
        >
          {this.props.friends_lists.length !== 0 && (<FileList userInfo={this.props.userInfo} height={this.props.screenHeight} />)}
        </TabPane>
      </Tabs>
    );
  }
}

export default connect(
  (state) => ({
    screenHeight: state.reHeight,
    userInfo: state.userInfo,
    friends_lists: state.friends_lists,
    activeKey: state.activeKey,
    current_talk: state.current_talk,
  }),
  {
    changeHeight: resize_heightAction,
    setFriendList: friends_list_action,
    connect_socket: connect_socket_action,
    push_message: push_send_action,
    set_message_flag: update_message_list_action,
    push_message_to_list: push_message_list_action,
    change_tab_active: change_tab_active_action
  }
)(index)