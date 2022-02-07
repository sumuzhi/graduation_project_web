import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';


import { List, Avatar, Spin, Toast } from '@douyinfe/semi-ui';
import { resize_heightAction } from '../../redux/actions/height_resize'
import './index.css'
import { getFriendsList } from '../../API/index'


class index extends Component {
  state = {
    active: 0,
    friendList: [],
    loading: false,
  }

  // 点击卡片，更改样式
  messageClick = (item) => {
    console.log(item.number_id);
    this.setState({ active: item.number_id })
  }

  //高度自适应变化
  handleHeight = () => {
    const screenHeight = window.innerHeight
    this.props.changeHeight(screenHeight)
  }

  sendForList = (username, number_id) => {
    getFriendsList({ username, number_id })
      .then((result) => {
        const { status, data } = result
        if (status === 200) {
          this.setState({ friendList: [...data] })
        }
      })
  }

  componentDidMount() {
    // this.fetchData();
    Toast.success("Welcome: " + this.props.userInfo.username + " !")
    document.documentElement.style.overflow = 'hidden';
    window.addEventListener("resize", this.handleHeight)
    const { username, number_id } = this.props.userInfo
    this.sendForList(username, number_id)
  }


  componentWillUnmount() {
    window.removeEventListener("resize", this.handleHeight)
  }

  render() {
    const { friendList } = this.state;
    return (
      <div className="lightscrollbar"
        onMouseEnter={this.activeScroll}
        style={{ height: this.props.screenHeight - 100, overflow: 'auto', padding: 10, minWidth: 300 }}>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          threshold={20}
          useWindow={false}
        >
          <List
            dataSource={friendList}
            renderItem={item => (
              <List.Item
                extra={<Avatar
                  size='small'
                  color="green"
                >1
                </Avatar>}
                onClick={() => { this.messageClick(item) }}
                className={item.number_id === this.state.active ? "active " : "messageItem"}
                header={<Avatar
                  src={item.userPhoto}
                ></Avatar>}
                style={{ border: "none" }}
                main={
                  <div>
                    <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>
                      {item.username}
                    </span>
                    {/* 聊天消息小窗展示 */}
                    <p style={{ color: 'var(--semi-color-text-2)', margin: '4px 0' }}>
                      你好
                    </p>
                  </div>
                }
              />
            )}
          />
          {this.state.loading && (
            <div style={{ textAlign: 'center' }}>
              <Spin />
            </div>
          )}
        </InfiniteScroll>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    screenHeight: state.reHeight,
    userInfo: state.userInfo
  }),
  {
    changeHeight: resize_heightAction
  }
)(index)