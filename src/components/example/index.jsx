import React from "react";

import { Color } from "./color";
import Buttons from "./Buttons";
import ShowArea from "./ShowArea";

class Index extends React.Component {
  render() {
    return (
      <div>
        <Color>
          <ShowArea></ShowArea>
          <Buttons></Buttons>
        </Color>
      </div>
    );
  }
}

export default Index;
