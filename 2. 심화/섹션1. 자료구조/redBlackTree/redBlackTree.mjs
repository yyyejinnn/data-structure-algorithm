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
 * - handleRedSibling()
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

  // null 타입인 NilNode일 경우를 고려한 함수
  isBlack(node) {
    const isNILNode = node == null;

    return isNILNode || node.color == BLACK;
  }

  remove(data) {
    let current = this.root;

    while (current != null && current.getData() != data) {
      if (data < current.getData()) {
        current = current.getLeftSubTree();
      } else if (data > current.getData()) {
        current = current.getRightSubTree();
      }
    }

    // current = 제거할 노드

    if (current == null) {
      return;
    }

    let replaceNode = null;
    let deletedNodeColor = RED;

    // 제거 노드의 자식노드가 1개 이하일 경우
    if (current.getLeftSubTree() == null || current.getRightSubTree() == null) {
      replaceNode = this.removeWithZeroOrOneChild(current);
      deletedNodeColor = current.color;
    } else {
      // 2개일 경우
      let succesor = this.getBiggestNode(current.getLeftSubTree()); // 왼쪽 자식노드의 가장 큰 값
      current.getBiggestNode(succesor.getData());
      replaceNode = this.removeWithZeroOrOneChild(succesor);

      deletedNodeColor = current.color;
    }

    // 균형 체크: 제거 노드가 검정색일 경우 -> 형제 노드에 따라 처리
    if (deletedNodeColor == BLACK) {
      this.rebalanceAfterDeletion(replaceNode);

      if (replaceNode instanceof NilNode) {
        this.replaceParentsChild(replaceNode.parent, replaceNode, null);
      }
    }
  }

  // 제거 노드의 자식노드가 1개 이하일 경우
  removeWithZeroOrOneChild(node) {
    if (node.getLeftSubTree() != null) {
      this.replaceParentsChild(node.parent, node, node.getLeftSubTree()); // 제거노드의 자식노드를 제거노드의 부모노드의 자식노드로 변경
      return node.getLeftSubTree();
    } else if (node.getRightSubTree() != null) {
      this.replaceParentsChild(node.parent, node, node.getRightSubTree());
      return node.getRightSubTree();
    } else {
      // 제거노드가 검정색일 경우 형제노드에 따라 처리를 해줘야하는데 걍 null로 두면 굉장히 로직이 복잡 .. -> 임시 NIL 노드 생성
      let newChild = node.color == BLACK ? new NilNode() : null;
      this.replaceParentsChild(node.parent, node, newChild);

      return newChild;
    }
  }

  getBiggestNode(node) {
    let biggest = node;

    while (node.getRightSubTree() != null) {
      biggest = node.getRightSubTree();
    }

    return biggest;
  }

  // node: 대체된 노드
  rebalanceAfterDeletion(node) {
    if (node == this.root) {
      node.color = BLACK;
      return;
    }

    let sibling = this.getSibling(node);

    // 1. 형제 노드가 빨간색인 경우
    if (sibling.color == RED) {
      this.handleRedSibling(node, sibling);

      // 새로 변경된 형제노드가 다른 규칙 위반할 가능성 존재 -> sibling을 계속 업데이트 해줘야 함 (??)
      sibling = this.getSibling(node);
    }

    if (this.isBlack(sibling)) {
      if (this.isBlack(sibling.getLeftSubTree()) && this.isBlack(sibling.getRightSubTree())) {
        // 2. 형제 노드와 형제노드의 두 자식노드가 모두 검은색이고 부모노드는 빨간색인 경우
        if (sibling.parent.color == RED) {
          sibling.color = RED;
          node.parent.color = BLACK;
        }
        // 3. 형제 노드와 형제노드의 두 자식노드, 부모노드가 모두 검은색인 경우
        else {
          sibling.color = RED;
          this.rebalanceAfterDeletion(node.parent);
        }
      } else {
        // 4. 형제 노드가 검은색이고 형제의 두 자식노드 중 하나라도 빨간색 노드가 있고, "바깥쪽 조카 노드"가 검은색인 경우
        // 5. 4번과 동일, "바깥쪽 조카 노드"가 빨간색인 경우
        this.handleBlackSiblingWithAtLeastOneRedChild(node, sibling);
      }
    }
  }

  getSibling(node) {
    let parent = node.parent;

    if (node == parent.getLeftSubTree()) {
      return parent.getRightSubTree();
    } else {
      return parent.getLeftSubTree();
    }
  }

  handleRedSibling(node, sibling) {
    sibling.color = BLACK;
    node.parent.color = RED;

    // 부모노드를 대체된 노드 방향으로 회전
    const isLeftChild = node.parent.getLeftSubTree() == node;

    if (isLeftChild) {
      this.rotateLeft(node.parent);
    } else {
      this.rotateRight(node.parent);
    }
  }

  handleBlackSiblingWithAtLeastOneRedChild(node, sibling) {
    let isLeftChild = node.parent.getLeftSubTree() == node;

    // 4. 형제 노드가 검은색이고 형제의 두 자식노드 중 하나라도 빨간색 노드가 있고, "바깥쪽 조카 노드"가 검은색인 경우
    if (isLeftChild && this.isBlack(sibling.getRightSubTree())) {
      sibling.getLeftSubTree().color = BLACK;
      sibling.color = RED;
      this.rotateRight(sibling);
      sibling = node.parent.getRightSubTree();
    } else if (!isLeftChild && this.isBlack(sibling.getLeftSubTree())) {
      sibling.getRightSubTree().color = BLACK;
      sibling.color = RED;
      this.rotateLeft(sibling);
      sibling = node.parent.getLeftSubTree();
    }

    // 5. 4번과 동일, "바깥쪽 조카 노드"가 빨간색인 경우
    sibling.color = node.parent.color;
    sibling.parent.color = BLACK;

    if (isLeftChild) {
      sibling.getRightSubTree().color = BLACK;
      this.rotateLeft(node.parent); // 부모를 같은 방향으로 회전
    } else {
      sibling.getLeftSubTree().color = BLACK;
      this.rotateRight(node.parent);
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

let rbTree = new RedBlackTree();
rbTree.insert(17);
rbTree.insert(9);
rbTree.insert(19);
rbTree.insert(75);
rbTree.insert(85);

console.log('========== insert ==========');

console.log('root:', rbTree.root.getData());
if (rbTree.root) {
  rbTree.root.inOrderTraversal(rbTree.root);
}

console.log('========== remove ==========');
rbTree.remove(19);
rbTree.remove(75);
rbTree.remove(85);
console.log('root:', rbTree.root.getData());
rbTree.root.inOrderTraversal(rbTree.root);
