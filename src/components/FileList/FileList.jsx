import React, { Component } from 'react'
import { Collapse, Notification } from '@douyinfe/semi-ui';
import { connect } from 'react-redux';
import { IconDownload, IconFile } from '@douyinfe/semi-icons';
import { getConversaionsList, getFileList, downloadFiles } from '../../API'

class FileList extends Component {

  state = {
    fileList: [],
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
  downloadFile = async (fileItem, conversation_id) => {
    Notification.success({ content: "文件正在下载,请勿重复点击", title: "下载提示" })
    const { file_id } = fileItem
    let result = await downloadFiles({ file_id, conversation_id })
    if (result.status === 200) {
      const file_buffer = result.data.file_buffer
      const name = result.data.fieldname
      const aaa = this.toArrayBuffer(file_buffer.data)
      this.download(aaa, name)
    }
  }

  //将conversation_id转friend的信息
  showUsernameForConversation = (conversation) => {
    const { friendList } = this.props
    let cc = friendList.filter((c) => {
      return conversation.members.includes(c.number_id)
    })
    return cc[0].username
  }


  getFileList = async () => {
    let list = await getConversaionsList(this.props.userInfo.number_id)//得到会话id
    if (list.status === 200) {
      list.data.map(async (c) => {
        const username = this.showUsernameForConversation(c)
        let aaa = await getFileList(c.conversation_id)
        if (aaa.status === 200) {
          const bbb = { username, conversation_id: c.conversation_id, data: aaa.result }
          this.setState({
            fileList: [...this.state.fileList, bbb]
          })
        }
      })
    }
  }

  formatBytes = (a, b) => {
    if (0 === a)
      return "0 Bytes";
    let c = 1024, d = b || 2, e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
  }

  componentDidMount() {
    this.getFileList()
  }

  render() {
    return (
      <div className='lightscrollbar' style={{ height: this.props.height - 150, overflow: 'auto' }}>
        <div className="semi-upload-file-list-main" role="list" aria-label="file list">
          <Collapse style={{ width: "100%" }}>
            {
              this.state.fileList.map((c, i) => (
                c.data.length !== 0 ?
                  <Collapse.Panel header={c.username} key={i + ''} itemKey={i + ''}>
                    {
                      c.data.map((cc, index) => (
                        <div key={index} role="listitem" style={{ marginBottom: "5px" }} className="semi-upload-file-card">
                          <div className="semi-upload-file-card-preview semi-upload-file-card-preview-placeholder">
                            <IconFile />
                          </div>
                          <div className="semi-upload-file-card-info-main">
                            <div className="semi-upload-file-card-info-main-text">
                              <span className="semi-upload-file-card-info-name">{cc.fieldname}</span>
                              <span>
                                <span className="semi-upload-file-card-info-size">{this.formatBytes(cc.size)}</span>
                              </span>
                            </div>
                            <div className="semi-upload-file-card-info-main-control">
                              <span className="semi-upload-file-card-info-validate-message"></span>
                            </div>
                          </div>
                          <div style={{ display: "flex", columnGap: "8px", padding: " 0px 8px" }}>
                            <button className="semi-button semi-button-tertiary semi-button-size-small semi-button-borderless semi-button-with-icon semi-button-with-icon-only" type="button" aria-disabled="false">
                              <span className="semi-button-content">
                                <IconDownload onClick={() => { this.downloadFile(cc, c.conversation_id) }} />
                              </span>
                            </button>
                          </div>
                        </div>
                      ))
                    }
                  </Collapse.Panel> : ''
              )
              )
            }
          </Collapse>
        </div>
      </div>
    )
  }
}
export default connect(state => ({
  friendList: state.friends_lists
}), {})(FileList)