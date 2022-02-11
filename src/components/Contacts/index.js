import React, { Component } from 'react'
import { connect } from 'react-redux';
import { List, Avatar, Spin} from '@douyinfe/semi-ui';
import { friends_list_action } from '../../redux/actions/friend_list_action'
import './index.css'
import { getFriendsList } from '../../API/index'

class index extends Component {

  state = {
    active: 0,
    loading: true,
  }

  // 点击卡片，更改样式
  messageClick = (item) => {
    console.log(item);
    this.setState({ active: item.number_id })
  }

  componentDidMount() {
    const { username, number_id } = this.props.userInfo
    this.sendForList(username, number_id)
  }


  //好友列表
  sendForList = (username, number_id) => {
    getFriendsList({ username, number_id })
      .then((result) => {
        const { status, data } = result
        if (status === 200) {
          this.props.getFriendsList(data)
          this.setState({ friendList: [...data], loading: false })
        }
      })
  }

  render() {
    return (
      <div className="lightscrollbar"
        onMouseEnter={this.activeScroll}
        style={{ height: this.props.screenHeight - 100, overflow: 'auto', padding: 10, minWidth: 300 }}>
        <List
          dataSource={this.props.friendslist}
          renderItem={item => (
            <List.Item
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
                  <p style={{ color: 'var(--semi-color-text-2)', margin: '4px 0' }}>
                    {item.signaturePerson}
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
      </div>
    )
  }
}
export default connect(
  (state) => ({
    userInfo: state.userInfo,
    friendslist: state.friends_lists,
  }),
  {
    getFriendsList: friends_list_action,
  }
)(index)