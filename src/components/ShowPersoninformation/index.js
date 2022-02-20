import React, { Component } from 'react'
import { Button, Toast, Col, Row } from '@douyinfe/semi-ui';
import { connect } from 'react-redux';

import './index.css'
import { createConversation_api, getMessages } from '../../API'
import { change_tab_action_action } from '../../redux/actions/activeKey_action';
import { current_talk_action } from '../../redux/actions/current_talk_action';
import { current_talk_conversation_action } from '../../redux/actions/current_talk_conversation_action';
import { current_messages_action } from '../../redux/actions/current_messages_action'

import { change_video_modal_flag_action } from '../../redux/actions/video_modal_flag_action'

class index extends Component {

  state = {
    showVideoModal: false,
  }



  //点击发送消息
  createConversation = async () => {
    this.props.changeActiveKey({ key: "1" })
    const sender = this.props.hostInfo.number_id
    const receiver = this.props.current_friend.number_id
    const result = await createConversation_api({ sender, receiver })
    this.props.setCurrentTalk(this.props.current_friend)
    if (result.status === 201) {
      const { find_conversaion } = result
      this.props.changeRightCoponent(true)
      this.props.save_current_conversaion(find_conversaion[0])
      const aaa = await getMessages(find_conversaion[0].conversation_id)
      this.props.set_current_talk_message(aaa)
    }
    if (result.status === 200) {
      const { conversation_id } = result.data
      this.props.save_current_conversaion(result.data)
      const aaa = await getMessages(conversation_id)
      this.props.set_current_talk_message(aaa)
    }

  }


  callVideo = () => {
    this.props.change_video_modal_flag(true)
  }


  closeVideoModal = () => {
    this.setState({ showVideoModal: false })
  }


  render() {
    const { current_friend, hostInfo } = this.props
    if (JSON.stringify(current_friend) === "{}" || hostInfo.number_id === '')
      return (<div></div>)
    else
      return (
        <div>
          <Row>
            <Col span={4}></Col>
            <Col span={12} className="setBg">
              {current_friend.username}
              <Button
                onClick={this.createConversation}
              >发送消息</Button>
              <Button onClick={this.callVideo}>音视频通话</Button>
            </Col>
            <Col span={4}></Col>
          </Row>
        </div>
      )
  }

}
export default connect(
  state => ({
    current_friend: state.current_friend,
    hostInfo: state.userInfo,
    currentTalk: state.current_talk
  }),
  {
    changeActiveKey: change_tab_action_action,
    setCurrentTalk: current_talk_action,
    save_current_conversaion: current_talk_conversation_action,
    set_current_talk_message: current_messages_action,
    change_video_modal_flag: change_video_modal_flag_action
  }
)(index)