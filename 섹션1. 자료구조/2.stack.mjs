/**
 * 스택 추상 자료형 - 연결리스트로 구현
 * push
 * pop
 * peek: top 데이터 참조
 * isEmpty
 */

import { LinkedList } from './linked-list.mjs';

class Stack {
  constructor() {
    this.list = new LinkedList();
  }

  push(data) {
    this.list.insertAt(0, data);
  }

  pop() {
    try {
      return this.list.deleteAt(0);
    } catch (err) {
      return null;
    }
  }

  peek() {
    return this.list.getNodeAt(0);
  }

  isEmpty() {
    return this.list.count == 0;
  }
}
