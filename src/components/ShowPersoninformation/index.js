import React, { Component } from 'react'
import { Button, Toast, Col, Row } from '@douyinfe/semi-ui';
import { connect } from 'react-redux';

import './index.css'
import { createConversation_api } from '../../API'
import { change_tab_action_action } from '../../redux/actions/activeKey_action';
import { current_talk_action } from '../../redux/actions/current_talk_action';

class index extends Component {



  createConversation = async () => {
    const data = this.props.current_friend
    console.log(data);
    this.props.changeActiveKey({ key: "1" })
    const sender = this.props.hostInfo.number_id
    const receiver = this.props.current_friend.number_id
    console.log(this.props.current_friend);
    const result = await createConversation_api({ sender, receiver })
    this.props.changeRightCoponent(true)
    const { currentTalk } = this.props
    this.props.setCurrentTalk({ ...currentTalk, item: data })
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
              <Button>语音通话</Button>
              <Button>视频通话</Button>
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
    setCurrentTalk: current_talk_action
  }
)(index)