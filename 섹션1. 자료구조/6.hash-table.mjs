/**
 * 해시테이블
 * - 언어에 따라 Hash, Map, HashMap, Dictionary 라고도 불림
 * - 충돌(collision)을 방지하기위해 각 인덱스의 데이터를 연결리스트로 구성
 * - 해시 함수 선정이 매우 중요 (소수의 인덱스에만 몰리지않게)
 * - 장점: 빠른 데이터 탐색, 삽입, 삭제
 * - 단점: 공간 효율성이 좋지 않음
 *
 * 해시테이블 추상자료형
 * set
 * get
 * remove
 */

import { DoublyLinkedList } from './doubly-linked-list.mjs';

class HashData {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

class HashTable {
  constructor() {
    this.arr = [];

    for (let i = 0; i < 10; i++) {
      this.arr[i] = new DoublyLinkedList();
    }
  }

  hashFunction(number) {
    return number % 10;
  }

  set(key, value) {
    if (this.get(key) != null) {
      throw new Error(`이미 존재하는 키 값입니다. ${key} - ${this.get(key)}`);
    }

    const hashedIdx = this.hashFunction(key);
    const hashData = new HashData(key, value);

    this.arr[hashedIdx].insertAt(0, hashData);
  }

  get(key) {
    const hashedIdx = this.hashFunction(key);

    let currNode = this.arr[hashedIdx].head;

    while (currNode !== null) {
      if (key == currNode.data.key) {
        return currNode.data.value;
      }
      currNode = currNode.next;
    }

    return null;
  }

  remove(key) {
    const hashedIdx = this.hashFunction(key);
    const list = this.arr[hashedIdx];
    const currNode = list.head;
    const deletedIdx = 0;

    while (currNode != null) {
      if (key == currNode.data.key) {
        return list.deleteAt(deletedIdx);
      }

      currNode = currNode.next;
      deletedIdx++;
    }

    return null;
  }
}

export { HashTable };
