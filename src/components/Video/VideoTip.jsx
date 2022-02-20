import React, { Component } from 'react'

import './index.css'

export default class VideoTip extends Component {
  render() {
    return (
      <div onClick={this.props.handleVideoTipModal} className=" VideoTip">点击回到视频</div>
    )
  }
}
