// this is actually a sorted doubly circular linked list
const LinkedList = () => ({
  head: null,
  insert(newNode) {
    if (this.isEmpty()) {
      this.head = newNode;
      this.head.next = newNode;
      this.head.prev = newNode;
    } else {
      // find position in the list to insert by finding node to insert before,
      // if newNode has largest index in the list, append to the end of the list
      // by inserting before the head
      const after = this.find(node => newNode.index < node.index);
      this.insertBefore(newNode, after || this.head);

      if (after === this.head) {
        this.head = newNode;
      }
    }
  },

  remove(node) {
    /* eslint-disable no-param-reassign */
    // if length is one, null out the head and return
    if (node === node.next) {
      this.head = null;
      return;
    }

    // stitch refs
    node.next.prev = node.prev;
    node.prev.next = node.next;

    // if removing head, update position to next
    if (node === this.head) {
      this.head = node.next;
    }
  },
  isEmpty() {
    return this.head === null;
  },
  find(predicate, start, direction = "forward") {
    /* eslint-disable no-restricted-syntax */
    const nodes = this[Symbol.iterator](start, direction);
    for (const node of nodes) {
      if (predicate(node)) {
        return node;
      }
    }
    return undefined;
  },
  forEach(fn, start = this.head, direction = "forward") {
    const nodes = this[Symbol.iterator](start, direction);
    for (const node of nodes) {
      fn(node);
    }
  },
  length() {
    let count = 0;
    this.forEach(() => {
      count += 1;
    });
    return count;
  },

  insertBefore(node, after) {
    node.prev = after.prev;
    node.next = after;
    node.prev.next = node;
    after.prev = node;
  },
  [Symbol.iterator]: function* linkedListGenerator(
    start = this.head,
    direction = "forward"
  ) {
    let cur = start;

    if (this.isEmpty()) return;

    do {
      yield cur;
      cur = direction === "forward" ? cur.next : cur.prev;
    } while (cur !== start && cur !== null);
  }
});

export default LinkedList;
