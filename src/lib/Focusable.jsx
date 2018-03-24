import React from "react";
import PropTypes from "prop-types";

import FocusFlow from "./FocusFlow";

export default class Focusable extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    autoFocus: PropTypes.bool
  };

  static defaultProps = {
    autoFocus: false
  };

  static contextTypes = {
    focusFlow: PropTypes.instanceOf(FocusFlow).isRequired
  };

  constructor(props) {
    super(props);
    this.index = props.index;
  }

  componentWillMount() {
    if (!this.context.focusFlow) {
      throw "All <Focusable> components must be a descendant of a <FocusFlow> component";
    }
    this.focusFlow = this.context.focusFlow;
  }

  componentDidMount() {
    // React translates an autoFocus on an element into
    // an imperative .focus() on mount - so we can't look at ref.autofocus
    // to see if the user wanted autofocus set.
    // So, if you want to autofocus, you need to put it on Focusable component i.e.,
    // <Focusable autoFocus .../>
    if (this.props.autoFocus) {
      this.focusFlow.setActive(this);
    }
  }

  componentWillUnmount() {
    this.focusFlow.remove(this);
  }

  focus() {
    this.node.focus();
  }
  isDisabled() {
    return this.node.disabled;
  }
  render() {
    const child = React.Children.only(this.props.children);

    return React.cloneElement(child, {
      ref: node => {
        // don't overwrite ref callback if present
        if (typeof child.ref === "function") {
          child.ref(node);
        }
        if (node === null) {
          return;
        }

        this.node = node;
        this.focusFlow.add(this);
      },
      onClick: e => {
        // don't overwrite onClick callback if present
        if (typeof child.props.onClick === "function") {
          child.props.onClick(e);
        }
        if (!e.defaultPrevented) {
          this.focusFlow.setActive(this);
        }
      }
    });
  }
}
