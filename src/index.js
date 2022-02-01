import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";
import App from "./App";
import Login from './containers/Login'
import Enroll from './containers/Enroll'

ReactDOM.render(
  <Provider store={store}>
    < Enroll />
  </Provider>
  , document.getElementById("root"));
