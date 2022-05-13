import React, { Component } from 'react'
import { connect } from 'react-redux'

import { List, Avatar, Spin } from '@douyinfe/semi-ui';
import { getMessages, lastMessage } from '../../API'
import { current_talk_action } from '../../redux/actions/current_talk_action'
import { current_messages_action } from '../../redux/actions/current_messages_action'
import { current_talk_conversation_action } from '../../redux/actions/current_talk_conversation_action';
import { set_message_list_action, delete_message_list_action } from '../../redux/actions/handle_message_list_action'

import './index.css'

class index extends Component {

  state = {
    conversationList: [],//会话
    conversation_friends_message: [],  //存的是host与friends的消息往来中的friend_id
    conversation_friends_list: [],//利用会话中的id拿到friends的信息
    active: 0,
    loading: true,
  }

  // 点击卡片，更改样式
  messageClick = async (item) => {
    this.props.delete_message_list(item.number_id)
    this.props.changeRightCoponent(true)  //用来切换页面又组件的展示
    this.props.setCurrentTalk(item)
    this.setState({ active: item.number_id })
    let currentTalkConversation = this.state.conversationList.filter((c) => {
      return c.members.includes(item.number_id)
    })
    console.log(currentTalkConversation);
    this.props.saveCurrentConversaion(currentTalkConversation[0].doc)
    let aaa = await getMessages(currentTalkConversation[0].doc.conversation_id)
    this.props.getCurrentMessages(aaa)
  }

  getConversation_from_server = async () => {
    const id = this.props.userInfo.number_id
    let result = await lastMessage(id)
    if (result.status === 200) {
      const { data } = result
      this.setState({ conversationList: data })
      data.forEach((conversation) => {
        let id_list = conversation.members.filter((c) => c !== id)
        let obj = { number_id: id_list[0], data: conversation.doc }
        this.setState({
          conversation_friends_message: [...this.state.conversation_friends_message, obj]
        })
      })
      this.showMessage_friend()
    }
  }

  //最后呈现结果
  showMessage_friend = () => {
    const { friends_lists } = this.props
    let aaa = friends_lists.filter(cc =>
      this.state.conversation_friends_message.filter(c =>
        c.number_id === cc.number_id ? (cc.content = c.data.content) && (cc.conversation_id = c.data.conversation_id) : ''
      ).length !== 0
    )
    this.setState({
      conversation_friends_list: [...aaa],
      loading: false
    }, () => {
      this.props.saveMessageList(this.state.conversation_friends_list)
    })
  }


  componentDidMount() {
    this.getConversation_from_server()
  }

  render() {
    return (
      <div className="lightscrollbar"
        onMouseEnter={this.activeScroll}
        style={{ height: this.props.reHeight - 100, overflow: 'auto', padding: 10, minWidth: 300 }}>
        <List
          dataSource={this.props.message_list}
          renderItem={item => (
            <List.Item
              extra={<Avatar
                style={{ fontColor: "#fff" }}
                size='small'
                color={item.read !== undefined ? 'green' : 'white'}
              >{item.read !== undefined ? item.read : ''}
              </Avatar>}
              onClick={() => { this.messageClick(item) }}
              className={item.number_id === this.state.active ? "active " : "messageItem"}
              header={<Avatar
                src={item.userPhoto}
              ></Avatar>}
              style={{ border: "none" }}
              main={
                <div>
                  <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>
                    {item.username}
                  </span>
                  <p style={{ maxWidth: 200, height: 20, overflow: 'hidden', color: 'var(--semi-color-text-2)', margin: '4px 0' }}>
                    {item.content}
                  </p>
                </div>
              }
            />
          )}
        />
        {this.state.loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
      </div>
    )
  }
}

export default connect(
  state => ({
    userInfo: state.userInfo,
    reHeight: state.reHeight,
    friends_lists: state.friends_lists,
    socket_io: state.socket_io,
    message_list: state.message_list
  }),
  {
    setCurrentTalk: current_talk_action,
    getCurrentMessages: current_messages_action,
    saveCurrentConversaion: current_talk_conversation_action,
    saveMessageList: set_message_list_action,
    delete_message_list: delete_message_list_action
  }
)(index)