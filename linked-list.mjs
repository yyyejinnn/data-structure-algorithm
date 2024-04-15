/**
 * 연결리스트 추상 자료형
 * - 모든 데이터 출력
 * - 모든 데이터 제거
 * - 인덱스 삽입
 * - 마지막 삽입
 * - 인덱스 삭제
 * - 마지막 삭제
 * - 인덱스 읽기
 */

class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.count = 0;
  }

  printAll() {
    let currNode = this.head;
    let text = '[';

    while (currNode != null) {
      console.log(currNode.data);
      currNode = currNode.next;

      if (currNode != null) {
        text += ', ';
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
    this.count = 0;
  }

  insertAt(index, data) {
    if (index > this.count || index < 0) {
      throw new Error('범위를 넘어갔습니다.');
    }

    let newNode = new Node(data);

    if (index == 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let currNode = this.head;

      for (let i = 0; i < index - 1; i++) {
        currNode = currNode.next;
      }

      newNode.next = currNode.next;
      currNode.next = newNode;
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

    if (index == 0) {
      let deletedNode = this.head;

      this.head = this.head.next;
      this.count--;

      return deletedNode;
    } else {
      let currNode = this.head;

      for (let i = 0; i < index - 1; i++) {
        currNode = currNode.next;
      }

      let deletedNode = currNode.next;

      currNode.next = currNode.next.next;
      this.count--;

      return deletedNode;
    }
  }

  deleteLast() {
    return this.deleteAt(this.count - 1);
  }
}

export { Node, LinkedList };
