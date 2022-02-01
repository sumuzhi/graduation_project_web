import React, { Component } from 'react';
import { Form, Toast, Button } from '@douyinfe/semi-ui';
import { connect } from 'react-redux';

import './index.css'

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
          <Form onSubmit={values => handleSubmit(values)} style={{ width: 400 }}>
            {({ formState, values, formApi }) => (
              <>
                <Form.Input field='phone' showClear label='用户名' style={{ width: '300px' }} placeholder='请输入用用户名'></Form.Input>
                <Form.Input mode="password" field='password' showClear label='密码' style={{ width: '300px' }} placeholder='请输入密码'></Form.Input>
                <div style={{ display: 'flex', marginTop: 10, alignItems: 'center' }}>
                  <Button theme='borderless' style={{ color: 'var(--semi-color-primary)', marginLeft: 50, cursor: 'pointer' }}>登录</Button>
                  <Button theme='borderless' style={{ marginLeft: "100px" }} htmlType='submit' type="tertiary">注册</Button>
                </div>
              </>
            )}
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