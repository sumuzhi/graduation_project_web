import React, { createContext, useReducer } from "react";

export const UPDATE_COLOR = "UPDATE_COLOR";
export const ColorContext = createContext({});

const reducer = (state, action) => {
  console.log(action,state);
  switch (action.type) {
    case UPDATE_COLOR:
      return action.color;
    default:
      return state;
  }
};

export const Color = (props) => {
  const [ color, dispatch ] = useReducer(reducer, "blue");
  return (
    <ColorContext.Provider value={{ color, dispatch }}>
      {console.log(props)}
      {props.children}
    </ColorContext.Provider>
  );
};
