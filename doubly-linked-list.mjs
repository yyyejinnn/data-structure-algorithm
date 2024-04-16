class Node {
  constructor(data, next = null, prev = null) {
    this.data = data;
    this.next = next;
    this.prev = prev;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  printAll() {
    let currNode = this.head;
    let text = '[';

    while (currNode != null) {
      // console.log(currNode.data);
      text += currNode.data;
      currNode = currNode.next;

      if (currNode != null) {
        text += `, `;
      }
    }

    text += ']';
    console.log(text);
  }

  getNodeAt(index) {
    if (index > this.count || index < 0) {
      throw new Error('범위를 넘어갔습니다.');
    }

    const currNode = this.head;

    for (let i = 0; i < index; i++) {
      currNode = currNode.next;
    }
    console.log(currNode);

    return currNode;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  insertAt(index, data) {
    if (index > this.count || index < 0) {
      throw new Error('범위를 넘어갔습니다.');
    }

    let newNode = new Node(data);

    if (index == 0) {
      newNode.next = this.head;

      if (this.head != null) {
        this.head.prev = newNode;
      }

      this.head = newNode;
    } else if (index == this.count - 1) {
      // insertLast
      this.tail.next = newNode;
      newNode.prev = this.tail;
    } else {
      let currNode = this.head;

      for (let i = 0; i < index - 1; i++) {
        currNode = currNode.next;
      }

      newNode.prev = currNode;
      newNode.next = currNode.next;

      currNode.next = newNode;
      newNode.next.prev = newNode;
    }

    if (newNode.next == null) {
      this.tail = newNode;
    }

    this.count++;
  }

  insertLast(data) {
    this.insertAt(this.count, data);
  }

  deleteAt(index) {
    if (index > this.count || index < 0) {
      throw new Error('범위를 넘어갔습니다.');
    }

    let deletedNode;

    if (index == 0) {
      deletedNode = this.head;

      if (this.head.next == null) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head.next;
        this.head.prev = null;
      }
    } else if (index == this.count - 1) {
      deletedNode = this.tail;

      this.tail = this.tail.prev;
      this.tail.next = null;
    } else {
      let currNode = this.head;

      for (let i = 0; i < index - 1; i++) {
        currNode = currNode.next;
      }

      deletedNode = currNode.next;
      currNode.next = currNode.next.next;
      currNode.next.prev = currNode;
    }

    this.count--;

    return deletedNode;
  }

  deleteLast() {
    return this.deleteAt(this.count - 1);
  }
}

export { Node, DoublyLinkedList };
