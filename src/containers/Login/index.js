import React, { Component } from 'react';
import { Row, Col, Form, Toast, Button } from '@douyinfe/semi-ui';
import { connect } from 'react-redux';
import axios from 'axios';
import JsxParser from 'react-jsx-parser'
import './index.css'
import img1 from './1.png'

class index extends Component {
  constructor() {
    super()
    const aaa = React.createElement('<h1>hello world</h1>')
  }

  state = {
    codeImg: '',
    username: '',
    password: '',
    code: '',
    codeFlag: false,
    usernameFlag: false,
    passwordFlag: false,
  }


  getCodeImg = () => {
    axios.get('http://localhost:3000/captcha').then((data) => {
      this.setState({ codeImg: data.data })
    })
    // Toast.info("11")
  }

  postDataForLogin = () => {
    const { username, password, code } = this.state
    axios.post("http://localhost:3000/login", { username, password, code })
      .then(({data}) => {
        const { msg, status } = data
        status == 200 ? Toast.success(msg) : Toast.error(msg)
      })
  }

  componentDidMount() {
    this.getCodeImg()
  }

  //~ 点击登录按钮，发送请求
  handleSubmit = () => {
    const { username, password, code, usernameFlag, passwordFlag, codeFlag } = this.state
    if (usernameFlag && passwordFlag && codeFlag)
      if (username !== '' && password !== '')
        if (code !== '')
          this.postDataForLogin()
        else Toast.error("请输入验证码")
      else Toast.error("请输入用户名和密码");
    else
      Toast.error("请输入合法的数据")
  };

  asyncValiusername = (e) => {
    const re = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/
    const a = e.match(re)
    a == null ? this.setState({ usernameFlag: false }) : this.setState({ usernameFlag: true })
    if (!a) return "字母开头、 5-16位、字母数字下划线";
  }

  asyncValipassword = (e) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,16}$/
    const a = e.match(re)
    a == null ? this.setState({ passwordFlag: false }) : this.setState({ passwordFlag: true })
    if (!a) return "必须包含大小写字母和数字的组合，不能使用特殊字符，长度在 8-16 之间";
  }

  asyncValicode = (e) => {
    const re = /[a-zA-Z0-9]{4}/
    const a = e.match(re)
    a == null ? this.setState({ codeFlag: false }) : this.setState({ codeFlag: true })
    if (!a) return "验证码格式错误";
  }


  //*  利用form的change事件，将值赋值给state
  setUserInfo = (value) => {
    const { username, password, code } = value
    this.setState({
      username: username !== undefined ? username : '',
      password: password !== undefined ? password : '',
      code: code !== undefined ? code : ''
    })
  }

  render() {
    return (
      <div className="login" style={{ height: this.props.screenHeight }}>
        <header>
        </header>
        <section>
          <div className="headerTitle">
          </div>
          <Form
            showValidateIcon={false}
            onValueChange={(e) => { this.setUserInfo(e) }}
            labelPosition='left'
            labelWidth={60}
            style={{ width: 300 }}
          >
            <>
              <Form.Input
                validate={this.asyncValiusername}
                field='username'
                showClear
                trigger='blur'
                label='用户名'
                style={{ width: '200px' }}
                placeholder='请输入用用户名'
              ></Form.Input>
              <Form.Input
                validate={this.asyncValipassword}
                trigger='blur'
                mode="password"
                field='password'
                showClear
                label='密码'
                style={{ width: '200px' }}
                placeholder='请输入密码'
              />
              <div className="verify" style={{ display: "flex" }}>
                <Form.Input
                  validate={this.asyncValicode}
                  field='code'
                  showClear label='验证码'
                  style={{ width: '100px' }}
                />
                <div onClick={this.getCodeImg} className="imgVerify">
                  <JsxParser jsx={this.state.codeImg} />
                </div>
              </div>
              <div style={{ display: 'flex', marginTop: 10, alignItems: 'center' }}>
                <Button theme='borderless' style={{ marginLeft: 50 }} onClick={this.handleSubmit}>登录</Button>
                <Button theme='borderless' style={{ marginLeft: 100 }} type="tertiary">注册</Button>
              </div>
            </>
          </Form>
        </section>
        <footer></footer>
      </div>
    );
  }
}
export default connect((state) => ({
  screenHeight: state.reHeight
}), {})(index)