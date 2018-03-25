# React Focus Flow
React components to define isolated focus flows. Especially useful for modals or any other scenario where you might not want global tabindex behavior. Basically local tabindex.

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
        </Focusable
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

## \<FocusFlow /\>

Marks the root of a focus flow. When active, focus will be restricted to this subtree.

### Props

**-active? = true** 

Indicates if the flow is active i.e., should tab order be confined to this FocusFlow. Easy way to switch behavior on/off.

## <Focusable />

Defines a focusable element in the flow. NOTE: this component does not wrap it's children in any extraneous elements - only what is passed as a child will render.

### Props

**index**

Required. Indicates the order in which this `<Focusable />` should be focused. Basically tabindex.

**autoFocus**

If you want an element to autofocus, mark the `<Focusable />` component, NOT the element itself. 

**children**

Only one child is allowed. Does not have to be an element, can also be a component that defines custom focus behavior. Just provide a `focus` method on your component. 
