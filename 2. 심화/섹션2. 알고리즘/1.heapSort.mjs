/**
 * 힙 정렬
 * - 오름차순 정렬 -> 최소 힙 (Min Heap)
 * - 내림차순 정렬 -> 최대 힙 (Max Heap)
 * -> 힙 빌 때까지 dequeue!
 *
 * 성능
 * - 삽입/제거 = O(logn)
 * - 정렬 = O(logn) * 데이터 n개 = O(nlogn)
 */

import { Heap } from '../섹션1. 자료구조/heap/heap.mjs';

class Mydata {
  constructor(data) {
    this.data = data;
    this.priority = data;
  }
}

let heap = new Heap();

heap.insert(new Mydata(2));
heap.insert(new Mydata(7));
heap.insert(new Mydata(3));
heap.insert(new Mydata(1));
heap.insert(new Mydata(5));
heap.insert(new Mydata(6));
heap.insert(new Mydata(9));
heap.insert(new Mydata(4));
heap.insert(new Mydata(8));

// heap.root.preOrderTraversal(heap.root);

let arr = [];

arr.push(heap.remove());
arr.push(heap.remove());
arr.push(heap.remove());
arr.push(heap.remove());
arr.push(heap.remove());
arr.push(heap.remove());
arr.push(heap.remove());
arr.push(heap.remove());
arr.push(heap.remove());

arr.forEach((a) => console.log(a.getData()));
