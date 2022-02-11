import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Login from './containers/Login'
import Enroll from './containers/Enroll'
import './socket/test'

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/main" exact element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/enroll" element={<Enroll />} />
      </Routes>
    </Provider>
  </BrowserRouter>

  , document.getElementById("root"));
