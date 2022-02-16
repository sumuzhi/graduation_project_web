import { Component } from "react";
import { Col, Row, } from '@douyinfe/semi-ui';
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

import Nav from './components/Nav'
import Talk from './containers/Talk'

class App extends Component {

  render() {
    const isLogin = this.props.userInfo.isLogin
    if (!isLogin)
      return <Navigate to="/login" replace={true} />
    return (
      <>
        <div>
          <Row>
            <Col span={6}>
              <Nav />
            </Col>

            <Col span={18}>
              {/* {JSON.stringify(this.props.current_talk_messages) !== '[]' && (<Talk />)} */}
              {  (<Talk />)}
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
    current_talk_messages: state.current_talk_messages
  }),
  {}
)(App)
