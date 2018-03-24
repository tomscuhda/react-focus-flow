import React from "react";
import { render } from "react-dom";
import { FocusFlow, Focusable } from "../../lib";
import "./styles.css";

function Demo() {
  return (
    <div>
      <h1>Demo with examples of the component</h1>
      <FocusFlow>
        <Focusable index={1}>
          <input placeholder="first" />
        </Focusable>
        <Focusable index={2}>
          <button>second</button>
        </Focusable>
      </FocusFlow>
    </div>
  );
}

render(<Demo />, document.getElementById("app"));
