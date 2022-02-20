import React, { Component } from 'react'
import ReactDOM from "react-dom";
import { Modal, Button } from '@douyinfe/semi-ui'
import { connect } from 'react-redux';
import { change_video_modal_flag_action } from '../../redux/actions/video_modal_flag_action'

import './index.css'
import VideoTip from './VideoTip';

class VideoPlayer extends Component {


  state = {
    visible: true,
    voiceFlag: true,
    videoFlag: true,
    showTip: false,
  }


  //点击取消按钮和取消图标调用的是同一个方法
  handleCancel = (e) => {
    console.log('点击了取消按钮');
    this.setState({ visible: false, showTip: true });
  }

  handleMicrophone = () => {
    this.setState({ voiceFlag: !this.state.voiceFlag });
  }

  handleVideo = () => {
    this.setState({ videoFlag: !this.state.videoFlag });
  }

  componentDidMount() {
    console.log("video-modal--did mount");
  }

  componentWillUnmount() {
    console.log("video-modal-will-unmount===");
  }

  handleVideoTipModal = () => {
    this.setState({ visible: true, showTip: false });
  }


  // 挂断电话
  disconnectRing = () => {
    this.props.change_video_modal_flag(false)
  }

  render() {
    if (this.state.showTip)
      return <VideoTip handleVideoTipModal={this.handleVideoTipModal}/>
    return (
      <Modal
        title="Video Chat"
        style={{ width: 800, height: 600 }}
        visible={this.state.visible}
        onCancel={this.handleCancel}  //点击 "x",最小化视频窗口
        footer={
          <div className="modal-footbar">
            <span className="changeSvgSize" onClick={this.handleVideo}>
              {this.state.videoFlag ?
                <svg width="50px" height="50px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M896 305.066667a72.533333 72.533333 0 0 0-78.933333 12.8l-91.733334 85.333333V341.333333a128 128 0 0 0-128-128H213.333333a128 128 0 0 0-128 128v341.333334a128 128 0 0 0 128 128h384a128 128 0 0 0 128-128v-61.866667l92.16 85.333333a74.24 74.24 0 0 0 49.493334 19.2 71.68 71.68 0 0 0 29.44-6.4 68.266667 68.266667 0 0 0 42.666666-63.146666V368.213333A68.266667 68.266667 0 0 0 896 305.066667z" /></svg>
                : <svg width="50px" height="50px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M606.72 727.466667L208.213333 328.96 133.12 256 128 247.466667A128 128 0 0 0 85.333333 341.333333v341.333334a128 128 0 0 0 128 128h384a125.44 125.44 0 0 0 70.826667-21.76zM896 305.066667a72.533333 72.533333 0 0 0-78.933333 12.8l-91.733334 85.333333V341.333333a128 128 0 0 0-128-128H334.08l55.04 55.04 281.173333 281.173334 85.333334 85.333333 85.333333 85.333333a73.813333 73.813333 0 0 0 25.6 4.693334 71.68 71.68 0 0 0 29.44-6.4 68.266667 68.266667 0 0 0 42.666667-63.146667V368.213333a68.266667 68.266667 0 0 0-42.666667-63.146666zM725.333333 665.173333l-85.333333-85.333333L358.826667 298.666667l-85.333334-85.333334-72.533333-72.96a42.666667 42.666667 0 0 0-60.586667 60.586667l23.04 22.613333L238.506667 298.666667l398.506666 398.506666 62.293334 62.293334 123.733333 124.16a42.666667 42.666667 0 0 0 60.586667 0 42.666667 42.666667 0 0 0 0-60.586667z" /></svg>
              }</span>
            {/* <IconUserCardVideo className="changeIconSize bg-video" /> */}
            <span className="changeSvgSize" onClick={this.handleMicrophone}>
              {this.state.voiceFlag ?
                <svg width="50px" height="50px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M512 640a170.666667 170.666667 0 0 0 170.666667-170.666667V256a170.666667 170.666667 0 0 0-341.333334 0v213.333333a170.666667 170.666667 0 0 0 170.666667 170.666667z" /><path fill="#ffffff" d="M810.666667 469.333333a42.666667 42.666667 0 0 0-85.333334 0 213.333333 213.333333 0 0 1-426.666666 0 42.666667 42.666667 0 0 0-85.333334 0 298.666667 298.666667 0 0 0 256 295.253334V853.333333H379.306667a37.973333 37.973333 0 0 0-37.973334 37.973334v9.386666a37.973333 37.973333 0 0 0 37.973334 37.973334h265.386666a37.973333 37.973333 0 0 0 37.973334-37.973334v-9.386666a37.973333 37.973333 0 0 0-37.973334-37.973334H554.666667v-88.746666A298.666667 298.666667 0 0 0 810.666667 469.333333z" /></svg>
                : <svg width="50px" height="50px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M664.746667 544A170.666667 170.666667 0 0 0 682.666667 469.333333V256a170.666667 170.666667 0 0 0-337.92-32M810.666667 469.333333a42.666667 42.666667 0 0 0-85.333334 0 207.36 207.36 0 0 1-29.44 105.813334L758.613333 640A298.666667 298.666667 0 0 0 810.666667 469.333333zM512 640h6.826667L341.333333 462.08V469.333333a170.666667 170.666667 0 0 0 170.666667 170.666667zM883.626667 823.04l-682.666667-682.666667a42.666667 42.666667 0 0 0-60.586667 60.586667l682.666667 682.666667a42.666667 42.666667 0 0 0 60.586667 0 42.666667 42.666667 0 0 0 0-60.586667z" /><path fill="#ffffff" d="M640 853.333333h-85.333333v-88.746666a298.666667 298.666667 0 0 0 70.4-18.773334l-68.266667-68.266666A194.986667 194.986667 0 0 1 512 682.666667a213.333333 213.333333 0 0 1-213.333333-213.333334 42.666667 42.666667 0 0 0-85.333334 0 298.666667 298.666667 0 0 0 256 295.253334V853.333333H384a42.666667 42.666667 0 0 0 0 85.333334h256a42.666667 42.666667 0 0 0 0-85.333334z" /></svg>}
            </span>
            <span className="changeSvgSize icon-ring" onClick={this.disconnectRing}>
              <svg width="50px" height="50px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M742.4 938.666667A657.92 657.92 0 0 1 85.333333 281.6 196.266667 196.266667 0 0 1 281.6 85.333333a168.106667 168.106667 0 0 1 32.853333 2.986667 161.706667 161.706667 0 0 1 30.72 7.68 42.666667 42.666667 0 0 1 27.733334 32l58.453333 256a42.666667 42.666667 0 0 1-11.093333 39.253333c-5.546667 5.973333-5.973333 6.4-58.453334 33.706667a422.826667 422.826667 0 0 0 207.786667 208.64c27.733333-52.906667 28.16-53.333333 34.133333-58.88a42.666667 42.666667 0 0 1 39.253334-11.093333l256 58.453333a42.666667 42.666667 0 0 1 30.72 27.733333 185.173333 185.173333 0 0 1 8.106666 31.146667 203.52 203.52 0 0 1 2.56 32.426667A196.266667 196.266667 0 0 1 742.4 938.666667z" /></svg>
            </span>
          </div>
        }
      >
        <div className="videoPlay ">
          <div className="smallbox">
          </div>
        </div>

      </Modal>
    );
  }
}

export default connect(
  state => ({}),
  {
    change_video_modal_flag: change_video_modal_flag_action
  }
)(VideoPlayer)