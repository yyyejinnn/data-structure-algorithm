/**
 * 추상 자료형
 *
 * * 삽입/제거 공통 함수
 * - rotateLeft()
 * - rotateRight()
 * - replaceParentsChild()
 *
 * * 삽입
 * - insert()
 * - rebalanceAfterInsertion()
 * - getUncle()
 *
 * * 제거
 * - remove()
 * - removeWithZeroOrOneChild()
 * - getBiggestNode()
 * - rebalanceAfterDeletion()
 * - getSibling()
 * - gandleRedSibling()
 * - isBlack()
 * - handleBlackSiblingWithAtLeastOneRedChild()
 */

import { BinaryTree, RED, BLACK } from './binaryTree.mjs';

class RedBlackTree {
  constructor(rootNode = null) {
    this.root = rootNode;
  }

  search(data) {
    let currNode = this.root;

    while (currNode) {
      if (data == currNode.getData()) {
        return currNode.getData();
      }

      if (data < currNode.getData()) {
        currNode = currNode.getLeftSubTree();
      } else {
        currNode = currNode.getRightSubTree();
      }
    }

    return null;
  }

  rotateLeft(node) {
    let parent = node.parent;
    let rightChild = node.getRightSubTree(); // \ 모양 -> 무조건 오른쪽 노드만 존재

    node.setRightSubTree(rightChild.getLeftSubTree()); // NIL

    if (rightChild.getLeftSubTree() != null) {
      rightChild.getLeftSubTree().parent = node;
    }

    // 회전
    rightChild.setLeftSubTree(node);
    node.parent = rightChild;

    this.replaceParentsChild(parent, node, rightChild);
  }

  rotateRight(node) {
    let parent = node.parent;
    let leftChild = node.getLeftSubTree(); // \ 모양

    node.setLeftSubTree(leftChild.getRightSubTree()); // NIL

    if (leftChild.getRightSubTree() != null) {
      leftChild.getRightSubTree().parent = node;
    }

    leftChild.setRightSubTree(node);
    node.parent = leftChild;

    this.replaceParentsChild(parent, node, leftChild);
  }

  replaceParentsChild(parent, oldChild, newChild) {
    if (parent == null) {
      // 해당 노드가 root일 경우
      this.root = newChild;
    } else if (parent.getLeftSubTree() == oldChild) {
      parent.setLeftSubTree(newChild);
    } else if (parent.getRightSubTree() == oldChild) {
      parent.setRightSubTree(newChild);
    }

    if (newChild != null) {
      newChild.parent = parent;
    }
  }

  insert(data) {
    let current = this.root;
    let parent = null;

    // 삽입 위치 찾기
    while (current != null) {
      parent = current;

      if (data < current.getData()) {
        current = current.getLeftSubTree();
      } else if (data > current.getData()) {
        current = current.getRightSubTree();
      } else {
        return;
      }
    }

    // parent = 삽입할 노드의 부모 노드
    let newNode = new BinaryTree(data);

    if (parent == null) {
      this.root = newNode;
    } else if (data < parent.getData()) {
      parent.setLeftSubTree(newNode);
    } else {
      parent.setRightSubTree(newNode);
    }

    newNode.parent = parent;

    // 균형 맞추는 작업 필요
    this.rebalanceAfterInsertion(newNode);
  }

  rebalanceAfterInsertion(node) {
    let parent = node.parent;

    // 1. 새로운 노드가 루트노드인 경우
    if (parent == null) {
      node.color = BLACK;
      return;
    }

    if (parent.color == BLACK) {
      return;
    }

    const uncle = this.getUncle(parent);
    let grandParent = parent.parent;

    // 2. 부모노드와 삼촌노드가 빨간색인 경우
    if (uncle && uncle.color == RED) {
      parent.color = BLACK;
      uncle.color = BLACK;

      grandParent.color = RED;
      this.rebalanceAfterInsertion(grandParent); // root가 빨간색이 되지 않도록 (재귀)
    }

    // 3. 부모노드 빨, 삼촌노드 검, 삽입 노드가 안쪽/바깥쪽 손자인 경우
    else if (this.isBlack(uncle)) {
      // 3-1. 오른쪽 안쪽 손자 >
      if (grandParent.getRightSubTree() == parent && parent.getLeftSubTree() == node) {
        this.rotateRight(parent); // 안쪽 손자일 경우, 부모노드를 삽입노드 반대방향으로 회전해줘야 함
        this.rotateLeft(grandParent);
        node.color = BLACK;
        grandParent.color = RED;
      }

      // 3-2. 왼쪽 안쪽 손자 <
      else if (grandParent.getLeftSubTree() == parent && parent.getRightSubTree() == node) {
        this.rotateLeft(parent);
        this.rotateRight(grandParent);
        node.color = BLACK;
        grandParent.color = RED;
      }

      // 4-1. 오른쪽 바깥쪽 손자 \
      else if (grandParent.getRightSubTree() == parent && parent.getRightSubTree() == node) {
        this.rotateLeft(grandParent); // 바깥쪽 손자일 경우, 할아버지 노드를 삽입노드 반대방향으로 회전해줘야 함
        parent.color = BLACK;
        grandParent.color = RED;
      }

      // 4-2. 왼쪽 바깥쪽 손자 \
      else if (grandParent.getLeftSubTree() == parent && parent.getLeftSubTree() == node) {
        this.rotateRight(grandParent);
        parent.color = BLACK;
        grandParent.color = RED;
      }
    }
  }

  // 삼촌노드: 부모노드의 또다른 자식노드
  getUncle(parent) {
    let grandParent = parent.parent;

    if (grandParent.getLeftSubTree() == parent) {
      return grandParent.getRightSubTree();
    } else if (grandParent.getRightSubTree() == parent) {
      return grandParent.getLeftSubTree();
    }

    return null;
  }

  isBlack(node) {
    const isNILNode = node == null;

    return isNILNode || node.color == BLACK;
  }
}

class NilNode extends BinaryTree {
  constructor() {
    super(0);
    this.color = BLACK;
  }
}

/**
 * test
 */

let rbTree = new RedBlackTree();
rbTree.insert(17);
rbTree.insert(9);
rbTree.insert(19);
rbTree.insert(75);
rbTree.insert(85);

console.log('root:', rbTree.root.getData());
console.log('==========');

if (rbTree.root) {
  rbTree.root.inOrderTraversal(rbTree.root);
}
