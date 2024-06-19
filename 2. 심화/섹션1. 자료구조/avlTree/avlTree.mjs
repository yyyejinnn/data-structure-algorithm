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
    childNode.setLeftSubTree(childNode);

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
    else if (balancFactor > 1 && data > targetNode.getRightSubTree().getData()) {
      targetNode.setLeftSubTree(this.rotateLeft(targetNode.getLeftSubTree())); // LR -> /
      targetNode = this.rotateRight(targetNode);
    }
    // RL: >모양
    else if (balancFactor < -1 && data < targetNode.getLeftSubTree().getData()) {
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
}
