/**
 * * AVL 트리
 * - 이진 탐색 트리의 균형을 유지하는 자료구조
 * - 좌우 자식트리 높이 차이를 최대 1까지만 허용
 * - 회전을 통해 균형을 맞춰주자..
 *
 * * 회전 종류
 * - LL 회전 (Left Left Rotation)
 * -> 오른쪽으로 뻗은 트리
 *
 * - RR 회전
 * -> 왼쪽으로 뻗은 트리
 *
 * - LR 회전
 * -> 왼-오로 꺾인 트리
 *
 * - RL 회전
 * -> 오-왼으로 꺾인 트리
 *
 */

/**
 * * 구현
 * - 기존 이진탐색트리 + 균형 잡아주는 기능 추가
 *
 * * 추상자료형
 * - getHeight()
 * - updateHeight()
 * - getBalanceFactor()
 * - rotateLeft(): LL 회전
 * - rotateRight(): RR 회전
 * - rotation(): 실제로 회전 시키는 함수
 * - getUnBalanceNode(): 균형을 무너뜨린 노드를 찾는 함수
 * - removeHelper()
 */

import { BinaryTree } from './binaryTree.mjs';

export class AVLTree {
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

  getHeight(node) {
    return node == null ? 0 : node.height;
  }

  updateHeight(node) {
    let leftChildHeight = this.getHeight(node.getLeftSubTree());
    let rightChildHeight = this.getHeight(node.getRightSubTree());
    node.height = Math.max(leftChildHeight, rightChildHeight) + 1;
  }

  getBalanceFactor(node) {
    // 음수면 오른쪽, 양수면 왼쪽 노드가 더 높음
    return this.getHeight(node.getLeftSubTree()) - this.getHeight(node.getRightSubTree());
  }

  rotateLeft(node) {
    // 1-3-5 오른쪽으로 뻗어있다고 가정

    let childNode = node.getRightSubTree(); // 3
    node.setRightSubTree(childNode.getLeftSubTree()); // 만약 3노드에 왼쪽 자식도 존재하는 경우 -> 1의 오른쪽 노드에 연결
    childNode.setLeftSubTree(node);

    // 높이 계산
    this.updateHeight(node);
    this.updateHeight(childNode);

    return childNode; // 변경된 루트 노드 반환
  }

  rotateRight(node) {
    let childNode = node.getLeftSubTree();
    node.setLeftSubTree(childNode.getRightSubTree());
    childNode.setRightSubTree(node);

    this.updateHeight(node);
    this.updateHeight(childNode);

    return childNode;
  }

  rotation(targetNode, data) {
    let balancFactor = this.getBalanceFactor(targetNode);
    let isRootNode = targetNode == this.root;

    // LL: \모양
    if (balancFactor < -1 && data > targetNode.getRightSubTree().getData()) {
      targetNode = this.rotateLeft(targetNode);
    }
    // RR: /모양
    else if (balancFactor > 1 && data < targetNode.getLeftSubTree().getData()) {
      targetNode = this.rotateRight(targetNode);
    }
    // LR: <모양
    else if (balancFactor > 1 && data > targetNode.getLeftSubTree().getData()) {
      targetNode.setLeftSubTree(this.rotateLeft(targetNode.getLeftSubTree())); // LR -> /
      targetNode = this.rotateRight(targetNode);
    }
    // RL: >모양
    else if (balancFactor < -1 && data < targetNode.getRightSubTree().getData()) {
      targetNode.setRightSubTree(this.rotateRight(targetNode.getRightSubTree())); // RR -> \
      targetNode = this.rotateLeft(targetNode);
    }

    if (isRootNode) {
      this.root = targetNode;
    }

    return targetNode;
  }

  // 반복문으로도 구현 가능, 제거할 때만 사용
  getUnBalanceNode(targetRootNode, unBalanceNode = null) {
    // 기저 조건: 해당 노드가 터미널 노드일 때
    if (!targetRootNode.getLeftSubTree() && !targetRootNode.getRightSubTree()) {
      unBalanceNode = targetRootNode;
      return unBalanceNode;
    }

    let balancFactor = this.getBalanceFactor(targetRootNode);
    if (balancFactor > 0) {
      unBalanceNode = this.getUnBalanceNode(targetRootNode.getLeftSubTree(), unBalanceNode);
    } else if (balancFactor < 0) {
      unBalanceNode = this.getUnBalanceNode(targetRootNode.getRightSubTree(), unBalanceNode);
    } else {
      unBalanceNode = targetRootNode.getRightSubTree();
    }

    return unBalanceNode;
  }

  // 대충 상향식으로 하면 복잡하기 때문에 하향식(재귀)으로 접근하자..
  insert(targetRootNode, data) {
    if (targetRootNode == null) {
      targetRootNode = new BinaryTree(data);
    }

    if (this.root == null) {
      this.root = targetRootNode;
    } else if (targetRootNode.getData() == data) {
      return targetRootNode; // 중복 X
    } else if (targetRootNode.getData() > data) {
      targetRootNode.setLeftSubTree(this.insert(targetRootNode.getLeftSubTree(), data));
    } else if (targetRootNode.getData() < data) {
      targetRootNode.setRightSubTree(this.insert(targetRootNode.getRightSubTree(), data));
    }

    this.updateHeight(targetRootNode); // 하향식 접근 -> 가장 아래 노드부터 업데이트 됨
    targetRootNode = this.rotation(targetRootNode, data);

    return targetRootNode;
  }

  remove(targetRootNode, data, parentNode = null) {
    if (targetRootNode.getData() > data && targetRootNode.getLeftSubTree()) {
      targetRootNode.setLeftSubTree(this.remove(targetRootNode.getLeftSubTree(), data, targetRootNode)); // 제거하면 제거된 노드를 대체하는 자식 노드가 리턴 됨!
    } else if (targetRootNode.getData() < data && targetRootNode.getRightSubTree()) {
      targetRootNode.setRightSubTree(this.remove(targetRootNode.getRightSubTree(), data, targetRootNode));
    } else if (targetRootNode.getData() == data) {
      targetRootNode = this.removeHelper(targetRootNode, parentNode); // 제거 완

      if (!parentNode && !targetRootNode) {
        // 루트노드가 제거될 경우
        this.updateHeight(targetRootNode);
        let unBalanceNode = this.getUnBalanceNode(targetRootNode);
        targetRootNode = this.rotation(targetRootNode, unBalanceNode.getData());
      }

      return targetRootNode; // 기저조건
    }

    this.updateHeight(targetRootNode);

    // insert와 다른 점은 균형을 무너뜨리는 노드를 찾는 과정 필요
    // insert는 삽입 데이터가 균형을 무너뜨리는 노드가 됨
    let unBalanceNode = this.getUnBalanceNode(targetRootNode);
    targetRootNode = this.rotation(targetRootNode, unBalanceNode.getData());

    return targetRootNode;
  }

  // binarySearchTree의 remove와 비슷
  // remove는 삭제한 노드를 반환 했지만, alvTree에서는 삭제할 노드를 대체하는 노드(자식 노드)를 반환
  removeHelper(deletingNode, parentNode) {
    let fakeParentRootNode = new BinaryTree(0);
    fakeParentRootNode.setRightSubTree(this.root);

    if (parentNode == null) {
      parentNode = fakeParentRootNode;
    }

    let deletingNodeChild;

    if (!deletingNode.getLeftSubTree() && !deletingNode.getRightSubTree()) {
      // 터미널 노드
      if (parentNode.getLeftSubTree() == deletingNode) {
        parentNode.removeLeftSubTree();
      } else {
        parentNode.removeRightSubTree();
      }
    } else if (!deletingNode.getLeftSubTree() || !deletingNode.getRightSubTree()) {
      if (deletingNode.getLeftSubTree()) {
        deletingNodeChild = deletingNode.getLeftSubTree();
      } else {
        deletingNodeChild = deletingNode.getRightSubTree();
      }

      if (parentNode.getLeftSubTree() == deletingNode) {
        parentNode.setLeftSubTree(deletingNodeChild);
      } else {
        parentNode.setRightSubTree(deletingNodeChild);
      }
    } else {
      let replacingNode = deletingNode.getLeftSubTree();
      let replacingNodeParent = deletingNode;

      while (replacingNode.getRightSubTree() != null) {
        replacingNodeParent = replacingNode;
        replacingNode = replacingNode.getRightSubTree();
      }

      deletingNode.setData(replacingNode.getData());

      if (replacingNodeParent.getLeftSubTree() == replacingNode) {
        replacingNodeParent.setLeftSubTree(replacingNode.getLeftSubTree());
      } else {
        replacingNodeParent.setRightSubTree(replacingNode.getLeftSubTree());
      }

      deletingNodeChild = deletingNode;

      if (fakeParentRootNode.getRightSubTree() != this.root) {
        this.root = fakeParentRootNode.getRightSubTree();
      }

      return deletingNodeChild;
    }
  }
}

let avlTree = new AVLTree();
console.log('========== insert ==========');
avlTree.insert(avlTree.root, 1);
avlTree.insert(avlTree.root, 2);
avlTree.insert(avlTree.root, 3);
avlTree.insert(avlTree.root, 4);
avlTree.insert(avlTree.root, 5);
avlTree.insert(avlTree.root, 6);
avlTree.insert(avlTree.root, 7);
console.log(avlTree.root);
avlTree.root.inOrderTraversal(avlTree.root);

console.log('========== remove ==========');
avlTree.remove(avlTree.root, 2);
avlTree.remove(avlTree.root, 3);
avlTree.remove(avlTree.root, 1);
console.log(avlTree.root);
avlTree.root.inOrderTraversal(avlTree.root);

console.log('========== search ==========');
console.log(avlTree.search(7));
