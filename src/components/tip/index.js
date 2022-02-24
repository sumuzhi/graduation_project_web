import React, { Component } from 'react';

import './index.css'

export default class index extends Component {
  render() {
    const { screenHeight } = this.props
    return (
      <div className="text-center setbg"
      style={{ height: screenHeight, lineHeight: screenHeight - 120 + "px" }}
      >enjoy your time.
      </div>
    )
  }
}
