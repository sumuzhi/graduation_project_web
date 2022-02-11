import React, { Component } from 'react';
import Tab_list from '../../containers/Tab_list';
import Header from '../Header'

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
        <Header show={this.state.showModal} changeModel={this.changeModel}></Header>
        <Tab_list></Tab_list>
      </>
    );
  }
}
