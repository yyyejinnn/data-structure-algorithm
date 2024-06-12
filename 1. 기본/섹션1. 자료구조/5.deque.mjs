/**
 * 덱 (Deque)
 * - head/tail 둘다 삽입/제거 가능
 * - stack 또는 queue 두 자료구조 모두 구현 가능함
 *
 * 덱의 추상자료형
 * printAll
 * addFirst
 * removeFirst
 * addLast
 * removeLast
 * isEmpty
 */

import { DoublyLinkedList } from './doubly-linked-list.mjs';

class Deque {
  constructor() {
    this.list = new DoublyLinkedList();
  }

  printAll() {
    this.list.printAll();
  }

  addFirst(data) {
    this.list.insertAt(0, data);
  }

  removeFirst() {
    return this.list.deleteAt(0);
  }

  addLast(data) {
    this.list.insertLast(data);
  }

  removeLast() {
    return this.list.deleteLast();
  }

  isEmpty() {
    return this.list.count == 0;
  }
}

export { Deque };
