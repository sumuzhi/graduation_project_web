import React, { Component } from 'react'
import { Upload, List, Avatar, ButtonGroup, Button } from '@douyinfe/semi-ui';

import { IconDownload, IconDelete, IconEyeOpened } from '@douyinfe/semi-icons';

import { connect } from 'react-redux';
import { getFileList } from '../../API'
import './index.css'


class index extends Component {

  state = {
    data: {},
    FileList: []
  }

  formatBytes = (a, b) => {
    if (0 == a)
      return "0 Bytes";
    let c = 1024, d = b || 2, e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
  }

  get_file_list = async () => {
    let result = await getFileList(this.state.data.conversation_id)
    let temp_fileList = []
    if (result.status === 200) {
      console.log(result);
      result.result.map((c) => {
        let { fieldname: name, size } = c
        size = this.formatBytes(size)
        const aaa = { name, size }
        temp_fileList.push(aaa)
      })
      this.setState({
        FileList: temp_fileList
      })
    }
  }

  renderFileOperation = (fileItem) => (
    <div style={{ display: 'flex', columnGap: 8, padding: '0 8px' }}>
      <Button icon={<IconDownload></IconDownload>} type="tertiary" theme="borderless" size="small"></Button>
      <Button onClick={e => fileItem.onRemove()} icon={<IconDelete></IconDelete>} type="tertiary" theme="borderless" size="small"></Button>
    </div>
  )

  componentDidMount() {
    this.setState({
      data: {
        sender: this.props.hostInfo.number_id,
        conversation_id: this.props.current_conversation.conversation_id,
      }
    }, () => {
      this.get_file_list()
    })
  }

  componentDidUpdate(preProps) {
    if (preProps.current_conversation.conversation_id !== this.props.current_conversation.conversation_id) {
      this.setState({
        data: {
          sender: this.props.hostInfo.number_id,
          conversation_id: this.props.current_conversation.conversation_id,
        }
      }, () => [
        this.get_file_list()
      ])
    }
  }

  render() {

    const { hostInfo, current_conversation } = this.props
    if (hostInfo.number_id == '' && current_conversation.length == 0)
      return (<div></div>)
    else
      return (
        <div className='lightscrollbar' style={{ height: this.props.reHeight - 100 }}>
          {current_conversation.conversation_id}
          <Upload
            className='uploadcomponent'
            multiple
            renderFileOperation={this.renderFileOperation}
            fileList={this.state.FileList}
            action="http://localhost:3000/upload_file"
            data={this.state.data}
            maxSize={16384}
            draggable={true}
            dragMainText={'点击上传文件或拖拽文件到这里'}
            dragSubText="支持任意类型文件,大小不超过16M"
          />
        </div>
      )
  }
}

export default connect(
  state => ({
    reHeight: state.reHeight,
    hostInfo: state.userInfo,
    currentTalk: state.current_talk,
    current_conversation: state.current_talk_conversation
  })
  , {})(index)