import React from "react";
import PropTypes from "prop-types";
import LinkedList from "./linked-list";

export default class FocusFlow extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
    /* eslint-disable-next-line */
    children: PropTypes.any.isRequired
  };

  static defaultProps = {
    active: true
  };

  static childContextTypes = {
    focusFlow: PropTypes.instanceOf(FocusFlow)
  };

  /* eslint-disable-next-line */
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.props.active) {
      if (nextProps.active) {
        this.activate();
      } else {
        this.deactivate();
      }
    }
  }

  componentWillUnmount() {
    if (this.props.active) {
      this.deactivate();
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
      console.log("you are TRAPPED!");
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
    if (!e.defaultPrevented && e.keyCode === 9) {
      e.preventDefault();
      e.nativeEvent.stopImmediatePropagation();
      if (e.shiftKey) {
        this.prev();
      } else {
        this.next();
      }
    }
  };

  render() {
    const { active } = this.props;

    return (
      /* eslint-disable-next-line */
      <div onKeyDown={active ? this.onKeyDown : undefined}>
        {this.props.children}
      </div>
    );
  }
}
