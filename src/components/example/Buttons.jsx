import React, { useContext } from "react";

import { UPDATE_COLOR, ColorContext } from "./color";

const Buttons = (props) => {
  const {dispatch} = useContext(ColorContext);
  return (
    <React.Fragment>
      <button
        onClick={() => {
          dispatch({ type: UPDATE_COLOR, color: "red" });
        }}
      >
        红色
      </button>
      <button
      onClick={() => {
        dispatch({ type: UPDATE_COLOR, color: "green" });
      }}
      >绿色</button>
    </React.Fragment>
  );
};

export default Buttons;
