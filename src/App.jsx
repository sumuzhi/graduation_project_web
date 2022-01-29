import { Component } from "react";
import { Col, Row } from '@douyinfe/semi-ui';

import "./App.css";
import List from './containers/List'

class App extends Component {

  render() {
    return <div>
      <Row>
        <Col span={8}>
          <List></List>
        </Col>
        <Col span={16}><div className="col-content">col-8</div></Col>
      </Row>
    </div>;
  }
}

export default App;
