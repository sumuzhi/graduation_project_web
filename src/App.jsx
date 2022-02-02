import { Component } from "react";
import { Col, Row, Tabs, TabPane } from '@douyinfe/semi-ui';

import Message from './containers/Message'
import Nav from './components/Nav'
import Talk from './containers/Talk'

class App extends Component {

  render() {
    return (
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
    );
  }
}

export default App;
