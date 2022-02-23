import React, { Component } from 'react';
import { connect } from 'react-redux';
import { friends_list_action } from '../../redux/actions/friend_list_action'
import { Button, ButtonGroup, Toast, Avatar, List, Form, Modal } from '@douyinfe/semi-ui';

import { searchFriend, getFriendsList, getPreFriendList, operate_apply, applyToFriend } from '../../API';
import './index.css'

class index extends Component {

  state = {
    searchList: [],
    apply_list: [],
    username: '',
    number_id: '',
    searchLoading: false
  }

  //发送申请请求
  sendApply = (apply_name, apply_id) => {
    const { username, number_id } = this.state
    applyToFriend({ apply_id, apply_name, username, number_id })
      .then((result) => {
        if (result.status === 200) {
          Toast.success(result.msg)
        }
      })
    this.props.socket.emit("sendApplyTip", { apply_id })
  }

  //点击取消按钮和取消图标调用的是同一个方法
  handleCancel = (e) => {
    const { username, number_id } = this.state
    this.changeModel()
    console.log('点击了取消按钮');
    getFriendsList({ username, number_id }).then((result) => {
      if (result.status === 200)
        this.props.getFriendsLists(result.data)
    })
  }

  //得到用户的申请列表
  getPreFriendsList = () => {
    const { username, number_id } = this.state
    getPreFriendList({ username, number_id }).then((result) => {
      if (result.status === 200)
        this.setState({
          apply_list: result.data
        })
    })
  }

  componentDidMount() {
    const { username, number_id } = this.props.userInfo
    this.changeModel = this.props.changeModel
    this.setState({
      username,
      number_id
    }, () => {
      this.getPreFriendsList()
    })
  }


  //对申请好友进行操作
  bypassApply = (apply_name, apply_id, e) => {
    const { username, number_id } = this.state
    const type = e.target.innerText === "通过" ? "addFriend" : ""
    console.log(type);
    operate_apply({ username, number_id, apply_id, apply_name, type }).then((result) => {
      if (result.status === 200) {
        Toast.success(result.msg)
        this.getPreFriendsList()
      }
    })
  }

  handleSubmit = (values) => {
    this.setState({ searchLoading: true })
    searchFriend(values).then((result) => {
      if (result.status !== 200)
        Toast.info(result.msg)
      else {
        this.setState({
          searchList: [result.data, ...this.state.searchList]
        })
      }
      this.setState({ searchLoading: false })
    })
  }

  render() {

    return (
      <Modal
        style={{ display: "flex", width: 800 }}
        okText="关闭"
        closeIcon={true}
        visible={true}
        hasCancel={false}
        onOk={this.handleCancel}
        afterClose={this.handleAfterClose} //>=1.16.0
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
                      onClick={(e) => this.sendApply(item.username, item.number_id)}
                      theme="borderless">
                      <Button
                      >发送申请</Button>
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
                        onClick={(e) => this.bypassApply(item.username, item.number_id, e)}
                      >通过</Button>
                      <Button
                        onClick={(e) => this.bypassApply(item.username, item.number_id, e)}
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

export default connect(
  (state) => ({
    friendslist: state.friends_lists,
    socket: state.socket_io
  }),
  {
    getFriendsLists: friends_list_action
  }
)(index)