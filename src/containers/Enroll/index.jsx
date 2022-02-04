import React, { Component } from 'react';
import { Input, Toast, Button, Upload, Col, Row, TextArea } from '@douyinfe/semi-ui';
import { IconPlus } from '@douyinfe/semi-icons';
import { connect } from 'react-redux';

import axios from 'axios';

import './index.css'
import { resize_heightAction } from '../../redux/actions/height_resize'
class index extends Component {

  constructor() {
    super();
    this.uploadRef = React.createRef()
  }

  state = {
    username: '',
    password: '',
    signaturePerson: '',
  }

  handleSubmit = () => {
    this.uploadRef.current.upload();
  };

  onChange = () => {
    return (e, ee) => {
      this.setState({ [ee.target.name]: e })
    }
  }

  handleEnroll = (e) => {
    const { msg, status } = e.response
    status == 200 ? Toast.success(msg) : Toast.error(msg)


  }


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
                  <Input name="username" showClear size='large' onChange={this.onChange()}></Input>
                </div>
                <div className="fontSet" style={{ display: "flex", marginTop: "30px" }}>
                  <div style={{ width: "200px" }}>请输入密码</div>
                  <Input name="password" mode="password" showClear size='large' onChange={this.onChange()}></Input>
                </div>
                <div className='fontSet' style={{ display: "flex", marginTop: 30 }}>
                  <div className='ddd' style={{ width: 200, lineHeight: "100px" }}>请输入个性签名</div>
                  <TextArea
                    name="signaturePerson"
                    onChange={this.onChange()}
                    style={{ width: 350, height: 80 }}
                    maxCount={20} showClear />
                </div>
                <div className="fontSet" style={{ display: "flex", marginTop: 20 }}>
                  <div style={{ width: 100, marginRight: "33px", lineHeight: "100px" }}>请上传头像</div>
                  <Upload
                    upload={() => { return }}
                    uploadTrigger="custom"
                    ref={this.uploadRef}
                    afterUpload={this.handleEnroll}
                    data={this.state}
                    fileName="userPhoto"
                    action='http://localhost:3000/enroll'
                    accept='image/*'
                    limit="1"
                    maxSize={1024} //最大上传5M
                    onSizeError={() => (Toast.error("上传头像尺寸最大为1M"))}
                    listType="picture"
                  // customRequest={this.uploadRequest}
                  >
                    <IconPlus size="extra-large" />
                  </Upload>
                </div>
                <div style={{ display: "flex", marginTop: "30px" }}>
                  <Button theme='borderless' type='tertiary'  >已有账号，前往登录页面</Button>
                  <Button type="primary" block theme="solid" onClick={this.handleSubmit}  >注册</Button>
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