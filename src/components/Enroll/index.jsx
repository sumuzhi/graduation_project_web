import React, { Component } from "react";
import { Form, Toast, Button, Upload, Col, Row } from "@douyinfe/semi-ui";
import { IconPlus } from "@douyinfe/semi-icons";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../config/config";

import "./index.css";
import { resize_heightAction } from "../../redux/actions/height_resize";
class index extends Component {
  constructor() {
    super();
    this.uploadRef = React.createRef();
  }

  state = {
    usernameFlag: false,
    passwordFlag: false,
    signaturePersonFlag: true,
    username: "",
    password: "",
    signaturePerson: "",
  };

  handleSubmit = () => {
    const {
      username,
      password,
      usernameFlag,
      passwordFlag,
      signaturePersonFlag,
    } = this.state;
    if (usernameFlag && passwordFlag && signaturePersonFlag)
      if (username !== "" && password !== "") this.uploadRef.current.upload();
      else Toast.error("请输入用户名和密码");
    else Toast.error("请输入合法的数据");
  };

  //~ 点击注册按钮时后的回调函数
  handleEnroll = (e) => {
    const { msg, status } = e.response;
    if (status === 200) {
      Toast.success(msg);
    } else Toast.error(msg);
  };

  asyncValiusername = (e) => {
    const re = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
    const a = e.match(re);
    a == null
      ? this.setState({ usernameFlag: false })
      : this.setState({ usernameFlag: true });
    if (!a) return "字母开头、 5-16位、字母数字下划线";
  };

  asyncValipassword = (e) => {
    console.log(e);
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,16}$/;
    const a = e.match(re);
    a == null
      ? this.setState({ passwordFlag: false })
      : this.setState({ passwordFlag: true });
    if (!a)
      return "必须包含大小写字母和数字的组合，不能使用特殊字符，长度在 8-16 之间";
  };

  asyncValisignaturePerson = (e) => {
    if (e.length > 30) {
      this.setState({ signaturePersonFlag: false });
      return "个性签名字数应不超过30";
    }
    this.setState({ signaturePersonFlag: true });
  };

  //*  利用form的change事件，将值赋值给state
  setUserInfo = (value) => {
    const { username, password, signaturePerson } = value;
    this.setState({
      username: username !== undefined ? username : "",
      password: password !== undefined ? password : "",
      signaturePerson: signaturePerson !== undefined ? signaturePerson : "",
    });
  };

  render() {
    return (
      <div>
        <div className="grid">
          <Row>
            <Col span={11}>
              <div
                className="bgImage"
                style={{ height: this.props.screenHeight }}
              ></div>
            </Col>
            <Col span={2}></Col>
            <Col span={6}>
              <div className="title">
                <div className="titleFlag">欢迎注册QQ</div>
                <div className="titleSubTitle">每一天，乐在沟通。</div>
              </div>
              <div>
                <Form
                  showValidateIcon={false}
                  onValueChange={(e) => {
                    this.setUserInfo(e);
                  }}
                >
                  <Form.Input
                    validate={this.asyncValiusername}
                    trigger="blur"
                    name={"aaaa"}
                    field="username"
                    label={{
                      text: "请输入用户名",
                      width: "134px",
                      style: {
                        height: "73px",
                      },
                    }}
                    labelPosition="left"
                    size="large"
                    showClear
                  />

                  <Form.Input
                    name={"aaaa"}
                    validate={this.asyncValipassword}
                    trigger="blur"
                    field="password"
                    label={{
                      text: "请输入密码",
                      width: "134px",
                      style: {
                        height: "90px",
                      },
                    }}
                    labelPosition="left"
                    mode="password"
                    size="large"
                    showClear
                  />
                  <Form.TextArea
                    name={"aaaa"}
                    label={{
                      text: "请输入个性签名",
                      width: "134px",
                      style: {
                        height: "140px",
                      },
                    }}
                    labelPosition="left"
                    field="signaturePerson"
                    validate={this.asyncValisignaturePerson}
                    style={{ height: 115 }}
                    maxCount={30}
                    showClear
                  />
                </Form>
                <div
                  className="fontSet"
                  style={{ display: "flex", marginTop: 20 }}
                >
                  <div
                    style={{
                      width: 100,
                      marginRight: "33px",
                      lineHeight: "100px",
                    }}
                  >
                    请上传头像
                  </div>
                  <Upload
                    uploadTrigger="custom"
                    ref={this.uploadRef}
                    afterUpload={this.handleEnroll}
                    style={{ height: 105 }}
                    data={this.state}
                    fileName="userPhoto"
                    name="userPhoto"
                    action={`${BASE_URL}/enroll`}
                    accept="image/*"
                    limit="1"
                    maxSize={1024} //最大上传1M
                    onSizeError={() => Toast.error("上传头像尺寸最大为1M")}
                    listType="picture"
                  >
                    <IconPlus size="extra-large" />
                  </Upload>
                </div>
                <div style={{ display: "flex", marginTop: "30px" }}>
                  <Button theme="borderless" type="tertiary">
                    <Link to="/login">已有账号，前往登录页面</Link>
                  </Button>
                  <Button
                    type="primary"
                    block
                    theme="solid"
                    onClick={this.handleSubmit}
                  >
                    注册
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default connect((state) => ({ screenHeight: state.reHeight }), {
  changeHeight: resize_heightAction,
})(index);
