import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';


import { List, Button, Avatar, Spin } from '@douyinfe/semi-ui';
import { resize_height } from '../../redux/actions/height_resize'
import './index.css'

class index extends Component {

  constructor() {
    super();

    const count = 7;
    const dataList = [];
    for (let i = 0; i < 100; i++) {
      dataList.push({
        color: 'grey',
        title: `Semi Design Title ${i}`,
        loading: false,
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

  handleHeight = () => {
    const screenHeight = window.innerHeight
    console.log(screenHeight);
    this.props.changeHeight(screenHeight)
  }

  componentDidMount() {
    this.fetchData();
    document.documentElement.style.overflow = 'hidden';
    let aaa = window.innerHeight
    console.log(aaa);
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
          <Button onClick={this.fetchData}>显示更多</Button>
        </div>
      ) : null;
    return (
      <div className="lightscrollbar"
        style={{ height: this.props.screenHeight, overflow: 'auto', border: '1px solid var(--semi-color-border)', padding: 10 }}>
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
                header={<Avatar color={item.color}>SE</Avatar>}
                main={
                  <div>
                    <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 500 }}>
                      {item.title}
                    </span>
                    <p style={{ color: 'var(--semi-color-text-2)', margin: '4px 0' }}>
                      Semi Design
                      设计系统包含设计语言以及一整套可复用的前端组件，帮助设计师与开发者更容易地打造高质量的、用户体验一致的、符合设计规范的
                      Web 应用。
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
  changeHeight: resize_height
})(index)