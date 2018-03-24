import React from "react";
import PropTypes from "prop-types";
import LinkedList from "./linked-list";

export default class FocusFlow extends React.Component {
  static propTypes = {
    active: PropTypes.bool
  };

  static defaultProps = {
    active: true
  };

  static childContextTypes = {
    focusFlow: PropTypes.instanceOf(FocusFlow)
  };

  focusables = LinkedList();
  cur = null;

  getChildContext() {
    return {
      focusFlow: this
    };
  }

  componentDidMount() {
    if (this.props.active) {
      this.activate();
    }
  }

  componentWillUnmount() {
    if (this.props.active) {
      this.deactivate();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.props.active) {
      nextProps.active ? this.activate() : this.deactivate();
    }
  }

  add(focusable) {
    this.focusables.insert(focusable);
  }

  remove(focusable) {
    this.focusables.remove(focusable);
    // if removing cur, move cur to next node in list
    if (focusable === this.cur) {
      this.cur = this.cur.next;
    }
  }

  activate = () => {
    document.addEventListener("keydown", this.trapFocus);
  };

  deactivate = () => {
    document.removeEventListener("keydown", this.trapFocus);
  };

  trapFocus = e => {
    // if tab
    if (e.keyCode === 9) {
      e.preventDefault();
      this.focus();
    }
  };

  next() {
    this.cur = this.focusables.find(
      focusable => !focusable.isDisabled(),
      this.cur.next,
      "forward"
    );
    this.focus();
  }

  prev() {
    this.cur = this.focusables.find(
      focusable => !focusable.isDisabled(),
      this.cur.prev,
      "backward"
    );

    this.focus();
  }

  focus() {
    if (this.cur === null) {
      this.cur = this.focusables.head;
    }
    this.cur.focus();
  }

  isActive() {
    return this.props.active;
  }

  setActive(active) {
    this.cur = active;
    this.focus();
  }

  onKeyDown = e => {
    if (!e.defaultPrevented && e.keyCode === 9 && this.isActive()) {
      e.preventDefault();
      e.shiftKey ? this.prev() : this.next();
    }
  };

  render() {
    return <div onKeyDown={this.onKeyDown}>{this.props.children}</div>;
  }
}
