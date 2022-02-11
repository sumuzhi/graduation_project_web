import React, { Component } from 'react';
import { Row, Col, Toast, Dropdown, TextArea } from '@douyinfe/semi-ui';
import { connect } from 'react-redux'
import moment from 'moment'
import { IconUserCardVideo, IconUserCardPhone, IconSend, IconMicrophone, IconList, IconLive, IconSetting } from '@douyinfe/semi-icons';
import { deleteFriend, getFriendsList, getMessages, sendMessages } from '../../API/index'
import { friends_list_action } from '../../redux/actions/friend_list_action';
import { socket_send_action } from '../../redux/actions/socket_sendmsg_action'
import { push_send_action } from '../../redux/actions/current_messages_action'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
class index extends Component {

  state = {
    height: 30,
    messageList: [],
    text: ''
  }


  reSettingHeight = ({ height }) => {
    console.log(height);
    this.setState({ height })
  }

  toolbar = (e) => {
    // console.log(this.props.currentTalk);
  }

  //删除后更新friendList
  updateFriendList = () => {
    const { username, number_id } = this.props.hostInfo
    getFriendsList({ username, number_id }).then((result) => {
      if (result.status == 200)
        this.props.getFriendsLists(result.data)
    })
  }
  //查看资料
  checkItem = () => {

  }

  //点击删除选线后
  deleteFriend = (e) => {
    const { username: host_name, number_id: host_id } = this.props.hostInfo
    const { username: apply_name, number_id: apply_id } = this.props.currentTalk
    deleteFriend({ host_name, host_id, apply_id, apply_name })
      .then((result) => {
        if (result.status == 200) {
          Toast.success(result.msg)
          this.updateFriendList()
        }
      })
  }

  //点击发送消息
  sendMessage = async () => {
    console.log(this.state.text);
    const c_id = this.props.currentTalk.currentTalkConversation[0].conversation_id
    const s_id = this.props.hostInfo.number_id
    const data = { content: this.state.text, conversation_id: c_id, sender: s_id }
    const create_time = new Date().getTime()
    console.log(data);
    this.props.push_message({ ...data, create_time })
    let result = await sendMessages(data)
    console.log(result);
  }

  setText = (e) => {
    this.setState({ text: e })
  }

  getMessageForConversaionId = async () => {
    let messages = await getMessages(this.props.currentTalk.currentTalkConversation[0].conversation_id)
    this.setState({
      messageList: [...messages]
    })
  }

  componentDidMount() {
    console.log("talk mount==========");
    this.setState({
      messageList: [...this.props.current_talk_messages]
    }, () => {
      console.log(this.state.messageList);

    })
  }

  componentWillUnmount() {
    console.log("umpont-----------");
  }

  render() {
    const { hostInfo, current_talk_messages, currentTalk } = this.props
    return (
      <div >
        <Row>
          <div className="py-2 px-4 d-none d-lg-block">
            <div className="d-flex align-items-center py-1">
              <div className="position-relative" >
                <img src={this.props.currentTalk.item.userPhoto} style={{ objectFit: "cover" }} className="rounded-circle mr-1" width="50" height="50" />
              </div>
              <div className="flex-grow-1 pl-3">
                <strong>{this.props.currentTalk.item.username}</strong>
                <div className="text-muted small">{this.props.currentTalk.item.signaturePerson}</div>
              </div>
              <div className='headerIcon'>
                <IconUserCardPhone
                />
                <IconUserCardVideo />
                <Dropdown
                  clickToHide={true}
                  trigger={'click'}
                  position={'bottomLeft'}
                  render={
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={this.checkItem}>查看资料</Dropdown.Item>
                      <Dropdown.Item onClick={this.deleteFriend}>删除好友</Dropdown.Item>
                    </Dropdown.Menu>
                  }
                >
                  <IconList
                    onClick={this.toolbar} />
                </Dropdown>
              </div>
            </div>
          </div>
          <Col span={4}></Col>

          <Col span={14}
            style={{ minWidth: 380 }}
          >
            <div className="position-relative ">
              <div className="chat-messages p-4 lightscrollbar" style={{ height: this.props.screenHeight - 120 - this.state.height }}>
                {current_talk_messages.map(item => (
                  item.sender === hostInfo.number_id ?
                    (
                      <div className="chat-message-right pb-4" key={item._id}>
                        <div>
                          <img src={hostInfo.userPhotoImg} className="rounded-circle mr-1" alt="Chris Wood" width="40" height="40" />
                          <div className="text-muted small text-nowrap mt-2">{moment(item.create_time).format("HH:mm:ss")}</div>
                        </div>
                        <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                          <div className="font-weight-bold mb-1">{hostInfo.username}</div>
                          {item.content}
                        </div>
                      </div>
                    ) :
                    (
                      <div className="chat-message-left pb-4" key={item._id}>
                        <div>
                          <img src={currentTalk.item.userPhoto} className="rounded-circle mr-1" alt="Chris Wood" width="40" height="40" />
                          <div className="text-muted small text-nowrap mt-2">{moment(item.create_time).format("HH:mm:ss")}</div>
                        </div>
                        <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                          <div className="font-weight-bold mb-1">{currentTalk.item.username}</div>
                          {item.content}
                        </div>
                      </div>
                    )
                ))}

              </div>
            </div>

            <div className="flex-grow-0 py-3 px-4 paddingSetting">
              <div>
                <Row>
                  <Col span={21}>
                    <TextArea autosize
                      showClear
                      onChange={(e) => { this.setText(e) }}
                      onResize={this.reSettingHeight}
                      rows={1} placeholder="Type your message" />
                  </Col>
                  <Col span={3} style={{ width: "100%" }}>
                    <div className="icon" style={{ position: "absolute", bottom: 0, right: 0 }}>
                      <IconSend size="extra-large" onClick={this.sendMessage} />
                      <IconMicrophone size="extra-large" />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default connect(
  (state) => ({
    screenHeight: state.reHeight,
    currentTalk: state.current_talk,
    hostInfo: state.userInfo,
    current_talk_messages: state.current_talk_messages,
  }),
  {
    getFriendsLists: friends_list_action,
    setId: socket_send_action,
    push_message: push_send_action
  }
)(index)