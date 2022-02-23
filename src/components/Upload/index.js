import React, { Component, createRef } from 'react'
import { Upload, Notification, Button } from '@douyinfe/semi-ui';

import { IconDownload } from '@douyinfe/semi-icons';


import { connect } from 'react-redux';
import { getFileList, downloadFiles } from '../../API'
import './index.css'

class index extends Component {

  constructor() {
    super();
    this.ref1 = createRef()
  }

  state = {
    data: {},
    FileList: []
  }

  formatBytes = (a, b) => {
    if (0 === a)
      return "0 Bytes";
    let c = 1024, d = b || 2, e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
  }

  get_file_list = async () => {
    let result = await getFileList(this.state.data.conversation_id)
    let temp_fileList = []
    if (result.status === 200) {
      result.result.forEach((c) => {
        let { fieldname: name, size, mimeType: type, conversation_id, file_id } = c
        size = this.formatBytes(size)
        const aaa = { name, size, type, conversation_id, file_id }
        temp_fileList.push(aaa)
      })
      this.setState({
        FileList: temp_fileList
      })
    }
  }

  toArrayBuffer = (buf) => {
    var ab = new ArrayBuffer(buf.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
      view[i] = buf[i];
    }
    return ab;
  }


  download(buff, name) {
    let url = window.URL.createObjectURL(new Blob([buff], { type: "arraybuffer" }))
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


  //点击下载图标,进行文件的下载
  downloadFile = async (fileItem) => {
    console.log('download=======')
    Notification.success({ content: "文件正在下载,请勿重复点击", title: "下载提示" })
    const { file_id } = fileItem
    const { conversation_id } = this.state.data
    let result = await downloadFiles({ file_id, conversation_id })
    if (result.status === 200) {
      console.log(result);
      const file_buffer = result.data.file_buffer
      // console.log(file_buffer.data);
      const name = result.data.fieldname
      console.log(name);
      const aaa = this.toArrayBuffer(file_buffer.data)
      this.download(aaa, name)
    }
  }


  renderFileOperation = (fileItem) => (
    <div style={{ display: 'flex', columnGap: 8, padding: '0 8px' }}>
      <Button onClick={() => { this.downloadFile(fileItem) }} icon={<IconDownload></IconDownload>} type="tertiary" theme="borderless" size="small"></Button>
    </div>
  )

  componentDidMount() {
    console.log(this.props.current_conversation);
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


  onChange = ({ fileList, currentFile }) => {
    if (currentFile.status === 'success') {
      console.log(fileList[fileList.length - 1]);
      fileList[fileList.length - 1]["file_id"] = fileList[fileList.length - 1].response.file_id
    }
    let newFileList = [...fileList]; // spread to get new array
    this.setState({
      FileList: newFileList
    })
  };

  render() {
    const { hostInfo, current_conversation } = this.props
    const { FileList } = this.state
    if (hostInfo.number_id === '' || Object.keys(current_conversation).length === 0 || FileList.length === 0)
      return (<div></div>)
    else
      return (
        <div className='lightscrollbar' style={{ height: this.props.reHeight - 100 }}>
          <Upload
            className='uploadcomponent'
            ref={this.ref1}
            showClear={false}
            renderFileOperation={this.renderFileOperation}
            onChange={(e) => { this.onChange(e) }}
            fileList={FileList}
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