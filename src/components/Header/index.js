import React, { Component } from "react";
import { Toast, Dropdown, AutoComplete, Avatar, } from '@douyinfe/semi-ui';
import { IconStar, IconMenu, IconUserGroup, IconSearch } from '@douyinfe/semi-icons';
import { connect } from "react-redux";
import AddFriends from '../AddFriends'
import { DeleteUserInfoAction, disconnect_socket_action } from '../../redux/actions/login_action'
import { delete_friends_list_action } from "../../redux/actions/friend_list_action";
import { delete_current_talk_action } from "../../redux/actions/current_talk_action";
import { delete_current_talk_messages_action } from "../../redux/actions/current_messages_action";

import ShowSelfInfomation from '../../components/ShowSelfInfomation/ShowSelfInfomation'

import './index.css'

class index extends Component {

  state = {
    data: [],
    color: ['amber', 'indigo', 'cyan'],
    list: [],
    visible: false,
    placement: "left",
    showSelfFlag: false
  };

  handle = () => {
  }

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

  changePlacement = e => {
    this.setState({
      placement: e.target.value
    })
  }

  search(value) {
    let result;
    if (value) {
      result = this.state.list.map(item => {
        return { ...item, value: item.name, label: item.email };
      });
    } else {
      result = [];
    }
    this.setState({ data: result });
  }

  renderOption(item) {
    let optionStyle = {
      display: 'flex',
    };
    return (
      <>
        <Avatar color={item.color} size="small">
          {item.abbr}
        </Avatar>
        <div style={{ marginLeft: 4 }}>
          <div style={{ fontSize: 14, marginLeft: 4 }}>{item.name}</div>
          <div style={{ marginLeft: 4 }}>{item.email}</div>
        </div>
      </>
    );
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
            data={this.state.data}
            prefix={<IconSearch />}
            size="large"
            style={{ width: 260, marginTop: "-10px", marginLeft: "10px" }}
            renderSelectedItem={option => option.email}
            renderItem={this.renderOption}
            onSearch={this.search.bind(this)}
            onSelect={v => console.log(v)}
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
    friend_list: state.friendList
  }),
  {
    cancellationToken: DeleteUserInfoAction,
    disconnect_io: disconnect_socket_action,
    delete_friends_list: delete_friends_list_action,
    delete_current_talk: delete_current_talk_action,
    delete_current_talk_messages: delete_current_talk_messages_action
  }
)(index)
