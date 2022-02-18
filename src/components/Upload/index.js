import React, { Component } from 'react'
import { Upload } from '@douyinfe/semi-ui';
import { connect } from 'react-redux';


import './index.css'


class index extends Component {

  state = {
    data: {}
  }

  componentDidMount() {
    this.setState({
      data: {
        sender: this.props.hostInfo.number_id,
        conversation_id: this.props.currentTalk.currentTalkConversation[0].conversation_id,
      }
    })
  }

  componentDidUpdate(preProps) {
    if (preProps.currentTalk.currentTalkConversation[0].conversation_id !== this.props.currentTalk.currentTalkConversation[0].conversation_id) {
      this.setState({
        data: {
          sender: this.props.hostInfo.number_id,
          conversation_id: this.props.currentTalk.currentTalkConversation[0].conversation_id,
        }
      })
    }
  }

  render() {
    const { hostInfo, currentTalk } = this.props
    console.log(currentTalk.currentTalkConversation);
    console.log(hostInfo);
    if (hostInfo.number_id == '' && currentTalk.currentTalkConversation.length == 0)
      return (<div>1</div>)
    else return (
      <div className='lightscrollbar' style={{ height: this.props.reHeight - 100 }}>
        <Upload
          className='uploadcomponent'
          multiple
          action="http://localhost:3000/upload_file"
          data={this.state.data}
          afterUpload={(e) => { console.log(e); }}
          maxSize={16384}
          showUploadList={false}
          draggable={true}
          dragMainText={'点击上传文件或拖拽文件到这里'}
          dragSubText="支持任意类型文件,大小不超过16M"
        ></Upload>
      </div>
    )
  }
}

export default connect(
  state => ({
    reHeight: state.reHeight,
    hostInfo: state.userInfo,
    currentTalk: state.current_talk,
  })
  , {})(index)