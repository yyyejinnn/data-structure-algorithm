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
