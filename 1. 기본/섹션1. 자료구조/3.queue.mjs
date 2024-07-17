/**
 * -> 기존 연결리스트를 이중연결리스트 자료구조로 변경 필요
 *
 * 큐의 추상자료형
 * enqueue
 * dequeue
 * front
 * isEmpty
 */

import { DoublyLinkedList } from './4.doubly-linked-list.mjs';

class Queue {
  constructor() {
    this.list = new DoublyLinkedList();
  }

  enqueue(data) {
    this.list.insertAt(0, data);
  }

  dequeue() {
    try {
      return this.list.deleteLast();
    } catch (err) {
      return null;
    }
  }

  front() {
    // 다음에 제거될 요소(stack의 peek과 유사)
    return this.list.tail;
  }

  isEmpty() {
    return this.list.count == 0;
  }
}

export { Queue };
