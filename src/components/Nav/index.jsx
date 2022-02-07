import React, { Component } from 'react';
import Message_list from '../../containers/Message_list';
import Header from '../Header'

export default class index extends Component {

  state = {
    showModal: true
  }

  changeModel = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  render() {
    return (
      <>
        <Header show={this.state.showModal} changeModel={this.changeModel}></Header>
        <Message_list></Message_list>
      </>
    );
  }
}
