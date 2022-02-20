import React, { Component } from 'react';
import { connect } from 'react-redux';
import { io } from 'socket.io-client'
import { Toast, Tabs, TabPane } from '@douyinfe/semi-ui';

import { resize_heightAction } from '../../redux/actions/height_resize'
import { friends_list_action } from '../../redux/actions/friend_list_action'
import { connect_socket_action } from '../../redux/actions/login_action'
import { getFriendsList } from '../../API'
import './index.css'
import Messages from '../../components/Messages'
import Contacts from '../../components/Contacts'


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
    const socket_io = io('ws://localhost:3000',
      { query: { id: this.props.userInfo.number_id } })
    this.props.connect_socket(socket_io)
  }

  componentDidMount() {
    Toast.success("Welcome: " + this.props.userInfo.username + " !")
    document.documentElement.style.overflow = 'hidden';
    window.addEventListener("resize", this.handleHeight)
    this.sendForList()
    this.connectsocket()
  }

  render() {
    return (
      <Tabs style={{ minWidth: 350 }}
        defaultActiveKey={this.props.activeKey.key}
      >
        <TabPane
          tab=" 消息列表 "
          itemKey="1"
        >
          {this.props.friends_lists.length !== 0 && (<Messages changeRightCoponent={this.props.changeRightCoponent} />)}
        </TabPane>
        <TabPane
          tab="联系人"
          itemKey="2"
        >
          <Contacts changeRightCoponent={this.props.changeRightCoponent} />
        </TabPane>
        <TabPane
          tab="文件列表"
          itemKey="3"
        >
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
    activeKey: state.activeKey
  }),
  {
    changeHeight: resize_heightAction,
    setFriendList: friends_list_action,
    connect_socket: connect_socket_action
  }
)(index)