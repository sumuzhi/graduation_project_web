import React, { Component } from 'react';
import { Button, ButtonGroup, Col, Toast, Avatar, List, Form, Modal } from '@douyinfe/semi-ui';

import { searchFriend } from '../../API';
import './index.css'

export default class index extends Component {

  state = {
    searchList: [],
    apply_list: [],
    searchLoading: false
  }

  showDialog = () => {
    // this.setState({
    //   visible: true
    // });
  }
  handleOk = (e) => {
    this.changeModel()
    console.log('Ok button clicked');
  }

  handleAfterClose = (e) => {
    console.log('关闭后的回调');
  }
  //点击取消按钮和取消图标调用的是同一个方法
  handleCancel = (e) => {
    this.changeModel()
    console.log('点击了取消按钮');
  }

  componentDidMount() {
    console.log(this.props);
    this.changeModel = this.props.changeModel
    // this.show = this.props.show
    // console.log(this.show);
  }
  componentWillUnmount() {
    console.log("unmount:Pop");
  }

  handleSubmit = (values) => {
    this.setState({ searchLoading: true })
    searchFriend(values).then((result) => {
      if (result.status !== 200)
        Toast.info(result.msg)
      else {
        this.setState({
          // searchList: [...this.state.searchList, result.data]
          searchList: [...this.state.searchList, result.data]
        })
      }
      this.setState({ searchLoading: false })
    })
    // Toast.info('表单已提交');
  }

  render() {

    return (
      <Modal
        style={{ display: "flex" }}
        okText="关闭"
        // fullScreen
        closeIcon={true}
        style={{ width: 800 }}
        visible={true}
        hasCancel={false}
        onOk={this.handleCancel}
        afterClose={this.handleAfterClose} //>=1.16.0
      // onCancel={this.handleCancel}
      >
        <div style={{ display: "flex", height: 42 }}>
          <Form layout="horizontal"
            onSubmit={values => this.handleSubmit(values)}
          >
            <Form.Input
              showClear
              noLabel
              field="username"
              style={{ width: 250, marginLeft: 40, marginBottom: 10 }}
            />
            <Button type="primary"
              loading={this.state.searchLoading}
              htmlType="submit">搜索</Button>
          </Form>
          <div
            style={{ paddingLeft: 50, lineHeight: "32px", fontSize: 20, fontWeight: 500, color: "#1C1F23" }}
          >申请列表</div>
        </div>
        <div
          style={{ width: "100%", height: "100%", display: "flex" }}
        >

          {/* //左边搜索列表 */}
          <div className='lightscrollbar'
            style={{ height: 400, width: "50%", overflow: 'auto', padding: 10 }}>
            <List
              dataSource={this.state.searchList}
              renderItem={item => (
                <List.Item
                  header={<Avatar size='small' src={item.userPhoto}></Avatar>}
                  main={
                    <div>
                      <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>{item.username}</span>
                      <p
                        style={{
                          color: 'var(--semi-color-text-2)',
                          margin: '4px 0',
                          width: 132,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.signaturePerson}
                      </p>
                    </div>
                  }
                  extra={
                    <ButtonGroup
                      theme="borderless">
                      <Button

                      >添加</Button>
                      <Button>通过</Button>
                    </ButtonGroup >
                  }
                />
              )}
            />
          </div>

          {/* //右边申请列表 */}
          <div className='lightscrollbar'
            style={{ height: 400, width: "50%", overflow: 'auto', padding: 10 }}
          >
            <List
              //  header={<h4>Header</h4>}
              dataSource={this.state.apply_list}
              renderItem={item => (
                <List.Item
                  header={<Avatar size='small' src={item.userPhoto}></Avatar>}
                  main={
                    <div>
                      <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>示例标题</span>
                      <p
                        style={{
                          color: 'var(--semi-color-text-2)',
                          margin: '4px 0',
                          width: 132,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        Semi D维护语adsdadsadsad
                      </p>
                    </div>
                  }
                  extra={
                    <ButtonGroup
                      theme="borderless">
                      <Button
                      >通过</Button>
                      <Button
                        type="danger"
                      >拒绝</Button>
                    </ButtonGroup >
                  }
                />
              )}
            />
          </div>
        </div>
      </Modal>
    );
  }
}
