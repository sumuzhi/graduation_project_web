import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';


import { List, Avatar, Spin, } from '@douyinfe/semi-ui';
import { resize_heightAction } from '../../redux/actions/height_resize'
import './index.css'



class index extends Component {
  state = {
    active: 0
  }

  constructor() {
    super();
    const count = 23;
    const dataList = [];
    for (let i = 0; i < 100; i++) {
      dataList.push({
        color: 'grey',
        title: `Semi Design Title ${i}`,
        loading: false,
        key: i
      });
    }
    this.data = dataList;
    this.count = 0;

    this.fetchData = () => {
      this.setState({
        loading: true,
      });
      return new Promise((res, rej) => {
        setTimeout(() => {
          let dataSource = this.data.slice(this.count * count, this.count * count + count);
          res(dataSource);
        }, 1000);
      }).then(dataSource => {
        let newData = [...this.state.dataSource, ...dataSource];
        this.count++;
        this.setState({
          loading: false,
          dataSource: newData,
          noMore: !dataSource.length,
        });
      });
    };

    this.state = {
      loading: false,
      dataSource: [],
      hasMore: true,
    };
  }

  messageClick = (item) => {
    this.setState({ active: item.key }, () => {
      console.log(this.state.active);
    })
  }

  handleHeight = () => {
    const screenHeight = window.innerHeight
    this.props.changeHeight(screenHeight)
  }

  componentDidMount() {
    this.fetchData();
    document.documentElement.style.overflow = 'hidden';
    window.addEventListener("resize", this.handleHeight)
  }


  componentWillUnmount() {
    window.removeEventListener("resize", this.handleHeight)
  }

  render() {
    const { loading, dataSource, hasMore } = this.state;
    const showLoadMore = this.count % 4 === 0;
    const loadMore =
      !loading && hasMore && showLoadMore ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
        </div>
      ) : null;
    return (
      <div className="lightscrollbar"
        onMouseEnter={this.activeScroll}
        style={{ height: this.props.screenHeight - 100, overflow: 'auto', padding: 10 }}>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          threshold={20}
          loadMore={this.fetchData}
          hasMore={!this.state.loading && this.state.hasMore && !showLoadMore}
          useWindow={false}
        >
          <List
            loadMore={loadMore}
            dataSource={dataSource}
            renderItem={item => (
              <List.Item
                extra={<Avatar
                  size='small'
                  color="green"
                >1
                </Avatar>}
                onClick={() => { this.messageClick(item) }}
                className={item.key === this.state.active ? "active " : "messageItem"}
                header={<Avatar color={item.color}>SE</Avatar>}
                style={{ border: "none" }}
                main={
                  <div>
                    <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>
                      {item.title}
                    </span>
                    <p style={{ color: 'var(--semi-color-text-2)', margin: '4px 0' }}>
                      计系统包含设计语言以及一整套可复
                    </p>
                  </div>
                }
              />
            )}
          />
          {this.state.loading && this.state.hasMore && (
            <div style={{ textAlign: 'center' }}>
              <Spin />
            </div>
          )}
        </InfiniteScroll>
      </div>
    );
  }
}

export default connect((state) => ({ screenHeight: state.reHight }), {
  changeHeight: resize_heightAction
})(index)