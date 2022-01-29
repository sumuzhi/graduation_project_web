import React, { useState } from "react";
import "./index.css";

function Item(props) {
  const [flag, setFlag] = useState(false);

  function changeFlag() {
    setFlag(!flag);
  }

  function removeNode(){
    
  }

  return (
    <li
      onMouseEnter={changeFlag}
      onMouseLeave={changeFlag}
      className={flag ? "active" : ""}
    >
      <label>
        <input type="checkbox" defaultChecked={props.done} />
        <span>{props.name}</span>
      </label>
      <button
        className="btn btn-danger"
        style={{ display: flag ? "block" : "none" }}
        onClick={removeNode}
      >
        删除
      </button>
    </li>
  );
}
export default Item;
