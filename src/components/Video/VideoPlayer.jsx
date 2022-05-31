import React, { Component } from 'react'
import { Modal, Notification, Toast, Typography } from '@douyinfe/semi-ui'
import Peer from 'simple-peer'
import { connect } from 'react-redux';


import './index.css'
import VideoTip from './VideoTip';

class VideoPlayer extends Component {

  connectionRef = React.createRef();

  state = {
    visible: false,
    voiceFlag: true,
    videoFlag: true,
    showTip: false,
    peer_id: '',
    notification_list: [],
  }

  showModal = () => {
    this.setState({ visible: true });
  }

  callUser = ({ userInfo, current_friend }) => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        const peer = new Peer({ initiator: true, trickle: false, stream: currentStream });
        peer.on('signal', (data) => {
          this.setState({ selfStream: currentStream, peer_id: current_friend.number_id, call: data })
          //~ 连接上---开始发送邀请请求
          this.props.socket.emit('callUser', {
            userToCall: current_friend.number_id,
            from: { username: userInfo.username, number_id: userInfo.number_id },
            signalData: data
          });
        });

        peer.on('stream', (currentStream) => {
          this.userVideo.srcObject = currentStream;
          this.setState({ userStream: currentStream });
        });

        this.connectionRef.current = peer

        //! 这里的peer.signal()方法不能直接使用上面new的,在第二次通话时,会报错.
        this.props.socket.on('callAccepted', (signal) => {
          this.connectionRef.current.signal(signal);
        });
      });

  };

  resetFlags = () => {
    this.setState({ voiceFlag: true, videoFlag: true, })
  }

  answerCall = () => {
    this.hide()
    this.setState({ visible: true })
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        this.setState({ selfStream: currentStream })  //应答在didmount的监听方法中已经将peer_id存入了state 
        const peer2 = new Peer({ initiator: false, trickle: false, stream: currentStream });
        peer2.on('signal', (data) => {
          this.props.socket.emit('answerCall', { signal: data, peer_id: this.state.peer_id });
        });
        // 自己的流
        this.myVideo.srcObject = currentStream;

        peer2.on('stream', (stream) => {

          this.userVideo.srcObject = stream;
          this.setState({ userStream: stream })

        });

        peer2.signal(this.state.call);
        this.connectionRef.current = peer2
      })
  };


  // !处理点击蒙版隐藏通话窗口
  handleVideoTipModal = () => {
    this.setState({ visible: true, showTip: false });
  }

  // ~ did mount --------------------------------
  componentDidMount() {
    this.props.onRef(this)  //将本组件打包,给其他元素使用--调用方法
    const { socket } = this.props
    socket.on('callUser', ({ signal, from }) => {
      this.setState({ call: signal, peer_id: from.number_id }, () => {
        let id = Notification.info({
          title: '通话请求',
          showClose: false,
          content: (
            <>
              <div style={{ fontWeight: 'bold' }}>来自：{from.username}</div>
              <div style={{ marginTop: 8 }}>
                <Typography.Text link onClick={this.answerCall}>接听</Typography.Text>
                <Typography.Text link style={{ marginLeft: 20 }} onClick={this.disconnect}>
                  拒绝
                </Typography.Text>
              </div>
            </>
          ),
          duration: 0,
        })
        this.setState({ notification_list: [...this.state.notification_list, id] })
      });
    });
    socket.on('closeCall', (data) => {
      if (data === this.state.peer_id)
        this.stopMediaStream()
    });

    socket.on('refuseConnect', () => {
      Toast.info("对方拒绝了您的邀请")
      this.stopMediaStream()
    })
  }

  // 隐藏通知窗口
  hide = () => {
    let idsTmp = [...this.state.notification_list]
    Notification.close(idsTmp.shift())
    this.setState({ notification_list: idsTmp })
  }

  stopMediaStream = () => {
    this.resetFlags()
    this.setState({ visible: false, showTip: false });
    this.connectionRef.current.destroy();
    this.myVideo.srcObject.getTracks().forEach(track => track.stop());
  }

  // 挂断电话
  disconnectRing = () => {
    this.props.socket.emit("closeCall", { from: this.props.userInfo.number_id, to: this.state.peer_id })
    this.stopMediaStream()
  }

  // 拒绝视频
  disconnect = () => {
    this.hide()
    this.resetFlags()
    this.props.socket.emit("refuseConnect", { peer_id: this.state.peer_id })
  }

  //静音
  handleMicrophone = () => {
    this.connectionRef.current.streams[0].getAudioTracks().forEach(c => c.enabled = !c.enabled)
    this.setState({ voiceFlag: !this.state.voiceFlag });
  }

  //关闭摄像头
  handleVideo = () => {
    this.connectionRef.current.streams[0].getVideoTracks().forEach(c => c.enabled = !c.enabled)
    this.setState({ videoFlag: !this.state.videoFlag });
  }


  //点击取消按钮和取消图标调用的是同一个方法--点击遮盖层也是该方法
  handleCancel = (e) => {
    this.setState({ visible: false, showTip: true });
  }

  createUserRef = (ref) => {
    this.userVideo = ref
    if (this.userVideo !== null && this.state.userStream) {
      console.log(this.state.userStream);
      this.userVideo.srcObject = this.state.userStream
    }
  }

  createMyRef = (ref) => {
    this.myVideo = ref
    if (this.myVideo !== null && this.state.selfStream) {
      console.log(this.state.selfStream);
      this.myVideo.srcObject = this.state.selfStream
    }
  }

  render() {
    const { showTip } = this.state;
    if (showTip) {
      return <VideoTip handleVideoTipModal={this.handleVideoTipModal} />
    } else return (
      <Modal
        title="Video Chat"
        header=''
        style={{ width: 800, height: 600 }}
        visible={this.state.visible}
        footer=''
        onCancel={this.handleCancel}
      >
        <div className="videoPlay">
          <div className="bigbox">
            <video ref={(ref) => this.createUserRef(ref)} autoPlay style={{ width: "100%" }} />
          </div>
          <div className="smallbox">
            <video muted ref={(ref) => this.createMyRef(ref)} autoPlay style={{ width: "100%" }} />
          </div>

          {/* //底下按钮 */}
          <div style={{ height: 500 }}></div>
          <div style={{ display: "none" }} className="modal-footbar">
            <span className="changeSvgSize" onClick={this.handleVideo}>
              {this.state.videoFlag ?
                <svg width="50px" height="50px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M896 305.066667a72.533333 72.533333 0 0 0-78.933333 12.8l-91.733334 85.333333V341.333333a128 128 0 0 0-128-128H213.333333a128 128 0 0 0-128 128v341.333334a128 128 0 0 0 128 128h384a128 128 0 0 0 128-128v-61.866667l92.16 85.333333a74.24 74.24 0 0 0 49.493334 19.2 71.68 71.68 0 0 0 29.44-6.4 68.266667 68.266667 0 0 0 42.666666-63.146666V368.213333A68.266667 68.266667 0 0 0 896 305.066667z" /></svg>
                : <svg width="50px" height="50px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M606.72 727.466667L208.213333 328.96 133.12 256 128 247.466667A128 128 0 0 0 85.333333 341.333333v341.333334a128 128 0 0 0 128 128h384a125.44 125.44 0 0 0 70.826667-21.76zM896 305.066667a72.533333 72.533333 0 0 0-78.933333 12.8l-91.733334 85.333333V341.333333a128 128 0 0 0-128-128H334.08l55.04 55.04 281.173333 281.173334 85.333334 85.333333 85.333333 85.333333a73.813333 73.813333 0 0 0 25.6 4.693334 71.68 71.68 0 0 0 29.44-6.4 68.266667 68.266667 0 0 0 42.666667-63.146667V368.213333a68.266667 68.266667 0 0 0-42.666667-63.146666zM725.333333 665.173333l-85.333333-85.333333L358.826667 298.666667l-85.333334-85.333334-72.533333-72.96a42.666667 42.666667 0 0 0-60.586667 60.586667l23.04 22.613333L238.506667 298.666667l398.506666 398.506666 62.293334 62.293334 123.733333 124.16a42.666667 42.666667 0 0 0 60.586667 0 42.666667 42.666667 0 0 0 0-60.586667z" /></svg>
              }</span>
            <span className="changeSvgSize" onClick={this.handleMicrophone}>
              {this.state.voiceFlag ?
                <svg width="50px" height="50px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M512 640a170.666667 170.666667 0 0 0 170.666667-170.666667V256a170.666667 170.666667 0 0 0-341.333334 0v213.333333a170.666667 170.666667 0 0 0 170.666667 170.666667z" /><path fill="#ffffff" d="M810.666667 469.333333a42.666667 42.666667 0 0 0-85.333334 0 213.333333 213.333333 0 0 1-426.666666 0 42.666667 42.666667 0 0 0-85.333334 0 298.666667 298.666667 0 0 0 256 295.253334V853.333333H379.306667a37.973333 37.973333 0 0 0-37.973334 37.973334v9.386666a37.973333 37.973333 0 0 0 37.973334 37.973334h265.386666a37.973333 37.973333 0 0 0 37.973334-37.973334v-9.386666a37.973333 37.973333 0 0 0-37.973334-37.973334H554.666667v-88.746666A298.666667 298.666667 0 0 0 810.666667 469.333333z" /></svg>
                : <svg width="50px" height="50px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M664.746667 544A170.666667 170.666667 0 0 0 682.666667 469.333333V256a170.666667 170.666667 0 0 0-337.92-32M810.666667 469.333333a42.666667 42.666667 0 0 0-85.333334 0 207.36 207.36 0 0 1-29.44 105.813334L758.613333 640A298.666667 298.666667 0 0 0 810.666667 469.333333zM512 640h6.826667L341.333333 462.08V469.333333a170.666667 170.666667 0 0 0 170.666667 170.666667zM883.626667 823.04l-682.666667-682.666667a42.666667 42.666667 0 0 0-60.586667 60.586667l682.666667 682.666667a42.666667 42.666667 0 0 0 60.586667 0 42.666667 42.666667 0 0 0 0-60.586667z" /><path fill="#ffffff" d="M640 853.333333h-85.333333v-88.746666a298.666667 298.666667 0 0 0 70.4-18.773334l-68.266667-68.266666A194.986667 194.986667 0 0 1 512 682.666667a213.333333 213.333333 0 0 1-213.333333-213.333334 42.666667 42.666667 0 0 0-85.333334 0 298.666667 298.666667 0 0 0 256 295.253334V853.333333H384a42.666667 42.666667 0 0 0 0 85.333334h256a42.666667 42.666667 0 0 0 0-85.333334z" /></svg>}
            </span>
            <span className="changeSvgSize icon-ring" onClick={this.disconnectRing}>
              <svg width="50px" height="50px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M742.4 938.666667A657.92 657.92 0 0 1 85.333333 281.6 196.266667 196.266667 0 0 1 281.6 85.333333a168.106667 168.106667 0 0 1 32.853333 2.986667 161.706667 161.706667 0 0 1 30.72 7.68 42.666667 42.666667 0 0 1 27.733334 32l58.453333 256a42.666667 42.666667 0 0 1-11.093333 39.253333c-5.546667 5.973333-5.973333 6.4-58.453334 33.706667a422.826667 422.826667 0 0 0 207.786667 208.64c27.733333-52.906667 28.16-53.333333 34.133333-58.88a42.666667 42.666667 0 0 1 39.253334-11.093333l256 58.453333a42.666667 42.666667 0 0 1 30.72 27.733333 185.173333 185.173333 0 0 1 8.106666 31.146667 203.52 203.52 0 0 1 2.56 32.426667A196.266667 196.266667 0 0 1 742.4 938.666667z" /></svg>
            </span>
          </div>
        </div>

      </Modal>
    );
  }
}

export default connect(
  state => ({
    socket: state.socket_io,
    userInfo: state.userInfo,
  }),
  {
  }
)(VideoPlayer)