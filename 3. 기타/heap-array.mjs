class MaxHeap {
  // 최대힙
  constructor() {
    this.heap = [null];
  }

  enqueue(data) {
    // 맨 마지막 노드로 삽입
    this.heap.push(data);

    let currIdx = this.lastInstertedIdx;

    // 정렬
    while (currIdx > 1) {
      const parentIdx = this.getParentIdx(currIdx);

      if (this.heap[currIdx] < this.heap[parentIdx]) {
        break;
      }

      // swap
      // [this.heap[currIdx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[currIdx]];
      const temp = this.heap[currIdx];
      this.heap[currIdx] = this.heap[parentIdx];
      this.heap[parentIdx] = temp;

      currIdx = parentIdx;
    }
  }

  dequeue() {
    if (!this.root) {
      return;
    } else if (this.lastInstertedIdx === 1) {
      return this.heap.pop();
    }

    // 루트와 맨 마지막 요소 swap
    const deleted = this.root;
    this.root = this.heap.pop();

    // 정렬
    let currIdx = 1; // rootIdx;

    while (true) {
      const leftChildIdx = this.getLeftChildIdx(currIdx);
      const rightChildIdx = this.getRightChildIdx(currIdx);

      let largestIdx = currIdx;

      // 왼쪽 자식부터
      if (leftChildIdx <= this.lastInstertedIdx && this.heap[leftChildIdx] > this.heap[largestIdx]) {
        largestIdx = leftChildIdx;
      }

      // 오른쪽 자식 없을 경우 무시 됨
      if (rightChildIdx <= this.lastInstertedIdx && this.heap[rightChildIdx] > this.heap[largestIdx]) {
        largestIdx = rightChildIdx;
      }

      if (largestIdx === currIdx) {
        break;
      }

      // swap
      const temp = this.heap[currIdx];
      this.heap[currIdx] = this.heap[largestIdx];
      this.heap[largestIdx] = temp;

      currIdx = largestIdx;
    }

    return deleted;
  }

  getParentIdx(idx) {
    return Math.floor(idx / 2);
  }

  getLeftChildIdx(idx) {
    return idx * 2;
  }

  getRightChildIdx(idx) {
    return idx * 2 + 1;
  }

  get lastInstertedIdx() {
    return this.heap.length - 1;
  }

  get root() {
    return this.heap[1];
  }

  set root(data) {
    this.heap[1] = data;
  }
}

/** test */
const maxHeap = new MaxHeap();

maxHeap.enqueue(5);
maxHeap.enqueue(2);
maxHeap.enqueue(8);
maxHeap.enqueue(4);
maxHeap.enqueue(1);
maxHeap.enqueue(13);
maxHeap.enqueue(6);

console.log(maxHeap.heap);

console.log('====== dequeue ======');

console.log(maxHeap.dequeue());
console.log(maxHeap.dequeue());
console.log(maxHeap.dequeue());
console.log(maxHeap.dequeue());
console.log(maxHeap.dequeue());
console.log(maxHeap.dequeue());
console.log(maxHeap.dequeue());
