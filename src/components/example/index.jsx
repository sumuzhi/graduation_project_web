import { Button, Toast } from "@douyinfe/semi-ui";
import React, { Component } from "react";

class Index extends Component {
  render() {
    return (
      <div>
        <Button  onClick={() => Toast.success({ content: 'welcome' })}>按钮</Button>
      </div>
    );
  }
}

export default Index;
