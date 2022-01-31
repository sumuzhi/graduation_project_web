import React, { Component, createRef } from "react";
import { AutoComplete } from '@douyinfe/semi-ui';
import { IconSearch } from '@douyinfe/semi-icons';

import "./index.css";

class Add extends Component {

  constructor() {
    super();
    this.state = {
      list: [
        { value: 'abc', label: 'douyin', email: '1@gmail.com', type: 2 },
        { value: 'hotsoon', label: 'huoshan', email: '2@gmail.com', type: 3 },
        { value: 'pipixia', label: 'pip', email: '3@gmail.com' },
      ],
      loading: false,
    };
    this.onSearch = this.onSearch.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.renderSelectedItem = this.renderSelectedItem.bind(this);
    this.search = debounce(this.search.bind(this), 200);
  }
  onSearch(inputValue) {
    this.setState({ loading: true });
    this.search(inputValue);
  }

  search(inputValue) {
    let { list } = this.state;
    const newList = list.map(item => {
      let num = Math.random()
        .toString()
        .slice(2, 5);
      let option = inputValue + '-' + num;
      return { ...item, label: '名称:' + option, value: option };
    });
    this.setState({ list: newList, loading: false });
  }

  handleSelect(value) {
    console.log(value);
  }

  render() {
    return (
      <div>
        <div>{item.label}</div>
        <div>email: {item.email}</div>
        <div style={{ color: 'pink' }}>value: {item.value}</div>
      </div>
    );
  }
}

export default Add;
