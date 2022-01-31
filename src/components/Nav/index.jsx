import React, { Component } from 'react';
import Message from '../../containers/Message';
import Header from '../Header'

export default class index extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <>
        <Header></Header>
        <Message></Message>
      </>
    );
  }
}
