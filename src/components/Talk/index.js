import React, { Component } from 'react';
import { Row, Col, Toast, Dropdown, TextArea } from '@douyinfe/semi-ui';
import { connect } from 'react-redux'
import moment from 'moment'
import { IconSend, IconWifi, IconList, } from '@douyinfe/semi-icons';
import { deleteFriend, getFriendsList, getMessages, sendMessages } from '../../API/index'
import { friends_list_action } from '../../redux/actions/friend_list_action';
import { push_send_action } from '../../redux/actions/current_messages_action'
import { update_message_list_action, push_message_list_action } from '../../redux/actions/handle_message_list_action'
import Voice from '../../components/Voice'
import Upload from '../../components/Upload'
import Tip from '../../components/Tip'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
class index extends Component {

  ref1 = React.createRef()  //控制滚动

  state = {
    height: 30,
    messageList: [],
    text: '',
  }

  reSettingHeight = ({ height }) => {
    console.log(height);
    this.setState({ height })
  }

  //删除后更新friendList
  updateFriendList = () => {
    const { username, number_id } = this.props.hostInfo
    getFriendsList({ username, number_id }).then((result) => {
      if (result.status === 200)
        this.props.getFriendsLists(result.data)
    })
  }

  //点击删除选线后
  deleteFriend = (e) => {
    const { username: host_name, number_id: host_id } = this.props.hostInfo
    const { username: apply_name, number_id: apply_id } = this.props.current_talk
    deleteFriend({ host_name, host_id, apply_id, apply_name })
      .then((result) => {
        if (result.status === 200) {
          Toast.success(result.msg)
          this.updateFriendList()
        }
      })
  }

  //点击发送消息
  sendMessage = async () => {
    const r_id = this.props.current_talk.number_id
    const c_id = this.props.current_talk_conversation.conversation_id
    const s_id = this.props.hostInfo.number_id
    const data = { content: this.state.text, conversation_id: c_id, sender: s_id, receiver: r_id }
    const create_time = new Date().getTime()
    this.props.push_message({ ...data, create_time })
    this.props.socket_io.emit("sendMessage", { ...data, create_time })
    this.props.push_message_to_list({ content: this.state.text, conversation_id: c_id })
    this.setState({
      text: ''
    })
    sendMessages(data)  //保存信息到数据库中
  }

  getMessageForConversaionId = async () => {
    let messages = await getMessages(this.props.current_talk_conversation.conversation_id)
    this.setState({
      messageList: [...messages]
    })
  }

  //在输入框按下回车
  enterKey = (e) => {
    if (e.which === 13) {
      e.preventDefault();//☆阻止元素发生默认行为.阻止enter键回车换行.☆☆最重要一步
      this.sendMessage()

    }
  }

  //Array---to----ArrayBuffer
  toArrayBuffer = (buf) => {
    var ab = new ArrayBuffer(buf.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
      view[i] = buf[i];
    }
    return ab;
  }


  //点击音频播放
  playRecorder = async (item) => {
    console.log(item);
    var AudioContext = window.AudioContext || window.webkitAudioContext
    var ctx = new AudioContext()
    var audioData = item.blob ? (item.blob.size !== undefined ? await item.blob.arrayBuffer() : item.blob) : this.toArrayBuffer(item.recorder.data)
    ctx.decodeAudioData(
      audioData,
      function (buffer) {
        var sourceNode = ctx.createBufferSource()
        sourceNode.buffer = buffer
        sourceNode.connect(ctx.destination)
        sourceNode.start(0)
      },
      function () {
        // 错误处理
      }
    )
  }

  componentDidMount() {
    console.log("talk mount==========");
    this.setState({
      messageList: [...this.props.current_talk_messages]
    }, () => {
      if (this.ref1.current !== null) {
        this.ref1.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }
    })
  }

  componentDidUpdate(preProps, preState) {
    if (preProps.current_talk_messages !== this.props.current_talk_messages) {
      this.ref1.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }


  render() {
    const { hostInfo, current_talk_messages, current_talk } = this.props
    if (current_talk.username === undefined)
      return (
        <Tip screenHeight={this.props.screenHeight} />
      )
    else
      return (
        <div >
          <Row>
            {this.state.isUpload ? <Upload changeUploadState={this.changeUploadState} /> : ''}
            <div className="py-2 px-4 d-none d-lg-block">
              <div className="d-flex align-items-center py-1">
                <div className="position-relative" >
                  <img alt="" src={this.props.current_talk.userPhoto} style={{ objectFit: "cover" }} className="rounded-circle mr-1" width="50" height="50" />
                </div>
                <div className="flex-grow-1 pl-3">
                  <strong>{this.props.current_talk.username}</strong>
                  <div className="text-muted small">{this.props.current_talk.signaturePerson}</div>
                </div>
                <div className='headerIcon'>
                  {/* <IconUserCardPhone/> */}

                  <Dropdown
                    clickToHide={true}
                    trigger={'click'}
                    position={'bottomLeft'}
                    render={
                      <Dropdown.Menu>
                        {/* <Dropdown.Item onClick={this.checkItem}> 查看资料</Dropdown.Item> */}
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
            <Col span={2}></Col>

            <Col span={14}
              style={{ minWidth: 380 }}
            >
              <div className="position-relative ">
                <div className="chat-messages p-4 lightscrollbar" style={{ height: this.props.screenHeight - 120 - this.state.height }}>
                  <div ref={this.ref1}>
                    {current_talk_messages.map(item => (
                      item.sender === hostInfo.number_id ?
                        (
                          <div className="chat-message-right pb-4" key={item._id}>
                            <div>
                              <img alt="" style={{ objectFit: "cover" }} src={hostInfo.userPhotoImg} className="rounded-circle mr-1 m10" width="40" height="40" />
                              <div className="text-muted small text-nowrap mt-2">{moment(item.create_time).format("MM-D HH:mm")}</div>
                            </div>
                            <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                              <div className="font-weight-bold mb-1">{hostInfo.username}</div>
                              {/* {item.content} */}
                              {item.isRecorder ? (
                                <div>
                                  <IconWifi rotate={270}
                                    onClick={() => { this.playRecorder(item) }}
                                    className='voicefontSize' />
                                  <span className='d-inline-block ml-2'>{Math.round(item.duration)}''</span>
                                </div>
                              ) : item.content}
                            </div>
                          </div>
                        ) :
                        (
                          <div className="chat-message-left pb-4" key={item._id}>
                            <div className='mr-1'>
                              <img alt="" style={{ objectFit: "cover" }} src={current_talk.userPhoto} className="rounded-circle mr-1 m10" width="40" height="40" />
                              <div className="text-muted small text-nowrap mt-2">{moment(item.create_time).format("MM-D HH:mm")}</div>
                            </div>
                            <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                              <div className="font-weight-bold mb-1">{current_talk.username}</div>
                              {item.isRecorder ? (
                                <div>
                                  <IconWifi rotate={90}
                                    onClick={() => { this.playRecorder(item) }}
                                    className='voicefontSize  ' />
                                  <span className='d-inline-block ml-2'>{Math.round(item.duration)}''</span>
                                </div>
                              ) : item.content}
                            </div>
                          </div>
                        )
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex-grow-0 py-3 px-4 paddingSetting">
                <div>
                  <Row>
                    <Col span={21}>
                      <TextArea autosize
                        showClear
                        value={this.state.text}
                        onEnterPress={(e) => { this.enterKey(e) }}
                        onChange={(e) => { this.setState({ text: e }) }}
                        onResize={this.reSettingHeight}
                        rows={1} placeholder="Type your message" />
                    </Col>
                    <Col span={3} style={{ width: "100%" }}>
                      <div className="icon" style={{ display: "flex", position: "absolute", bottom: 0, right: 0 }}>
                        <div>
                          <IconSend size="extra-large" onClick={this.sendMessage} />
                        </div>
                        <Voice />
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col span={1}></Col>
            <Col span={7}>
              <Upload />
            </Col>
          </Row>
        </div>
      );
  }
}
export default connect(
  (state) => ({
    screenHeight: state.reHeight,
    current_talk: state.current_talk,
    hostInfo: state.userInfo,
    current_talk_messages: state.current_talk_messages,
    socket_io: state.socket_io,
    current_talk_conversation: state.current_talk_conversation,
    activeKey: state.activeKey
  }),
  {
    getFriendsLists: friends_list_action,
    push_message: push_send_action,
    set_message_flag: update_message_list_action,
    push_message_to_list: push_message_list_action
  }
)(index)