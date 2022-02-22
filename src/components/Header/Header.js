import React, { Component } from "react";
import { Toast, Dropdown, AutoComplete, Avatar, } from '@douyinfe/semi-ui';
import { IconStar, IconMenu, IconUserGroup, IconSearch } from '@douyinfe/semi-icons';
import { connect } from "react-redux";
import AddFriends from '../AddFriends'
import { DeleteUserInfoAction, disconnect_socket_action } from '../../redux/actions/login_action'
import { delete_friends_list_action } from "../../redux/actions/friend_list_action";
import { delete_current_talk_action } from "../../redux/actions/current_talk_action";
import { delete_current_talk_messages_action } from "../../redux/actions/current_messages_action";
import { current_friend_action } from '../../redux/actions/current_friend_action'

import ShowSelfInfomation from '../ShowSelfInfomation/ShowSelfInfomation'

import './index.css'

class Header extends Component {

  state = {
    data: [],
    visible: false,
    showSelfFlag: false
  };

  //展示添加好友组件
  handleAddFriend = (value) => {
    const changeModel = this.props.changeModel
    changeModel()
  }

  //退出登录
  handleQuit = () => {
    this.props.cancellationToken()
    this.props.disconnect_io(this.props.socket_io)
    this.props.delete_friends_list()
    this.props.delete_current_talk()
    this.props.delete_current_talk_messages()
  }

  //点击个人信息---可以修改
  handleSetting = () => {
    console.log(1);
    this.setState({ showSelfFlag: true })
  }

  changeSelfFlag = () => {
    this.setState({ showSelfFlag: false })
  }

  // ----------------------------搜索------------------------------------

  search = (value) => {
    let result;
    console.log(58, value);
    if (value) {
      result = this.props.friends_lists.filter(item => {
        return item.username.indexOf(value) !== -1
      });
    } else {
      result = [];
    }
    if (result.length !== 0) {
      result.map((c) => {
        c.value = { ...c }
      })
    }
    this.setState({ data: result });
  }

  renderOption = (item) => {
    return (
      <>
        <Avatar src={item.userPhoto} size="small" />
        <div style={{ marginLeft: 4 }}>
          <div style={{ fontSize: 14, marginLeft: 4 }}>{item.username}</div>
          <div style={{ marginLeft: 4 }}>{item.signaturePerson}</div>
        </div>
      </>
    );
  }

  selectaaa = (item) => {
    console.log(item);
    this.props.set_current_friend(item)
    this.props.changeRightCoponent(false)
  }

  render() {
    return (
      <>
        {this.state.showSelfFlag ? <ShowSelfInfomation userInfo={this.props.userInfo} changeSelfFlag={this.changeSelfFlag} /> : ''}
        {this.props.show ? <AddFriends userInfo={this.props.userInfo} show={this.props.show} changeModel={this.props.changeModel} /> : ''}
        <div style={{ height: 74, minWidth: 350 }}>
          <Dropdown
            clickToHide={true}
            trigger={'click'}
            position={'bottomLeft'}
            render={
              <Dropdown.Menu>
                <Dropdown.Item onClick={this.handleAddFriend}>添加好友</Dropdown.Item>
                <Dropdown.Item onClick={this.handleSetting}>个人信息</Dropdown.Item>
                <Dropdown.Item onClick={this.handleQuit}>退出登录</Dropdown.Item>
              </Dropdown.Menu>
            }
          >
            <IconMenu
              className="circleIcon"
              onClick={this.change}
              size="extra-large"
              style={{ margin: "10px", padding: "10px" }}
            />
          </Dropdown>

          {/* 搜索 */}
          <AutoComplete
            data={this.state.data}   //data为下拉框展示的数据
            prefix={<IconSearch />}
            size="large"
            showClear={true}
            style={{ width: 260, marginTop: "-10px", marginLeft: "10px" }}
            renderSelectedItem={option => option.value.username}  //点击后在输入框呈现的字符串
            renderItem={this.renderOption}
            onSearch={this.search}
            onSelect={(e) => { this.selectaaa(e) }}  //点击下拉框中的数据后
          />
        </div>
      </>
    );
  }
}

export default connect(
  (state) => ({
    userInfo: state.userInfo,
    socket_io: state.socket_io,
    friends_lists: state.friends_lists
  }),
  {
    cancellationToken: DeleteUserInfoAction,
    disconnect_io: disconnect_socket_action,
    delete_friends_list: delete_friends_list_action,
    delete_current_talk: delete_current_talk_action,
    delete_current_talk_messages: delete_current_talk_messages_action,
    set_current_friend: current_friend_action
  }
)(Header)
