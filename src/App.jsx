import { Component } from "react";
import { Col, Row, } from '@douyinfe/semi-ui';
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

import Nav from './components/Nav'
import Talk from './components/Talk'
import ShowPerson from './components/ShowPersoninformation'
import VideoPlayer from "./components/Video/VideoPlayer";

class App extends Component {


  handleVideoPlayerShow = () => {
    this.child.showModal();
  }

  sendVideo = (info) => {
    this.child.callUser(info);
  }


  state = {
    right_flag: true,//true为talk组件,false为联系人的组件
  }

  changeRightCoponent = (e) => {
    this.setState({
      right_flag: e,
    })
  }


  render() {
    const isLogin = this.props.userInfo.isLogin

    if (!isLogin)
      return <Navigate to="/login" replace={true} />
    return (
      <>
        <div>
          <Row>
            {this.props.socket_io.connected ? <VideoPlayer onRef={ref => { this.child = ref }} /> : ''}
            <Col span={6}>
              <Nav changeRightCoponent={this.changeRightCoponent} />
            </Col>

            <Col span={18}>
              {this.state.right_flag ? <Talk /> : <ShowPerson parent={this} />}
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default connect(
  state => ({
    userInfo: state.userInfo,
    current_talk_messages: state.current_talk_messages,
    socket_io: state.socket_io
  }),
  {}
)(App)
