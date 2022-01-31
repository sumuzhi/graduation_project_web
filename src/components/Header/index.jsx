import React, { Component, useState } from "react";

import { Tabs, Toast, Dropdown, TabPane, Space, AutoComplete, Avatar, SideSheet, RadioGroup, Radio, Button } from '@douyinfe/semi-ui';
import { IconStar, IconMenu, IconUserGroup, IconSearch } from '@douyinfe/semi-icons';

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
  click(value) {
    Toast.info({ content: 'You clicked me!' });
  }

  mouseEnter(value) {
    Toast.info({ content: 'Nice to meet you!' });
  }

  mouseLeave(value) {
    Toast.info({ content: 'See ya!' });
  }

  rightClick(value) {
    Toast.info({ content: 'Right clicked!' });
  }

  change = () => {
    this.setState({
      visible: !this.state.visible
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
      <div style={{height:64}}>

        <Dropdown
          trigger={'click'}
          position={'bottomLeft'}
          render={
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.click}>联系人</Dropdown.Item>
              <Dropdown.Item onClick={this.mouseEnter}>2: mouse enter</Dropdown.Item>
              <Dropdown.Item onClick={this.mouseLeave}>3: mouse leave</Dropdown.Item>
              <Dropdown.Item onClick={this.rightClick}>设置</Dropdown.Item>
            </Dropdown.Menu>
          }
        >
          <IconMenu
            className="circleIcon"
            onClick={this.change}
            size="extra-large"
            style={{ margin: "10px",padding:"10px"}}
          />
        </Dropdown>
        <AutoComplete
          data={this.state.data}
          prefix={<IconSearch />}
          size="large"
          style={{ width: '270px', marginTop:"-10px",marginLeft:"10px"}}
          renderSelectedItem={option => option.email}
          renderItem={this.renderOption}
          onSearch={this.search.bind(this)}
          onSelect={v => console.log(v)}
        ></AutoComplete>
      </div>
    );
  }
}

export default index;
