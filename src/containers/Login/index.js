import React, { Component } from 'react';
import { Form, Toast, Button, Input } from '@douyinfe/semi-ui';
import { connect } from 'react-redux';

import './index.css'
import img1 from './1.png'

class index extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    // console.log(this.props.screenHeight);
  }

  render() {
    const handleSubmit = (values) => {
      console.log(values);
      Toast.info('表单已提交');
    };
    return (
      <div className="login" style={{ height: this.props.screenHeight }}>
        <header></header>
        <section>
          <div className="headerTitle">
          </div>
          <Form
            labelPosition='left'
            labelWidth={60}
            onSubmit={values => handleSubmit(values)} style={{ width: 300 }}>
            <>
              <Form.Input field='phone' showClear label='用户名' style={{ width: '200px' }} placeholder='请输入用用户名'></Form.Input>
              <Form.Input mode="password" field='password' showClear label='密码' style={{ width: '200px' }} placeholder='请输入密码'></Form.Input>
              <div className="verify" style={{ display: "flex" }}>
                <Form.Input field='verifyCode' showClear label='验证码' style={{ width: '100px' }}></Form.Input>
                <div className="imgVerify">
                  <img src={img1} />
                </div>
              </div>
              <div style={{ display: 'flex', marginTop: 10, alignItems: 'center' }}>
                <Button theme='borderless' style={{ marginLeft: 50 }}>登录</Button>
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