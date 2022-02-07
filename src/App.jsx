import { Component } from "react";
import { Col, Row, } from '@douyinfe/semi-ui';
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

import Nav from './components/Nav'
import Talk from './containers/Talk'

class App extends Component {

  render() {
    return (
      <>
        {!this.props.userInfo.isLogin && (
          <Navigate to="/login" replace={true} />
        )}
        <div>
          <Row>
            <Col span={6}>
              <Nav />
            </Col>

            <Col span={18}>
              <Talk />
            </Col>

          </Row>
        </div>
      </>
    );
  }
}

export default connect(
  state => ({ userInfo: state.userInfo }),
  {}
)(App)
