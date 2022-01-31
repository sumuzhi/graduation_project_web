import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";
import App from "./App";
import Login from './containers/Login'

ReactDOM.render(
  <Provider store={store}>
    < Login />
  </Provider>
  , document.getElementById("root"));
