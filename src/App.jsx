import { Component } from "react";
import { Col, Row, Tabs, TabPane } from '@douyinfe/semi-ui';

import "./App.css";
import Message from './containers/Message'
import Nav from './components/Nav'
import Talk from './components/Talk'

class App extends Component {

  render() {
    return (
      <div>
        <Row>
          <Col span={6}>
            <Nav />
          </Col>
          <Col span={16}>
            <Talk />
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
