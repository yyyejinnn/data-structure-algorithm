/**
 * 셋 (set)
 * - 데이터 중복을 허용하지 않는 자료구조
 *
 * 셋 추상자료형
 * add
 * isContain: 데이터 체크
 * remove
 * clear
 * isEmpty
 * printAll
 */

import { HashTable } from './hash-table.mjs';

class HashSet {
  constructor() {
    this.hashTable = new HashTable();
  }

  add(data) {
    this.hashTable.set(data, -1);
  }

  isContain(data) {
    return this.hashTable.get(data) != null;
  }

  remove(data) {
    return this.hashTable.remove(data);
  }

  clear() {
    // this.hashTable.arr = [];

    for (let i = 0; i < this.hashTable.arr.length; i++) {
      this.hashTable.arr[i].clear();
    }
  }

  isEmpty() {
    // return this.hashTable.arr.length == 0;

    for (let i = 0; i < this.hashTable.arr.length; i++) {
      if (this.hashTable.arr[i].count > 0) {
        return false;
      }
    }

    return true;
  }

  printAll() {
    let text = '[';

    for (let i = 0; i < this.hashTable.arr.length; i++) {
      let currNode = this.hashTable.arr[i].head;

      while (currNode != null) {
        text += `${currNode.data},`;
        currNode = currNode.next;
      }
    }

    text += ']';

    console.log(text);
  }
}
