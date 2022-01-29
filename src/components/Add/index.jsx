import { Component, createRef } from "react";
import { v4 as uuidv4 } from "uuid";

import "./index.css";

class Add extends Component {
  myref = createRef();

  clickBtn = () => {
    const name = this.myref.current.value;
    this.setName(name);
  };

  handleKeyUp = (event) => {
    if (event.keyCode !== 13) return;
    const { value: name } = event.target;
    this.setName(name);
  };

  setName = (name) => {
    if(name ==='')return
    this.myref.current.value=""
    const obj = { id: uuidv4(), name, done: false };
    this.props.updateState(obj);
  };

  render() {
    return (
      <div className="todo-header">
        <input
          ref={this.myref}
          type="text"
          placeholder="请输入你的任务名称，按回车键确认"
          onKeyUp={this.handleKeyUp}
        />
        <button onClick={this.clickBtn}>添加</button>
      </div>
    );
  }
}

export default Add;
