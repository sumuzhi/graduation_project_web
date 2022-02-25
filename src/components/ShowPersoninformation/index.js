import React, { Component } from 'react'
import { Button, Avatar, Col, Row } from '@douyinfe/semi-ui';
import { connect } from 'react-redux';

import './index.css'
import { createConversation_api, getMessages } from '../../API'
import { current_talk_action } from '../../redux/actions/current_talk_action';
import { current_talk_conversation_action } from '../../redux/actions/current_talk_conversation_action';
import { current_messages_action } from '../../redux/actions/current_messages_action'


class index extends Component {

  state = {
    showVideoModal: false,
  }


  componentDidMount() {
    this.parent = this.props.parent
  }


  //点击发送消息
  createConversation = async () => {
    const sender = this.props.userInfo.number_id
    const receiver = this.props.current_friend.number_id
    const result = await createConversation_api({ sender, receiver })
    this.props.setCurrentTalk(this.props.current_friend)
    if (result.status === 201) {
      const { find_conversaion } = result
      this.parent.changeRightCoponent(true)
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
    const { userInfo, current_friend } = this.props
    this.parent.sendVideo({ userInfo, current_friend })
    this.parent.handleVideoPlayerShow()
  }

  closeVideoModal = () => {
    this.setState({ showVideoModal: false })
  }

  render() {
    const { current_friend, userInfo } = this.props
    if (JSON.stringify(current_friend) === "{}" || userInfo.number_id === '')
      return (<div></div>)
    else
      return (
        <div>
          <Row>
            <Col span={6}></Col>
            <Col span={8} className="setBg">
              <div className="selfInfomation" >
                <div className="shadow"></div>
                <div className="backgroundImg" style={{ backgroundImage: 'url(' + current_friend.userPhoto + ')' }}>
                </div>
                <div className="img" >
                  <Avatar src={current_friend.userPhoto} size="extra-large" style={{ margin: "0 auto" }}>
                  </Avatar>
                </div>
                <div className="bodyText">
                  <p style={{ fontSize: "16px" }}>用户名</p>
                  {current_friend.username}
                  <div className="person">
                    <p style={{ fontSize: "16px" }}>个性签名</p>
                    {current_friend.signaturePerson}
                  </div>
                </div>
                <div className="footer">
                  <Button
                    style={{ width: "150px", height: "50px", fontSize: "18px" }}
                    onClick={this.createConversation} >发送消息</Button>
                  <Button
                    style={{ width: "150px", height: "50px", fontSize: "18px" }}
                    onClick={this.callVideo}>音视频通话</Button>
                </div>
              </div>
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
    userInfo: state.userInfo,
    currentTalk: state.current_talk,
  }),
  {
    setCurrentTalk: current_talk_action,
    save_current_conversaion: current_talk_conversation_action,
    set_current_talk_message: current_messages_action,
  }
)(index)