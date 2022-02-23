import React, { Component } from 'react'
import { Popover } from '@douyinfe/semi-ui'
import { IconMicrophone, IconSonicStroked } from '@douyinfe/semi-icons'
import Recorder from 'js-audio-recorder'
import { connect } from 'react-redux'
import { sendRecorderMessage } from '../../API'
import { friends_list_action } from '../../redux/actions/friend_list_action';
import { push_send_action } from '../../redux/actions/current_messages_action'
import './index.css'
import { push_message_list_action } from '../../redux/actions/handle_message_list_action'


class index extends Component {

  state = {
    voiceFlag: false,
    count: 0,
    complete: false
  }

  //包装blob数据,并发送请求
  getMp3Blob = (blob, duration) => {
    const fd = new FormData();
    const sender = this.props.hostInfo.number_id
    const { conversation_id } = this.props.current_talk_conversation
    const content = "语音消息"
    const create_time = new Date().getTime()
    const isRecorder = true
    fd.append("file", blob);
    fd.append("sender", sender);
    fd.append("conversation_id", conversation_id);
    fd.append("content", content);
    fd.append("isRecorder", isRecorder);
    fd.append("duration", duration);
    const data = { sender, duration, conversation_id, content, receiver: this.props.currentTalk.number_id, isRecorder, blob }
    this.props.socket_io.emit("sendMessage", { ...data, create_time })
    this.props.push_message({ ...data, create_time })
    this.props.push_last_message({ content, conversation_id })
    sendRecorderMessage(fd)
  }

  //生成Recorder对象
  getRecorder = () => {
    this.recorder = new Recorder({
      sampleBits: 16,                 // 采样位数，支持 8 或 16，默认是16
      sampleRate: 24000,              // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
      numChannels: 1,                 // 声道，支持 1 或 2， 默认是1
    });
  }


  //停止录音后的回调
  stopRecorder = async () => {
    const recorder = this.recorder.getWAVBlob();
    const duration = this.recorder.duration
    this.getMp3Blob(recorder, duration) //将文件打包成dormdata数据格式
    this.recorder.destroy().then(() => {
      this.recorder = null
    });
  }

  //点击语音按钮的函数
  sendVoice = () => {
    this.setState({
      voiceFlag: !this.state.voiceFlag,
      complete: false,
      count: 0
    })
  }

  componentDidUpdate() {
    if (this.state.voiceFlag) {
      if (!this.recorder) {
        this.getRecorder()
        this.recorder.start()
      }
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.setState({
          count: this.state.count + 1
        })
        console.log(this.state.count);
      }, 1000);
    }
    if (!this.state.voiceFlag && this.state.count !== 0) {
      clearInterval(this.timer)
      if (!this.state.complete) {
        this.setState({ complete: true }, () => {
          this.stopRecorder()
        })
      }
    }
    if (this.state.count === 60) {
      clearInterval(this.timer)
      this.setState({
        complete: true,
        voiceFlag: false,
        count: 0,
      }, () => {
        this.stopRecorder()
      })
    }
  }

  render() {
    return (
      <div>
        <Popover content={
          <div className='voiceModal'>
            <IconSonicStroked size="extra-large"
            />
            <span className='jishi'>{this.state.count}&nbsp;秒</span>
          </div>
        }
          position="top"
          visible={this.state.voiceFlag}
          trigger="custom"
        >
          <IconMicrophone size="extra-large" onClick={this.sendVoice} />
        </Popover>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    currentTalk: state.current_talk,
    hostInfo: state.userInfo,
    current_talk_messages: state.current_talk_messages,
    socket_io: state.socket_io,
    current_talk_conversation: state.current_talk_conversation
  }),
  {
    getFriendsLists: friends_list_action,
    push_message: push_send_action,
    push_last_message: push_message_list_action
  }
)(index)