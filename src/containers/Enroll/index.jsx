import React, { Component } from 'react';
import { Form, Input, Toast, Button, Upload, Col, Row, TextArea } from '@douyinfe/semi-ui';
import { IconPlus } from '@douyinfe/semi-icons';
import { connect } from 'react-redux';

import './index.css'
import { resize_heightAction } from '../../redux/actions/height_resize'
class index extends Component {

  handleSubmit = (values) => {
    console.log(values);
    Toast.info('表单已提交');
  };

  render() {
    return (
      <div>
        <div className="grid">
          <Row>
            <Col span={11}>
              <div className='bgImage' style={{ height: this.props.screenHeight }}>

              </div>
            </Col>
            <Col span={2}></Col>
            <Col span={6}>
              <div className="title">
                <div className='titleFlag'>欢迎注册QQ</div>
                <div className='titleSubTitle'>每一天，乐在沟通。</div>
              </div>
              <div>
                <div className="fontSet" style={{ display: "flex" }}>
                  <div style={{ width: "200px" }}>请输入用户名</div>
                  <Input showClear size='large' ></Input>
                </div>
                <div className="fontSet" style={{ display: "flex", marginTop: "30px" }}>
                  <div style={{ width: "200px" }}>请输入密码</div>
                  <Input mode="password" showClear size='large' ></Input>
                </div>
                <div className='fontSet' style={{ display: "flex", marginTop: 30 }}>
                  <div className='ddd' style={{ width: 200, lineHeight: "100px" }}>请输入个性签名</div>
                  <TextArea
                    style={{ width: 350, height: 80 }}
                    maxCount={20} showClear />
                </div>
                <div className="fontSet" style={{ display: "flex", marginTop: 20 }}>
                  <div style={{ width: 100, marginRight: "33px", lineHeight: "100px" }}>请上传头像</div>
                  <Upload
                    // action={this.action}
                    // prompt={this.getPrompt(pos, true)}
                    // style={{ marginLeft: -5 }}
                    promptPosition={"right"}
                    listType="picture"
                  // defaultFileList={this.state.defaultFileList}
                  >
                    <IconPlus size="extra-large" />
                  </Upload>
                </div>
                <div style={{ display: "flex", marginTop: "30px" }}>
                  <Button theme='borderless' type='tertiary'  >已有账号，前往登录页面</Button>
                  <Button type="primary" block theme="solid"  >注册</Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div >
    );
  }
}
export default connect((state) => ({ screenHeight: state.reHeight }), {
  changeHeight: resize_heightAction
})(index)