import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import Login from './containers/Login'
import Enroll from './containers/Enroll'

ReactDOM.render(
  <Provider store={store}>
    < Login />
  </Provider>
  , document.getElementById("root"));
