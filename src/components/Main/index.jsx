import React, { Component } from 'react';
import { Col, Row } from '@douyinfe/semi-ui';

export default class index extends Component {
  render() {
    return <div className="grid">
      <Row>
        <Col span={8}><div className="col-content">col-8</div></Col>
        <Col span={8}><div className="col-content">col-8</div></Col>
        <Col span={8}><div className="col-content">col-8</div></Col>
      </Row>
    </div>;
  }
}
