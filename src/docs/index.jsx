import React from "react";
import { render } from "react-dom";
import { FocusFlow, Focusable } from "../../lib";
import "./styles.css";

const Other = () => (
  <div>
    Nested Component
    <Focusable index={3}>
      <input placeholder="i'm nested and at index 3" />
    </Focusable>
  </div>
);

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
        <Other />
      </FocusFlow>
    </div>
  );
}

render(<Demo />, document.getElementById("app"));
