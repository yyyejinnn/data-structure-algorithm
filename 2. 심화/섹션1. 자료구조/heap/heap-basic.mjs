import { BinaryTree } from './binaryTree.mjs';

// 최소 힙 구현
export class HeapBasic {
  constructor() {
    this.root = null;
    this.lastInsertedNode = null;
  }

  /** 삽입 */
  insert(data) {
    /** 1. 삽입 */

    // 데이터 처음 삽입할 경우
    if (this.lastInsertedNode == null) {
      this.lastInsertedNode = new BinaryTree(data);
      this.root = this.lastInsertedNode;
      return;
    }

    // 가장 마지막 위치에 노드 삽입
    let insertingParent = this.getInsertingParent();
    let newNode = new BinaryTree(data);

    if (insertingParent.getLeftSubTree() == null) {
      insertingParent.setLeftSubTree(newNode);
    } else if (insertingParent.getRightSubTree() == null) {
      insertingParent.setRightSubTree(newNode);
    }

    newNode.parent = insertingParent;
    this.lastInsertedNode = newNode;

    /** 2. 우선 순위에 맞게 정렬 */
    while (newNode.parent != null) {
      if (this.isBigPriority(newNode.getData(), newNode.parent.getData())) {
        let temp = newNode.getData();
        newNode.setData(newNode.parent.getData());
        newNode.parent.setData(temp);

        newNode = newNode.parent; //  한 단계 위로
      } else {
        break; // 부모 노드가 없을 때까지 (루트 노드까지)
      }
    }
  }

  isBigPriority(data, compare) {
    return data < compare;
  }

  /**
   * 새로 삽입할 위치 찾기 위한 함수
   * 1. 마지막 삽입한 노드(lastInsertedNode)가 루트 노드인 경우 -> 부모노드의 왼쪽에 삽입
   * 2. lastInsertedNode가 부모노드의 왼쪽 자식인 경우 -> 부모노드의 오른쪽에 삽입
   * 3. lastInsertedNode가 부모노드의 오른쪽 자식인 경우
   *   3-1. 부모노드 중 오른쪽 형제 노드를 가지는 노드가 존재하는 경우 -> 해당 노드의 가장 왼쪽으로
   *   3-2. (동일) 존재하지 않는 경우 -> 루트노드부터 시작해 가장 왼쪽
   */
  getInsertingParent() {
    // 1. 마지막 삽입한 노드(lastInsertedNode)가 루트 노드인 경우 -> 부모노드의 왼쪽에 삽입
    if (this.lastInsertedNode.parent == null) {
      return this.lastInsertedNode;
    }

    // 2. lastInsertedNode가 부모노드의 왼쪽 자식인 경우 -> 부모노드의 오른쪽에 삽입
    else if (this.lastInsertedNode == this.lastInsertedNode.parent.getLeftSubTree()) {
      return this.lastInsertedNode.parent;
    }

    // 3. lastInsertedNode가 부모노드의 오른쪽 자식인 경우
    else {
      let current = this.lastInsertedNode;
      let firstRightSibling = null;

      while (current.parent.parent != null) {
        current = current.parent;
        firstRightSibling = this.getRightSibling(current);

        if (firstRightSibling != null) {
          break;
        }
      }

      // 3-1. 부모노드 중 오른쪽 형제 노드를 가지는 노드가 존재하는 경우 -> 해당 노드의 가장 왼쪽으로
      if (firstRightSibling != null) {
        while (firstRightSibling.getLeftSubTree() != null) {
          firstRightSibling = firstRightSibling.getLeftSubTree();
        }

        return firstRightSibling;
      } else {
        // 3-2. (동일) 존재하지 않는 경우 -> 루트노드부터 시작해 가장 왼쪽

        let current = this.root;

        while (current.getLeftSubTree() != null) {
          current = current.getLeftSubTree();
        }

        return current;
      }
    }
  }

  getRightSibling(node) {
    const rightSibling = node.parent.getRightSubTree();

    return rightSibling != node ? rightSibling : null;
  }

  getLeftSibling(node) {
    const leftSibling = node.parent.getLeftSubTree();

    return leftSibling != node ? leftSibling : null;
  }

  /** 제거
   * 1. root와 lastInsertedNode 값 swap
   * 2. lastInsertedNode 제거
   * 3. lastInsertedNode 업데이트
   * 4. root 값 정렬
   */
  remove() {
    let deletedNode = null;

    if (this.lastInsertedNode == this.root) {
      deletedNode = this.root;
      this.lastInsertedNode = null;
      this.root = null;

      return deletedNode;
    }

    let prevLastInsertedNode = this.getNewLastInsertedNode(); // lastInsertedNode의 바로 이전 노드

    // 1. root와 lastInsertedNode 값 swap
    let rootData = this.root.getData();
    let lastInsertedData = this.lastInsertedNode.getData();

    this.root.setData(lastInsertedData);
    this.lastInsertedNode.setData(rootData);

    // 2. lastInsertedNode 제거 (부모와 연결 끊기)
    if (this.lastInsertedNode.parent.getLeftSubTree() == this.lastInsertedNode) {
      this.lastInsertedNode.parent.setLeftSubTree(null);
    } else {
      this.lastInsertedNode.parent.setRightSubTree(null);
    }
    this.lastInsertedNode.parent = null;

    deletedNode = this.lastInsertedNode;
    this.lastInsertedNode = prevLastInsertedNode; // 3. lastInsertedNode 업데이트

    // 4. root 값 정렬 (top-down)
    let current = this.root;

    do {
      let higherChild = this.getHigherPrioityChild(current.getLeftSubTree(), current.getRightSubTree());

      if (higherChild == null) {
        break;
      } else if (this.isBigPriority(current.getData(), higherChild.getData())) {
        break;
      } else {
        // swap

        let temp = current.getData();
        current.setData(higherChild.getData());
        higherChild.setData(temp);

        current = higherChild;
      }
    } while (current.getLeftSubTree() != null || current.getRightSubTree() != null);

    return deletedNode;
  }

  getHigherPrioityChild(left, right) {
    // 오른쪽 자식만 없는 경우는 없음
    if (right == null) {
      return left;
    }

    if (this.isBigPriority(left.getData(), right.getData())) {
      return left;
    } else {
      return right;
    }
  }

  /**
   * lastInsertedNode 업데이트할 위치 (lastInsertedNode 바로 이전)
   * 1. 마지막 삽입된 노드가 부모노드의 왼쪽 자식노드인 경우
   *   1-1. 부모노드 중 왼쪽 형제 노드가 존재하는 경우 -> 형제 노드의 맨 오른쪽으로
   *   1-2. ~ 존재하지 않는 경우 -> 루트노드에서 맨 오른쪽으로
   * 2. 마지막에 삽입된 노드가 부모노드의 오른쪽 자식노드인 경우 -> 부모노드의 왼쪽 자식 노드
   */
  getNewLastInsertedNode() {
    let prevLastInsertedNode = null;

    // 1. 마지막 삽입된 노드가 부모노드의 왼쪽 자식노드인 경우
    if (this.lastInsertedNode == this.lastInsertedNode.parent.getLeftSubTree()) {
      let current = this.lastInsertedNode;
      let firstLeftSibling = null;

      while (current.parent.parent != null) {
        current = current.parent;
        firstLeftSibling = this.getLeftSibling(current);
        if (firstLeftSibling != null) {
          break;
        }
      }

      // 1-1. 부모노드 중 왼쪽 형제 노드가 존재하는 경우 -> 형제 노드의 맨 오른쪽으로
      if (firstLeftSibling != null) {
        while (firstLeftSibling.getRightSubTree() != null) {
          firstLeftSibling = firstLeftSibling.getRightSubTree();
        }
        prevLastInsertedNode = firstLeftSibling;
      } else {
        // 1-2. ~ 존재하지 않는 경우 -> 루트노드에서 맨 오른쪽으로

        let current = this.root;

        while (current.getRightSubTree() != null) {
          current = current.getRightSubTree();
        }

        prevLastInsertedNode = current;
      }
    } else {
      // 2. 마지막에 삽입된 노드가 부모노드의 오른쪽 자식노드인 경우 -> 부모노드의 왼쪽 자식 노드

      prevLastInsertedNode = this.lastInsertedNode.parent.getLeftSubTree();
    }

    return prevLastInsertedNode;
  }
}

/**
 * test
 */

// let heap = new HeapBasic();
// heap.insert(4);
// heap.insert(2);
// heap.insert(5);
// heap.insert(7);
// heap.insert(1);

// console.log('================');
// heap.root.inOrderTraversal(heap.root);

// console.log('=======root======');
// console.log(heap.root.getData());

// console.log('=======remove======');
// console.log(heap.remove()); // 1
