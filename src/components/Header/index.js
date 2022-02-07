import React, { Component } from "react";
import { Toast, Dropdown, AutoComplete, Avatar, } from '@douyinfe/semi-ui';
import { IconStar, IconMenu, IconUserGroup, IconSearch } from '@douyinfe/semi-icons';
import { connect } from "react-redux";
import AddFriends from '../AddFriends'
import { DeleteUserInfoAction } from '../../redux/actions/login_action'

import './index.css'

class index extends Component {

  constructor() {
    super();
    this.click = this.click.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.rightClick = this.rightClick.bind(this);
    this.state = {
      data: [],
      color: ['amber', 'indigo', 'cyan'],
      list: [
        { name: '夏可漫', email: 'xiakeman@example.com', abbr: 'XK', color: 'amber' },
        { name: '申悦', email: 'shenyue@example.com', abbr: 'SY', color: 'indigo' },
        { name: '曲晨一', email: 'quchenyi@example.com', abbr: 'CY', color: 'blue' },
        { name: '文嘉茂', email: 'wenjiamao@example.com', abbr: 'JM', color: 'cyan' },
      ],
      visible: false,
      placement: "left"
    };
  }

  handle = () => {
  }
  click = (value) => {
    const changeModel = this.props.changeModel
    changeModel()
  }

  mouseEnter(value) {
    Toast.info({ content: 'Nice to meet you!' });
  }

  mouseLeave(value) {
    Toast.info({ content: 'See ya!' });
  }

  rightClick(value) {
    this.props.cancellationToken()
  }

  change = () => {
    this.setState({
      visible: this.state.visible
    })
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
        {this.props.show ? <AddFriends show={this.props.show} changeModel={this.props.changeModel} /> : ''}
        <div style={{ height: 74 }}>
          <Dropdown
            clickToHide={true}
            trigger={'click'}
            position={'bottomLeft'}
            render={
              <Dropdown.Menu>
                <Dropdown.Item onClick={this.click}>添加好友</Dropdown.Item>
                <Dropdown.Item onClick={this.mouseEnter}>2: mouse enter</Dropdown.Item>
                <Dropdown.Item onClick={this.mouseLeave}>3: mouse leave</Dropdown.Item>
                <Dropdown.Item onClick={this.mouseLeave}>设置</Dropdown.Item>
                <Dropdown.Item onClick={this.rightClick}>退出登录</Dropdown.Item>
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
            style={{ width: '270px', marginTop: "-10px", marginLeft: "10px" }}
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
  (state) => ({ userInfo: state.userInfo }),
  {
    cancellationToken: DeleteUserInfoAction
  }
)(index)
