/**
 * * 트리 (Tree)
 * - 노드, 간선(Edge), 부모/자식 노드
 * - 루트노드: 최상위 노드
 * - 터미널 노드: 자식 노드가 없는 노드
 * - 인터널 노드: 터미널 노드를 제외한 노드
 * - 서브트리: 전체 트리의 부분이 되는 트리 (터미널 노드는 루트노드만 있는 트리!)
 *
 * * 이진 트리 (Binary Tree)
 * - 각각의 노드가 최대 두 개의 자식 노드를 가질 수 있는 트리
 *
 * * 트리 레벨/높이
 * - 자식 노트드로 갈수록 레벨 증가 (루트 1레벨부터 시작)
 * - 높이: 가장 높은 레벨
 *
 * * 포화 이진 트리 (Full Binary Tree)
 * - 트리의 최대 레벨에 있는 터미널 노드가 꽉 찬 트리
 *
 * * 완전 이진 트리 (Complete Binary Tree)
 * - 왼쪽부터 쭉 채워진 트리
 */

/**
 * 구현
 * - 배열/연결리스트로 구현 가능
 *
 * 추상자료형
 * - getData()
 * - setData()
 * - getLeftSubTree()
 * - getRightSubTree()
 * - setLeftSubTree()
 * - setRightSubTree()
 * - preOrderTraversal(): 전위순회
 * - inOrderTraversal(): 중위순회
 * - postOrderTraversal(): 후위순회
 */

export class BinaryTree {
  constructor(data, leftSubTree = null, rightSubTree = null) {
    this.data = data;
    this.leftSubTree = leftSubTree;
    this.rightSubTree = rightSubTree;
  }

  getData() {
    return this.data;
  }

  setData(data) {
    this.data = data;
  }

  getLeftSubTree() {
    return this.leftSubTree;
  }

  getRightSubTree() {
    return this.rightSubTree;
  }

  setLeftSubTree(tree) {
    this.leftSubTree = tree;
  }

  setRightSubTree(tree) {
    this.rightSubTree = tree;
  }

  preOrderTraversal(tree) {
    if (!tree) {
      return;
    }

    console.log(tree.data);
    this.preOrderTraversal(tree.getLeftSubTree());
    this.preOrderTraversal(tree.getRightSubTree());
  }

  inOrderTraversal(tree) {
    if (!tree) {
      return;
    }

    this.inOrderTraversal(tree.getLeftSubTree());
    console.log(tree.data);
    this.inOrderTraversal(tree.getRightSubTree());
  }

  postOrderTraversal(tree) {
    if (!tree) {
      return;
    }

    this.postOrderTraversal(tree.getLeftSubTree());
    this.postOrderTraversal(tree.getRightSubTree());
    console.log(tree.data);
  }

  removeLeftSubTree() {
    const removed = this.getLeftSubTree();
    this.setLeftSubTree(null);

    return removed;
  }

  removeRightSubTree() {
    const removed = this.getRightSubTree();
    this.setRightSubTree(null);

    return removed;
  }
}

/**
 * test
 */
const tree1 = new BinaryTree(1);
const tree2 = new BinaryTree(2);
const tree3 = new BinaryTree(3);
const tree4 = new BinaryTree(4);
const tree5 = new BinaryTree(5);
const tree6 = new BinaryTree(6);
const tree7 = new BinaryTree(7);

tree1.setLeftSubTree(tree2);
tree1.setRightSubTree(tree3);
tree2.setLeftSubTree(tree4);
tree2.setRightSubTree(tree5);
tree3.setLeftSubTree(tree6);
tree3.setRightSubTree(tree7);

// console.log(tree1.getLeftSubTree().getData());
// console.log(tree1.getRightSubTree().getData());

// console.log(tree1.preOrderTraversal(tree1));
// console.log(tree1.inOrderTraversal(tree1));
// console.log(tree1.postOrderTraversal(tree1));
