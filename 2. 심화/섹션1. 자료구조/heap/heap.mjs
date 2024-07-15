import { BinaryTree } from './binaryTree.mjs';

// 최소 힙 구현
class Heap {
  constructor() {
    this.root = null;
    this.lastInsertedNode = null;
  }

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
      const newNodeData = newNode.getData();
      const parentData = newNode.parent.getData();

      if (this.isBigPriority(newNodeData, parentData)) {
        newNode.parent.setData(newNodeData);
        newNode.setData(parentData);

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
      console.log(this.lastInsertedNode);
      console.log(this.lastInsertedNode == this.lastInsertedNode.parent.getLeftSubTree());
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
}

/**
 * test
 */

let heap = new Heap();
heap.insert(4);
heap.insert(2);
heap.insert(5);
heap.insert(7);
heap.insert(1);

console.log('================');
heap.root.inOrderTraversal(heap.root);

console.log('=======root======');
console.log(heap.root.getData());
