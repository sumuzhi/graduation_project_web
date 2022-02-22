import React, { Component } from 'react';
import Tab_list from '../../containers/Tab_list';
import Header from '../Header/Header'

export default class index extends Component {

  state = {
    showModal: false
  }

  changeModel = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  render() {
    return (
      <>
        <Header changeRightCoponent={this.props.changeRightCoponent}  show={this.state.showModal} changeModel={this.changeModel}></Header>
        <Tab_list changeRightCoponent={this.props.changeRightCoponent}></Tab_list>
      </>
    );
  }
}
