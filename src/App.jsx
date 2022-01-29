import { Component } from "react";

import Add from "./components/Add/";
import List from "./components/List";
import Footer from "./components/Footer/Footer";

import "./App.css";

class App extends Component {
  state = {
    todos: [
      { id: "001", name: "aaa", done: true },
      { id: "002", name: "bbb", done: false },
      { id: "003", name: "ccc", done: true },
    ],
  };


  updateState = (element) => {
    this.setState({
      todos: [element,...this.state.todos]
    });
  };

  deleteTodes = (element) => {
    
  }


  render() {
    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Add updateState={this.updateState}></Add>
          <List todos={this.state.todos} />
          <Footer></Footer>
        </div>
      </div>
    );
  }
}

export default App;
