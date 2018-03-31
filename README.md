# React Focus Flow
React components to define isolated focus flows. Especially useful for modals or any other scenario where you might not want global tabindex behavior. Basically local tabindex.

## Installation

`npm install react-focus-flow --save`

## Usage

```javascript
import React from 'react';
import { FocusFlow, Focusable } from 'react-focus-flow';

const Other = () => (
  <Focusable index={3}>
    <div tabindex="0">nested component at index 3</div>
  </Focusable>
)

export default class SomeModal extends React.Component {
  render() {
    return (
      <FocusFlow>
        <Focusable index={1}>
          <input placeholder="first" />
        </Focusable>
        <Focusable autoFocus index={2}>
          <button>second</button>
        </Focusable>
        <Other />
      </FocusFlow>
    );
  }
}
```

Behaves pretty much like tabindex.

- Works with nested components. A `<Focusable />` component will register itself with the nearest ancestor `<FocusFlow />` component
- disabled elements will be skipped
- Focus flow will dynamically update itself when a `<Focusable />` component mounts and unmounts - no need to rerender entire `<FocusFlow/ >`
- When no element is in focus but the flow is still active, tab will bring focus to whatever the last focused element was before blur

A focusable attempts to focus its child by calling `focus` on the child's [ref](https://reactjs.org/docs/refs-and-the-dom.html). So, if the child is an HTMLElement, calling focus on the child's ref will call the HTMLElement `focus` method. If the child is a component, the component will need to define it's own focus method to manage its focus behavior or use [ref forwarding](https://reactjs.org/docs/forwarding-refs.html). Alternatively, you can bypass this altogether and define custom focus behavior using the `onFocusTurn` prop. 

## Examples

### Focusing a [styled component](https://github.com/styled-components/styled-components)

```javascript
import styled from 'styled-components';

const Input = styled.input`
  padding: 4px;
  border-radius: 4px;
  border: 1px solid #ced4da;
`;

...

handleInputFocus = () => {
  this.input.focus();
}

render() {
  return (
    ...
    <Focusable onFocusTurn={this.handleInputFocus} index={5}>
      <Input innerRef={(node) => { this.input = node; }} />
    </Focusable>
    ...
  )
}

```

## \<FocusFlow /\>

Marks the root of a focus flow. When active, focus will be restricted to this subtree.

### Props

**-active? = true** 

Indicates if the flow is active i.e., should tab order be confined to this FocusFlow. Easy way to switch behavior on/off.

## \<Focusable /\>

Defines a focusable element in the flow. NOTE: this component does not wrap it's children in any extraneous elements - only what is passed as a child will render.

### Props

**index: number**

Required. Indicates the order in which this `<Focusable />` should be focused. Basically tabindex.

**autoFocus = false**

If you want an element to autofocus, mark the `<Focusable />` component, NOT the element itself. 

**onFocusTurn: () => void**

Define custom behavior for this focusable's 'turn' i.e., when this focusable should focus.

**children**

Only one child is allowed. Can be DOM primitive or component. Just be sure to provide a `focus` method on your component. 

